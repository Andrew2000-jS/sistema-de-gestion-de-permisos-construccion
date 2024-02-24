export class UserId {
  private readonly value: number

  constructor (value: number) {
    this.value = value
  }

  public getValue (): number {
    return this.value
  }
}
