export type Options = {
  deep?: boolean;
  anyType?: string;
  strictKeyChecks?: boolean;
};

type ExcludeUndefined<T> = T extends Record<string, unknown>
  ? { [P in keyof T]-?: T[P] }
  : never;

export const defaultOptions: ExcludeUndefined<Options> = {
  deep: true,
  anyType: 'any',
  strictKeyChecks: true,
};
