import { Module } from '@nestjs/common';
import { JwtController } from './jwt.controller';
import { JwtService } from './jwt.service';
import { JwtModule as JWTModule } from '@nestjs/jwt';

@Module({
  imports: [JWTModule.register({})],
  controllers: [JwtController],
  providers: [JwtService],
})
export class JwtModule {}
