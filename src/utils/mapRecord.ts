/**
 * WARNING: You must pass all of the values of enum as an array. Otherwise
 * typescript will not function properly.
 * This helps to create the record type of an enum with the map provided
 * either as the value or the function with the key that returns the value.
 * @param allKeys is all the keys within an enum.
 * @param val is the value to which the key is mapped.
 * @returns the record of the entire enum with the mapped values as an object.
 */
export function mapRecord<T extends string | symbol | number, K>(
  allKeys: T[],
  val: K | ((key: T) => K)
) {
  return Object.fromEntries(
    typeof val === "function"
      ? allKeys.map((key) => [key, (val as (key: T) => K)(key)])
      : allKeys.map((key) => [key, val as K])
  ) as Record<T, K>;
}
