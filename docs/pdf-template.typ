// Gabarit pandoc → Typst des documents de sprint (voir build-pdf.sh).
#let accent = rgb("#3b3f9e")

#let horizontalrule = line(length: 100%, stroke: 0.5pt + luma(200))

#set document(title: "$title$")
#set text(font: ("Inter", "Liberation Sans", "DejaVu Sans"), size: 9.5pt, lang: "fr")
#set par(leading: 0.62em, spacing: 0.9em)
#set page(
  paper: "a4",
  margin: (x: 1.6cm, top: 1.8cm, bottom: 2cm),
  footer: context [
    #set text(size: 8pt, fill: luma(120))
    BasketInSpace · PGL 2026-2027 · Équipe 4
    #h(1fr)
    #counter(page).display("1 / 1", both: true)
  ],
)

#show heading.where(level: 1): it => {
  set text(size: 13.5pt, weight: "bold", fill: accent)
  block(above: 1.6em, below: 0.8em, it.body)
}
#show heading.where(level: 2): it => {
  set text(size: 11pt, weight: "bold")
  block(above: 1.3em, below: 0.6em, it.body)
}
#show raw: set text(font: ("DejaVu Sans Mono",), size: 0.95em)
#show link: set text(fill: accent)

#set table(
  inset: (x: 5pt, y: 4.5pt),
  stroke: (_, y) => (bottom: 0.5pt + luma(215)),
  fill: (_, y) => if y == 0 { luma(238) },
)
#show table.cell.where(y: 0): set text(weight: "bold")
#show table: set text(size: 8.8pt)
#show figure: set block(breakable: true)
#show figure.where(kind: table): set align(left)

#block(below: 1.6em)[
  #text(size: 19pt, weight: "bold")[$title$]
  $if(subtitle)$
  #v(-0.4em)
  #text(size: 10.5pt, fill: luma(100))[$subtitle$]
  $endif$
  #v(0.2em)
  #line(length: 100%, stroke: 1.2pt + accent)
]

$body$
