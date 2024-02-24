import { UserId, UserName, UserCi, UserEmail, UserPassword } from './value-objects'

export class User {
  private readonly id: UserId
  private readonly ci: UserCi
  private readonly name: UserName
  private readonly lastname: UserName
  private readonly email: UserEmail
  private readonly password: UserPassword

  constructor (id: UserId, ci: UserCi, name: UserName, lastname: UserName, email: UserEmail, password: UserPassword) {
    this.id = id
    this.ci = ci
    this.name = name
    this.lastname = lastname
    this.email = email
    this.password = password
  }

  static create (id: UserId, ci: UserCi, name: UserName, lastname: UserName, email: UserEmail, password: UserPassword): User {
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
      new UserId(plainData.id),
      new UserCi(plainData.ci),
      new UserName(plainData.name),
      new UserName(plainData.lastname),
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
