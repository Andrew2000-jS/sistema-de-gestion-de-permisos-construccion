import validate from 'uuid-validate'
import { ValueObject } from './value-object'
import { Exception } from '../exceptions'

export class Uuid extends ValueObject<string> {
  constructor (value: string) {
    super(value)
    this.ensureIsValidUuid(value)
  }

  private ensureIsValidUuid (id: string): void {
    if (!validate(id)) {
      throw new Exception(`<${this.constructor.name}> does not allow the value <${id}>`, 'InvalidArgumentError')
    }
  }
}
