export type ValidationTuple = [boolean, string|undefined];
export type ValidationFunction = (data: string|undefined) => ValidationTuple;