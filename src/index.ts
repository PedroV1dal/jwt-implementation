import { sign } from "./jwt/sign";

sign({
  exp: Date.now() + 24 * 60 * 60 * 1000,
  data: {
    sub: "pedrinho",
    role: ["job", "job2"],
  },
  secret: "",
});
