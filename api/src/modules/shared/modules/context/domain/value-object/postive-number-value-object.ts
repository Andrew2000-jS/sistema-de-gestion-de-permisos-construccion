import { Exception } from '../exceptions'
import { ValueObject } from './value-object'

export class PositiveNumberValueObject extends ValueObject<number> {
  constructor (value: number) {
    super(value)
    this.ensuereValueIsValid(value)
  }

  ensuereValueIsValid (value: number): void {
    if (value < 0) {
      throw new Exception(`Negative numbers are not valid: ${value}`, 'InvalidQuantityError')
    }
  }
}
