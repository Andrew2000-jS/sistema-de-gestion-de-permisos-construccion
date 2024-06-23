export const positiveNumberRegex = (value: string) =>
  /[` !@#$%^&*()_+\-=[\]{};':"\\|<>/?~]/.test(value) ||
  /[a-zA-Z]+/.test(value) ||
  Number(value) < 0
    ? "El campo contiene caracteres invalidos"
    : null;

export const nameRegex = (value: string) =>
  /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value) || /[0-9]/.test(value)
    ? "El campo contiene caracteres invalidos"
    : null;

const passwordValidations = [
  (value) =>
    !/[a-zA-Z]+/.test(value)
      ? "La contraseña debe contener al menos una letra"
      : null,
  (value) =>
    !/[A-Z]/.test(value)
      ? "La contraseña debe contener al menos una letra en mayusculas"
      : null,
  (value) =>
    !/[a-z]/.test(value)
      ? "La contraseña debe contener al menos una letra en minusculas"
      : null,
  (value) =>
    !/[` !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value)
      ? "La contraseña debe contener al menos un caracter especial"
      : null,
];

const ciValidations = [
  (value: string) =>
    value.length < 8 ? "La cedula debe contener al menos 8 dígitos" : null,
  (value: string) =>
    value.length > 8 ? "La cedula no debe contener mas de 8 dígitos" : null,
];

export const validatePassword = (value) => {
  const error = passwordValidations.find(
    (validator) => validator(value) !== null
  );
  return error ? error(value) : null;
};

export const validateCi = (value) => {
  const error = ciValidations.find((validator) => validator(value) !== null);
  return error ? error(value) : null;
};

export const validateEmail = (value: string) =>
  !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ? "La direccion de correo es invalida"
    : null;
