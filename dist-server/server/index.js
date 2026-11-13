import { randomBytes, scryptSync } from "node:crypto";
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
    }
    catch (error) {
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
const server = app.listen(port, () => {
    console.log(`API BasketInSpace disponible sur http://localhost:${port}`);
});
const closeServer = async () => {
    server.close();
    await prisma.$disconnect();
};
process.once("SIGINT", closeServer);
process.once("SIGTERM", closeServer);
function parseRegistrationInput(body) {
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
    if (!nom ||
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
        pseudo.length > 30) {
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
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function readText(value) {
    if (typeof value !== "string") {
        return null;
    }
    const text = value.trim();
    return text.length > 0 ? text : null;
}
function readYear(value) {
    if (typeof value !== "number" || !Number.isInteger(value) || value < 1900 || value > 2100) {
        return null;
    }
    return value;
}
function hashPassword(password) {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 64).toString("hex");
    return `scrypt$${salt}$${hash}`;
}
function isUniqueConstraintError(error) {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}
