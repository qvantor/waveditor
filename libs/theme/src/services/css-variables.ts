type Branch = { [P in string]: Branch | string };
const keysToName = (keys: string[]) => `--${keys.join('-')}`;
export const variablesToKeys = <T extends Branch>(
  value: T,
  keys: string[] = []
): T => {
  return Object.entries(value).reduce((sum, [key, branch]) => {
    if (typeof branch === 'string') {
      return {
        ...sum,
        [key]: `var(${keysToName([...keys, key])})`,
      };
    }
    return {
      ...sum,
      [key]: variablesToKeys(branch, [...keys, key]),
    };
  }, {} as T);
};
export const variablesToStyle = (branch: Branch, keys: string[] = []): string =>
  Object.entries(branch).reduce((sum, [key, branch]) => {
    if (typeof branch === 'string') {
      return `${sum}${keysToName([...keys, key])}:${branch};`;
    }
    return sum + variablesToStyle(branch, [...keys, key]);
  }, '');
