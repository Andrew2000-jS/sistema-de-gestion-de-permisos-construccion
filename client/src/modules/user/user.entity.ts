import { Permission } from "../permission/entities"

export type User = {
    id: string
    name: string
    ci: number
    lastname: string
    email: string
    password: string
    permission: Permission[]
}