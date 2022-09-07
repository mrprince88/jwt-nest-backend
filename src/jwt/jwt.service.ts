import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as JWTService } from '@nestjs/jwt';
import { JwtDto } from './dto';

@Injectable()
export class JwtService {
  constructor(private jwt: JWTService, private config: ConfigService) {}

  async generate(content: JwtDto) {
    const token = this.jwt.signAsync(content, {
      expiresIn: '1m',
      secret: this.config.get('SECRET_KEY'),
    });

    return token;
  }

  async validator(content: string) {
    const res = this.jwt
      .verifyAsync(content, {
        secret: this.config.get('SECRET_KEY'),
      })
      .then(() => true)
      .catch(() => false);

    return res;
  }
}
