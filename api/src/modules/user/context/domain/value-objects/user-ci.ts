import { Exception } from '@src/shared/modules'

export class UserCi {
  private readonly value: number

  constructor (value: number) {
    this.ensureUserCiIsValid(value)
    this.value = value
  }

  public getValue (): number {
    return this.value
  }

  private ensureUserCiIsValid (value: number): void {
    const hasStringRegex = /[a-zA-Z]+/
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
    const ciToStr = value.toString()

    if (ciToStr.length < 6) {
      throw new Exception(`La ci: ${value} tiene menos de 6 caracteres`, 'UserCiLengthTooShort')
    }

    if (ciToStr.length > 10) {
      throw new Exception(`La ci: ${value} tiene mas de 10 caracteres`, 'UserCiLengthTooLong')
    }

    if (hasStringRegex.test(ciToStr) || specialChars.test(ciToStr)) {
      throw new Exception(`La ci: ${value} tiene caracteres invalidos`, 'UserInvalidCi')
    }
  }
}
