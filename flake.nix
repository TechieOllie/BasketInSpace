{
  description = "BasketInSpace development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_24
            sqlite
            openssl
          ];

          # Prisma ships no precompiled engines for NixOS; use the nixpkgs build.
          # Keep prisma-engines_7 in sync with the `prisma` version in package.json.
          PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines_7}/bin/schema-engine";
          PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING = "1";
        };

        formatter = pkgs.nixfmt-rfc-style;
      }
    );
}
