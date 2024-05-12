export const required = (value: string) => value.length > 0;

export const min = (value: string, min: number) => value.length >= min;
