import { Network } from "@prisma/client"

export type Wifi = Omit<Network, "id">

export type WifiEncrypted = {
    title: string,
    network: string,
    encryptedPassword: string,
    userId: number
}
