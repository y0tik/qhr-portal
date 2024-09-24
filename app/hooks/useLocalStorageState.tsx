import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

const safeJSONParse = (value: string | null, defaultValue: unknown) => {
  if (value === null) return defaultValue;
  try {
    const parsed = JSON.parse(value);
    return parsed;
  } catch (_error) {
    return defaultValue;
  }
};

const useLocalStorageState = <T,>(
  key: string,
  defaultValue?: T,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
  const [state, setState] = useState<T | undefined>(undefined);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setState(safeJSONParse(localStorage.getItem(key), defaultValue));
  }, []);

  useEffect(() => {
    if (state === undefined) return;
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};

export default useLocalStorageState;
