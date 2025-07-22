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

  console.log("TOKEN OK");
}
