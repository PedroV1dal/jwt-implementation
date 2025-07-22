import { createHmac } from "crypto";

interface IGenarateSignature {
  secret: string;
  header: string;
  payload: string;
}

//função que já gera o secret e já retorna os valores em base64url
export function generateSignature({
  secret,
  header,
  payload,
}: IGenarateSignature) {
  const hmac = createHmac("sha256", secret);

  return hmac.update(`${header}.${payload}`).digest("base64url");
}
