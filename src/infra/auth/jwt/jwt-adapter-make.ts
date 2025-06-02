import { type Authorization } from "@/infra/auth/protocols/authorization";
import { type Decrypter } from "@/infra/auth/protocols/decrypter";
import { decode } from "jsonwebtoken";

export class JwtAdapterMake implements Decrypter, Authorization {
  async decrypt(ciphertext: string): Promise<string> {
    const decoded = decode(ciphertext);

    if (decoded && typeof decoded === "object" && "id" in decoded) {
      return decoded.id as string;
    }

    return "";
  }

  async authorization(ciphertext: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
