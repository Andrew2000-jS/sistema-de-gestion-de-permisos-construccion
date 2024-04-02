import { UserEmail, UserPassword } from './value-objects'
import { CustomeCi, CustomeId, CustomeName } from '@src/shared/modules/context/domain/value-object'

export class User {
  private readonly id: CustomeId
  private readonly ci: CustomeCi
  private readonly name: CustomeName
  private readonly lastname: CustomeName
  private readonly email: UserEmail
  private readonly password: UserPassword

  constructor (id: CustomeId, ci: CustomeCi, name: CustomeName, lastname: CustomeName, email: UserEmail, password: UserPassword) {
    this.id = id
    this.ci = ci
    this.name = name
    this.lastname = lastname
    this.email = email
    this.password = password
  }

  static create (id: CustomeId, ci: CustomeCi, name: CustomeName, lastname: CustomeName, email: UserEmail, password: UserPassword): User {
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
      new CustomeId(plainData.id),
      new CustomeCi(plainData.ci),
      new CustomeName(plainData.name),
      new CustomeName(plainData.lastname),
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
