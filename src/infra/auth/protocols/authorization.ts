export interface Authorization {
  authorization: (ciphertext: string) => Promise<boolean>
}
