export const validationPasswordDict: Record<
  string,
  { value: any; message: string }
> = {
  hasStringPattern: {
    value: (v: string) => /[a-zA-Z]+/.test(v),
    message: "La contraseña debe contener al menos una letra en mayusculas",
  },
  specialCharsPattern: {
    value: (v: string) => /[` !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(v),
    message: "La contraseña debe contener al menos un caracter especial",
  },
  upperCasePattern: {
    value: (v: string) => /[A-Z]/.test(v),
    message: "La contraseña debe contener al menos una letra en mayusculas",
  },
  lowerCasePattern: {
    value: (v: string) => /[a-z]/.test(v),
    message: "La contraseña debe contener al menos una letra en minusculas",
  },
  digitCasePattern: {
    value: (v: string) => /[0-9]/.test(v),
    message: "La contraseña debe contener al menos un numero",
  },
  minLength: {
    value: (v: string) => !Boolean(v.length < 8),
    message: "La contraseña debe tener al menos 8 caracteres",
  },
};

export const validationCiDict = {
  hasStringPattern: {
    value: (v: string) => !/[a-zA-Z]+/.test(v),
    message: "La cedula tiene caracteres invalidos",
  },
  specialCharsPattern: {
    value: (v: string) => !/[` !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(v),
    message: "La cedula tiene caracteres invalidos",
  },
  minLength: {
    value: (v: string) => !Boolean(v.length < 6),
    message: "La cedula debe tener al menos 6 caracteres",
  },
  maxLength: {
    value: (v: string) => !Boolean(v.length > 10),
    message: "La cedula debe tener maximo 10 caracteres",
  },
};

export const validationEmailDict = {
  isValidEmailPattern: {
    value: (v: string) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
    message: "La direccion de correo es invalida",
  },
};

export const validationNameDict: Record<
  string,
  { value: any; message: string }
> = {
  specialCharsPattern: {
    value: (v: string) => !/[` !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(v),
    message: "El nombre no puede contener caracteres especiales",
  },
  digitCasePattern: {
    value: (v: string) => !/[0-9]/.test(v),
    message: "El nombre no puede contener numeros",
  },
  minLength: {
    value: (v: string) => !Boolean(v.length < 3),
    message: "El nombre es demasiado corto",
  },
  maxLength: {
    value: (v: string) => !Boolean(v.length > 30),
    message: "El nombre es demasiado largo",
  },
};

export const validationLastNameDict = {
  ...validationNameDict,
};
