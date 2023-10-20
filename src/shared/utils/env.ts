const env = (key: string): string | undefined => {
  return import.meta.env[`VITE_${key}`] as string | undefined;
};

export { env };
