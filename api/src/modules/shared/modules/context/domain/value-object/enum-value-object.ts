import { Exception } from '../exceptions'

export class EnumValueObject<T> {
  private readonly value: T

  constructor (value: T, public readonly validValues: T[]) {
    this.checkValueIsValid(value)
    this.value = value
  }

  private checkValueIsValid (value: T): void {
    if (!this.validValues.includes(value)) {
      throw new Exception('Argument is invalid', 'InvalidArgumentError')
    }
  }

  getValue (): any {
    return this.value
  }
}
