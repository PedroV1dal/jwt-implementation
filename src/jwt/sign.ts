import { createHmac } from "crypto";

interface ISignOptions {
  exp: number;
  data: Record<string, any>;
  secret: string;
}

export function sign(options: ISignOptions) {
  //jwt structure -> header, payload and signature

  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    ...options.data,
    iat: Date.now(),
    exp: options.exp,
  };

  console.log(payload);

  const base64EncodedHeader = Buffer.from(JSON.stringify(header)).toString(
    "base64url"
  );
  console.log("header base64: ", base64EncodedHeader);

  const base64EncodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );
  console.log("payload base64: ", base64EncodedPayload);

  const hmac = createHmac("sha256", options.secret);

  const signature = hmac
    .update(`${base64EncodedHeader}.${base64EncodedPayload}`)
    .digest("base64url");

  console.log("signature: ", signature);
}
