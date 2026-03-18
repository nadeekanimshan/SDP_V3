import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { Response } from 'express';

// Define token payload interface
export interface TokenPayload {
  userId: string;
  role?: string;
}

// Config interface with proper types
interface TokenConfig {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

// Token service class
export class TokenService {
  private config: TokenConfig;

  constructor(config: TokenConfig) {
    this.config = config;
  }

  // Generate access token with proper typing
  generateAccessToken(payload: TokenPayload): string {
    const options: SignOptions = {
      expiresIn: this.config.accessTokenExpiresIn
    };
    return jwt.sign(payload, this.config.accessTokenSecret, options);
  }

  // Generate refresh token with proper typing
  generateRefreshToken(payload: TokenPayload): string {
    const options: SignOptions = {
      expiresIn: this.config.refreshTokenExpiresIn
    };
    return jwt.sign(payload, this.config.refreshTokenSecret, options);
  }

  // Verify access token with proper typing
  verifyAccessToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, this.config.accessTokenSecret) as TokenPayload;
    } catch (error) {
      return null;
    }
  }

  // Verify refresh token with proper typing
  verifyRefreshToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, this.config.refreshTokenSecret) as TokenPayload;
    } catch (error) {
      return null;
    }
  }
}