import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let tokenService: TokenService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({}),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [TokenService],
    }).compile();

    tokenService = app.get<TokenService>(TokenService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(tokenService).toBeDefined();
    });
    it('it should generate a token', async () => {
      expect(
        await tokenService.generate({
          email: 'john@abc.com',
          password: '1234567',
        }),
      ).toEqual(expect.any(String));
    });

    it('it should validate token', async () => {
      expect(await tokenService.validator('abcdefghijklmn')).toEqual(
        expect.any(Boolean),
      );
    });
  });
});
