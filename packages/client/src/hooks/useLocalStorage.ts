import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  // Get stored value from local storage or set to initial value
  const storedValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  };

  // State to store our value
  const [value, setValue] = useState<T>(storedValue);

  // Return a wrapped version of useState's setter function that persists
  // the new value to localStorage.
  const setStoredValue = (newValue: T | ((val: T) => T)) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
