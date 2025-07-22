import { generateSignature } from "./generateSignature";
interface ISignOptions {
  exp: number;
  data: Record<string, any>;
  secret: string;
}

export function sign({ exp, data, secret }: ISignOptions) {
  //jwt structure -> header, payload and signature

  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    data,
    iat: Date.now(),
    exp,
  };

  console.log(payload);

  const base64EncodedHeader = Buffer.from(JSON.stringify(header)).toString(
    "base64url"
  );

  const base64EncodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );

  const signature = generateSignature({
    secret,
    header: base64EncodedHeader,
    payload: base64EncodedPayload,
  });

  return `${base64EncodedHeader}.${base64EncodedPayload}.${signature}`;
}
