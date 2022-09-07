import { Module } from '@nestjs/common';
import { JwtModule } from './jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule,
  ],
})
export class AppModule {}
