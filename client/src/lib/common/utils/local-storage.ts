const saveToLocalStorage = (
  vals,
  key: string
) => {
  localStorage.setItem(key, JSON.stringify(vals));
};

const getFromLocalStorage = (key: string) => {
  if (typeof window !== undefined) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
};

const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

const updateLocalStorage = (key: string, updatedValue: Record<string, any>) => {
  const existingData = getFromLocalStorage(key);
  if (existingData) {
    saveToLocalStorage({ vals: { ...existingData, ...updatedValue } }, key);
  }
};
const clearLocalStorage = () => {
  localStorage.clear();
};

export {saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage, updateLocalStorage, clearLocalStorage}