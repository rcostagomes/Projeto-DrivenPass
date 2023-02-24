export type Credential = {
    userId: number,
    url: string,
    username: string,
    password: string,
    title: string
}

export type CredentialUser = {
    userId: number
    url: string,
    username: string,
    encryptedPassword: string,
    title?: string
}