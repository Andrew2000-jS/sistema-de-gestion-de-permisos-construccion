import { Exception } from '@src/shared/modules'
export class UserName {
  private readonly value: string

  constructor (value: string) {
    this.ensureUserNameIsValid(value)
    this.value = value
  }

  public getValue (): string {
    return this.value
  }

  private ensureUserNameIsValid (value: string): void {
    const hasNumbers = /.*\d.*/
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/

    if (value.length > 30) {
      throw new Exception(`El nombre: ${value} tiene mas de 30 caracters`, 'UserNameLengthExceeded')
    }

    if (value.length < 3) {
      throw new Exception(`El nombre: ${value} tiene menos de 3 caracters`, 'UserNameLengthTooShort')
    }

    if (specialChars.test(value) || hasNumbers.test(value)) {
      throw new Exception(`El nombre: ${value} no puede contener caracteres invalidos`, 'UserInvalidName')
    }
  }
}
