import { Exception } from '@src/shared/modules'
import { ValueObject } from './value-object'

export class CiValueObject extends ValueObject<number> {
  constructor (value: number) {
    super(value)
    this.ensureUserCiIsValid(value)
  }

  private ensureUserCiIsValid (value: number): void {
    const hasStringRegex = /[a-zA-Z]+/
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
    const ciToStr = value.toString()

    if (ciToStr.length < 8) {
      throw new Exception(`La ci: ${value} tiene menos de 8 caracteres`, 'UserCiLengthTooShort')
    }

    if (ciToStr.length > 8) {
      throw new Exception(`La ci: ${value} tiene mas de 8 caracteres`, 'UserCiLengthTooLong')
    }

    if (hasStringRegex.test(ciToStr) || specialChars.test(ciToStr)) {
      throw new Exception(`La ci: ${value} tiene caracteres invalidos`, 'UserInvalidCi')
    }
  }
}
