export interface IUser {
    id: string
    name: string
    username: string
    password: string
    email: string
    instruments: string[]
    role: string
    token: string
    active: boolean
}