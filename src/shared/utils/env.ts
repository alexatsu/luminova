const env = (key: string): string => import.meta.env[`VITE_${key}`];

export { env };
