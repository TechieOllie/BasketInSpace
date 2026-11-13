import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import express from "express";
import { prisma } from "./prisma.js";
import { Prisma } from "../src/generated/prisma/client.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(express.json({ limit: "16kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.post("/api/auth/register", async (request, response) => {
  const input = parseRegistrationInput(request.body);

  if (!input) {
    response.status(400).json({
      error: "Les champs obligatoires de l'inscription sont invalides.",
    });
    return;
  }

  try {
    const user = await prisma.user.create({
      data: {
        ...input,
        motDePasse: hashPassword(input.motDePasse),
      },
      select: {
        id: true,
        nom: true,
        prenom: true,
        pseudo: true,
        email: true,
        telephone: true,
        anneeNaissance: true,
        planete: true,
        district: true,
        role: true,
      },
    });

    response.status(201).json({ user });
  } catch (error: unknown) {
    if (isUniqueConstraintError(error)) {
      response.status(409).json({
        error: "Le pseudo ou l'adresse e-mail est déjà utilisé.",
      });
      return;
    }

    console.error("Erreur lors de la création du compte :", error);
    response.status(500).json({ error: "Impossible de créer le compte." });
  }
});

app.post("/api/auth/login", async (request, response) => {
  const identifier = readText(request.body?.email);
  const password = readText(request.body?.motDePasse);

  if (!identifier || !password) {
    response.status(400).json({ error: "L'e-mail et le mot de passe sont obligatoires." });
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier.toLowerCase() }, { pseudo: identifier }],
      },
    });

    if (!user || !verifyPassword(password, user.motDePasse)) {
      response.status(401).json({ error: "E-mail, pseudo ou mot de passe incorrect." });
      return;
    }

    response.json({
      user: {
        id: user.id,
        pseudo: user.pseudo,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
      },
    });
  } catch (error: unknown) {
    console.error("Erreur lors de la connexion :", error);
    response.status(500).json({ error: "Impossible de se connecter." });
  }
});

const server = app.listen(port, () => {
  console.log(`API BasketInSpace disponible sur http://localhost:${port}`);
});

const closeServer = async () => {
  server.close();
  await prisma.$disconnect();
};

process.once("SIGINT", closeServer);
process.once("SIGTERM", closeServer);

interface RegistrationInput {
  nom: string;
  prenom: string;
  pseudo: string;
  email: string;
  telephone: string;
  anneeNaissance: number;
  planete: string;
  district: string;
  motDePasse: string;
}

function parseRegistrationInput(body: unknown): RegistrationInput | null {
  if (!isRecord(body)) {
    return null;
  }

  const nom = readText(body.nom);
  const prenom = readText(body.prenom);
  const pseudo = readText(body.pseudo);
  const email = readText(body.email)?.toLowerCase();
  const telephone = readText(body.telephone);
  const planete = readText(body.planete);
  const district = readText(body.district);
  const motDePasse = readText(body.motDePasse);
  const anneeNaissance = readYear(body.anneeNaissance);

  if (
    !nom ||
    !prenom ||
    !pseudo ||
    !email ||
    !telephone ||
    !planete ||
    !district ||
    !motDePasse ||
    anneeNaissance === null ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    motDePasse.length < 8 ||
    pseudo.length < 3 ||
    pseudo.length > 30
  ) {
    return null;
  }

  return {
    nom,
    prenom,
    pseudo,
    email,
    telephone,
    anneeNaissance,
    planete,
    district,
    motDePasse,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readText(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const text = value.trim();
  return text.length > 0 ? text : null;
}

function readYear(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1900 || value > 2100) {
    return null;
  }

  return value;
}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

function verifyPassword(password: string, storedPassword: string): boolean {
  const [algorithm, salt, storedHash] = storedPassword.split("$");

  if (algorithm !== "scrypt" || !salt || !storedHash) {
    return false;
  }

  const actualHash = scryptSync(password, salt, 64);
  const expectedHash = Buffer.from(storedHash, "hex");
  return actualHash.length === expectedHash.length && timingSafeEqual(actualHash, expectedHash);
}

function isUniqueConstraintError(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}
