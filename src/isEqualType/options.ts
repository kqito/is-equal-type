export type Options = {
  deep?: boolean;
};

type ExcludeUndefined<T> = T extends Record<string, unknown>
  ? { [P in keyof T]-?: T[P] }
  : never;

export const defaultOptions: ExcludeUndefined<Options> = {
  deep: true,
};
