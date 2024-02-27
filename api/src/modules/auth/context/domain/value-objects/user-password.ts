import bcrypt from 'bcrypt'
import { Exception } from '@src/shared/modules'

export class UserPassword {
  private readonly value: string

  constructor (value: string) {
    this.ensurePasswordIsValid(value)
    this.value = this.hashPassword(value)
  }

  public getValue (): string {
    return this.value
  }

  public static comparePassword (plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword)
  }

  public hashPassword (password: string): string {
    const saltRounds = 10
    return bcrypt.hashSync(password, saltRounds)
  }

  private ensurePasswordIsValid (value: string): void {
    const uppercaseRegex = /[A-Z]/
    const lowercaseRegex = /[a-z]/
    const digitRegex = /[0-9]/
    const specialCharRegex = /[!@$#\-_%^&*()+=[\]{};':"\\|,.<>/?~`]/

    if (value.length < 8) {
      throw new Exception('La contraseña debe tener al menos 8 caracteres.', 'UserPasswordLengthTooShort')
    }

    if (!uppercaseRegex.test(value) || !lowercaseRegex.test(value) || !digitRegex.test(value) || !specialCharRegex.test(value)) {
      throw new Exception('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial (@, $, #, - o _).', 'UserInvalidPassword')
    }
  }
}
