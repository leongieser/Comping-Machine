import { useState, useEffect } from "react";
//TODO TJamSessionData type
export const useLocalStorage = (key: string, initialValue = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setValue(storedValue);
  }, [key, storedValue]);

  return [storedValue, setValue];
};

const [jamSession, setJamSession] = useLocalStorage("jamSession");
