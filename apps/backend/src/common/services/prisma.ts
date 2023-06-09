type WithSerializedTypes<Type> = {
  [Key in keyof Type]: Type[Key] extends Date
    ? string
    : Type[Key] extends Date | null
    ? string | null
    : Type[Key] extends Date | undefined
    ? string | undefined
    : Type[Key] extends Date | null | undefined
    ? string | null | undefined
    : Type[Key];
};

export function prismaToGql<T>(obj: T): WithSerializedTypes<T> {
  for (const [key, value] of Object.entries(obj as object)) {
    if (value instanceof Date) {
      obj[key] = value.toISOString();
    }
  }
  return obj as WithSerializedTypes<T>;
}
