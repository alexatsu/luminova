const env = (key: string) => import.meta.env[`VITE_${key}`];

export { env };
