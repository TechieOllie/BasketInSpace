#!/usr/bin/env bash
# Génère les PDF des documents d'un sprint : ./docs/build-pdf.sh sprint-1
# Demande pandoc et typst (avec Nix : nix shell nixpkgs#pandoc nixpkgs#typst).
# La police Inter est utilisée si elle est installée, sinon Liberation Sans.
set -euo pipefail

dir="$(cd "$(dirname "$0")" && pwd)"
sprint="$dir/${1:?usage: $0 <dossier-du-sprint>}"
mkdir -p "$sprint/pdf"

for md in "$sprint"/*.md; do
  name="$(basename "$md" .md)"
  # pandoc centre les tableaux, et leurs cellules héritent de ce centrage
  pandoc "$md" -s -t typst --template "$dir/pdf-template.typ" \
    | sed "s/align(center)\[#table(/align(left)[#table(/" > "$sprint/pdf/$name.typ"
  typst compile ${TYPST_FONT_PATHS:+--font-path "$TYPST_FONT_PATHS"} "$sprint/pdf/$name.typ" "$sprint/pdf/$name.pdf"
  rm "$sprint/pdf/$name.typ"
  echo "$sprint/pdf/$name.pdf"
done
