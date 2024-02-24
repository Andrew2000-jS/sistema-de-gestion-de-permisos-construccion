import { Exception } from '@src/shared/modules'

export class UserEmail {
  private readonly value: string

  constructor (value: string) {
    this.ensureUserEmailIsValid(value)
    this.value = value
  }

  public getValue (): string {
    return this.value
  }

  private ensureUserEmailIsValid (value: string): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!emailRegex.test(value)) {
      throw new Exception(`La direccion de correo ${value} es invalida`, 'UserInvalidEmail')
    }

    if (value.length < 6) {
      throw new Exception(`La direccion de correo ${value} tiene menos de 6 caracteres`, 'UserEmailLengthTooShort')
    }
  }
}
