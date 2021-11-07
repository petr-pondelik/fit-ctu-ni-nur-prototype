export type ValidationTuple = [boolean, string|null];
export type ValidationFunction = (data: any) => ValidationTuple;