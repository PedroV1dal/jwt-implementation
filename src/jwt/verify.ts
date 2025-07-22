import { generateSignature } from "./generateSignature";

interface IVerifyOptions {
  token: string;
  secret: string;
}

export function verify({ token, secret }: IVerifyOptions) {
  const [headerSent, payloadSent, signatureSent] = token.split(".");

  const signature = generateSignature({
    secret,
    header: headerSent,
    payload: payloadSent,
  });

  if (signature !== signatureSent) {
    throw new Error("Invalid JWT token");
  }

  //usando o Buffer para converter de base64 para string e assim extrair a data
  //é necessário converter em objeto json e usar o 'bse64url' no Buffer.from
  //para não retornar a mesma string encodada
  const decodedPayload = JSON.parse(
    Buffer.from(payloadSent, "base64url").toString("utf-8")
  );

  if (decodedPayload.exp < Date.now()) {
    throw new Error("Expired token");
  }

  console.log("TOKEN OK");
  return decodedPayload;
}
