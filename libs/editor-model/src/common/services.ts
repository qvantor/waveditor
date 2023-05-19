export const generateUniqName = (
  name: string,
  isNameExists: (name: string) => boolean
): string => {
  if (!isNameExists(name)) return name;
  const matches = name.match(/(\d+)$/);
  if (!matches) return generateUniqName(`${name}1`, isNameExists);
  const match = matches[0];
  const newName = `${name.replace(new RegExp(`${match}$`), '')}${
    Number(match) + 1
  }`;
  return generateUniqName(newName, isNameExists);
};
