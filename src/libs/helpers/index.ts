export const delkeys = <T extends object, Keys extends keyof T>(
  obj: T,
  keys: Keys[]
) => {
  keys.forEach((key) => delete obj[key]);
  return obj as Omit<T, (typeof keys)[number]>;
};

export const numberWithSpaces = (x: number) => {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

export const capitalize = (s: string) => {
  return (s && s[0].toUpperCase() + s.slice(1)) || "";
};

export const className = <T extends { [key: string]: string }>(prams: T) => {
  const arr = Object.entries(!!prams && typeof prams === "object" ? prams : {});
  const entries = arr.map((el) => [el[0], { className: el[1] }]);
  return Object.fromEntries(entries) as {
    [Key in keyof T]: { className: string };
  };
};
