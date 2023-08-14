export const phoneCheck = (string: string) => string.length === 18 && /^((\+7|7|8)+([0-9()-_ ]){10,18})$/.test(string);
