export const convertToPascalCase = (string: string) => {
  const camelCase = string
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('');
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
