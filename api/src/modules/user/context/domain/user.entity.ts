import { UserEmail, UserPassword } from './value-objects'
import { CiValueObject, IdValueObject, NameValueObject } from '@src/shared/modules/context/domain/value-object'

export class User {
  private readonly id: IdValueObject
  private readonly ci: CiValueObject
  private readonly name: NameValueObject
  private readonly lastname: NameValueObject
  private readonly email: UserEmail
  private readonly password: UserPassword

  constructor (id: IdValueObject, ci: CiValueObject, name: NameValueObject, lastname: NameValueObject, email: UserEmail, password: UserPassword) {
    this.id = id
    this.ci = ci
    this.name = name
    this.lastname = lastname
    this.email = email
    this.password = password
  }

  static create (id: IdValueObject, ci: CiValueObject, name: NameValueObject, lastname: NameValueObject, email: UserEmail, password: UserPassword): User {
    const user = new User(id, ci, name, lastname, email, password)
    return user
  }

  toPrimitives (): UserPrimitives {
    return {
      id: this.id.getValue(),
      ci: this.ci.getValue(),
      name: this.name.getValue(),
      lastname: this.lastname.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue()
    }
  }

  static fromPrimitives (plainData: { id: number, ci: number, name: string, lastname: string, email: string, password: string }): User {
    return new User(
      new IdValueObject(plainData.id),
      new CiValueObject(plainData.ci),
      new NameValueObject(plainData.name),
      new NameValueObject(plainData.lastname),
      new UserEmail(plainData.email),
      new UserPassword(plainData.password)
    )
  }
}

export type UserPrimitives = {
  id: number
  ci: number
  name: string
  lastname: string
  email: string
  password: string
}

export type UserWithoutId = Omit<UserPrimitives, 'id'>
