import { Exception } from '@src/shared/modules'

export class UserPassword {
  private readonly value: string

  constructor (value: string) {
    this.ensurePasswordIsValid(value)
    this.value = value
  }

  public getValue (): string {
    return this.value
  }

  private ensurePasswordIsValid (value: string): void {
    const uppercaseRegex = /[A-Z]/
    const lowercaseRegex = /[a-z]/
    const digitRegex = /[0-9]/
    const validSpecialCharsRegex = /[@$#\-_]/
    const invalidCharsRegex = /[!%^&*()+=[\]{};':"\\|,.<>/?~`]/

    if (value.length < 8) {
      throw new Exception('La contraseña debe tener al menos 8 caracteres.', 'UserPasswordLengthTooShort')
    }

    if (!uppercaseRegex.test(value) || !lowercaseRegex.test(value) || !digitRegex.test(value) || !validSpecialCharsRegex.test(value)) {
      throw new Exception('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial (@, $, #, - o _).', 'UserInvalidPassword')
    }

    if (invalidCharsRegex.test(value)) {
      throw new Exception('La contraseña contiene caracteres especiales no permitidos.', 'UserInvalidPassword')
    }
  }
}
