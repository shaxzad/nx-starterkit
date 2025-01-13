import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  hashPassword(password: string): string {
    return hashSync(password, 10);
  }

  comparePassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }

  signJWT(payload: object): string {
    return sign(payload, this.configService.get<string>('JWT_SECRET'), {
      expiresIn: '1h', // Set token expiration
    });
  }

  verifyJWT(token: string): any {
    return verify(token, this.configService.get<string>('JWT_SECRET'));
  }

  encrypt(value: string): string {
    const algorithm = 'aes-256-cbc';
    const key = this.configService.get<string>('ENCRYPTION_KEY');
    const cipher = crypto.createCipher(algorithm, key);
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(hash: string): string {
    const algorithm = 'aes-256-cbc';
    const key = this.configService.get<string>('ENCRYPTION_KEY');
    const decipher = crypto.createDecipher(algorithm, key);
    let decrypted = decipher.update(hash, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}