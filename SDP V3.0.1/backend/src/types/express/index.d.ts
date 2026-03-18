import { TokenPayload } from "../../utils/token.service";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};