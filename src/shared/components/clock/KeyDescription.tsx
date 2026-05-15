import { type MusicalKey } from "@shared/classes/MusicalKey"

import keyDescriptionCssModule from "./KeyDescription.module.scss"


interface KeyDescriptionInput {
  musicalKey: MusicalKey,
}

export function KeyDescription({
  musicalKey,
}: KeyDescriptionInput): React.ReactNode {
  return (
    <>
      <text
        className={keyDescriptionCssModule["key-description"]}
        textAnchor="middle"
      >
        <TextContent
          musicalKey={musicalKey}
        />
        {"\n"}
      </text>
      <text
        className={keyDescriptionCssModule["degree-explanation"]}
        textAnchor="middle"
      >
        {getDegreeExplanation(musicalKey.degree)}
      </text>
    </>
  )
}

interface TextContentInput {
  musicalKey: MusicalKey,
}

function TextContent({
  musicalKey,
}: TextContentInput): React.ReactNode {
  const noteFontClassName = "fixed-width-font"
  const rootNoteName = musicalKey.rootNote.name
  if (musicalKey.mode === -2) {
    return (
      <>
        <tspan className={noteFontClassName}>{rootNoteName}</tspan>-Major.
      </>
    )
  }
  if (musicalKey.mode === 1) {
    return (
      <>
        <tspan className={noteFontClassName}>{rootNoteName}</tspan>-Minor.
      </>
    )
  }
  return (
    <>
      The {musicalKey.modeName} mode on <tspan className={noteFontClassName}>{rootNoteName}</tspan>.
    </>
  )
}

function getDegreeExplanation(
  degree: number,
): string {
  if (degree === 0)  return "No sharps or flats."
  if (degree === 1)  return "One sharp."
  if (degree === -1) return "One flat."
  if (degree >= 2)   return `${getWrittenOutNumber(degree)} sharps.`
  if (degree <= -2)  return `${getWrittenOutNumber(- degree)} flats.`
  throw `Unexpected degree ${degree}`
}

function getWrittenOutNumber(
  n: number,
): string {
  if (n >= WRITTEN_OUT_NUMBERS.length) return "Many"
  return WRITTEN_OUT_NUMBERS[n]
}

const WRITTEN_OUT_NUMBERS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
]
