export const positiveNumberRegex = (value: string) =>
  !/[` !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value) ||
  !/[a-zA-Z]+/.test(value) ||
  Number(value) < 0
    ? "El campo contiene caracteres invalidos"
    : null;

export const nameRegex = (value: string) =>
  !/[` !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value) || !/[0-9]/.test(value)
    ? "El campo contiene caracteres invalidos"
    : null;
