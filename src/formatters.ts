import { Formatter } from "./types"

const capitalize = (input: string) =>
  `${input.charAt(0).toUpperCase()}${input.slice(1)}`

export type TextFormatterOptions = {
  eventsPrefix?: string
  eventsPostfix?: string
  explanationsPrefix?: string
  explanationsPostfix?: string
  solutionsPrefix?: string
  solutionsPostfix?: string
  separator?: string
  wordBetweenEventsAndExplanations?: string
  solutionsText?: string
}
export function createTextFormatter({
  eventsPrefix,
  eventsPostfix,
  explanationsPrefix,
  explanationsPostfix = ".",
  solutionsPrefix,
  solutionsPostfix,
  separator = " and ",
  wordBetweenEventsAndExplanations = " because ",
  solutionsText = "Solutions:",
}: TextFormatterOptions) {
  return ((logParts) => {
    const events = logParts.filter(({ type }) => type === "event")
    const explanations = logParts.filter(({ type }) => type === "explanation")
    const solutions = logParts.filter(({ type }) => type === "solution")

    const logMessageParts = [
      events.length > 0 && eventsPrefix,
      events.length > 0 &&
        capitalize(events.map(({ message }) => message).join(separator)),
      events.length > 0 && eventsPostfix,
      events.length > 0 && wordBetweenEventsAndExplanations,
      explanations.length > 0 && explanationsPrefix,
      explanations.length > 0 &&
        explanations.map(({ message }) => message).join(separator),
      explanations.length > 0 && explanationsPostfix,
      solutions.length > 0 && explanations.length > 0 && "\n",
      solutions.length > 0 && explanations.length > 0 && "\n",
      solutions.length > 0 && solutionsPrefix,
      solutions.length > 0 && solutionsText + "\n",
      solutions.length > 0 &&
        solutions
          .map(
            ({ message }, solutionIndex) => `${solutionIndex + 1}) ${message}`
          )
          .join("\n"),
      solutions.length > 0 && solutionsPostfix,
    ]
    return logMessageParts.filter(Boolean).join("")
  }) satisfies Formatter
}

export const textFormatter = createTextFormatter({})
