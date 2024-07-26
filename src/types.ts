export type ActionType = {
  text: string
  href?: string
}

export type UnionToIntersection<Union> =
  // `extends unknown` is always going to be the case and is used to convert the
  // `Union` into a [distributive conditional
  // type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
  (
    Union extends unknown
      ? // The union type is used as the only argument to a function since the union
        // of function arguments is an intersection.
        (distributedUnion: Union) => void
      : // This won't happen.
        never
  ) extends // Infer the `Intersection` type since TypeScript represents the positional
  // arguments of unions of functions as an intersection of the union.
  (mergedIntersection: infer Intersection) => void
    ? // The `& Union` is to allow indexing by the resulting type
      Intersection & Union
    : never

// Utility type to broaden literal types to their primitive types
export type Broaden<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends number
      ? number
      : T[K] extends boolean
        ? boolean
        : T[K] extends undefined
          ? undefined
          : T[K] extends object
            ? Broaden<T[K]>
            : T[K]
}

// Helper to extract params from a single solution and broaden the types
export type ExtractParams<T> = T extends { params: infer P }
  ? Broaden<P>
  : never

// Revised CombineParams type
export type CombineParams<
  T extends ReadonlyArray<{ name: string; params?: any }>,
  Names extends ReadonlyArray<T[number]["name"]>,
> = UnionToIntersection<
  {
    [K in Names[number]]: ExtractParams<Extract<T[number], { name: K }>>
  }[Names[number]]
>

export type LogObject = {
  type: "event" | "explanation" | "solution"
  name: string
  message: string
  params?: Record<string, string | number | Date | boolean>
  actions?: ActionType[]
}

export type CreateHumanLogsOptions = {
  formatter?: Formatter
}

export type Formatter = <LogParts extends LogObject[]>(
  logParts: LogParts
) => string
