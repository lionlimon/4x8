const hostUrl = import.meta.env.VITE_APP_STORAGE_URL;

export const getFullFilePath = (path: string) => `${hostUrl}${path}`;
