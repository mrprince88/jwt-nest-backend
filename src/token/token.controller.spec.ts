import { Test, TestingModule } from '@nestjs/testing';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

describe('TokenController', () => {
  let tokenController: TokenController;

  const mockTokenService = {
    generate: jest.fn(() => {
      return 'abcdefgh';
    }),
    validator: jest.fn(() => {
      return true;
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
      providers: [TokenService],
    })
      .overrideProvider(TokenService)
      .useValue(mockTokenService)
      .compile();

    tokenController = app.get<TokenController>(TokenController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(tokenController).toBeDefined();
    });
    it('it should generate a token', async () => {
      expect(
        await tokenController.generate({
          email: 'john@abc.com',
          password: '1234567',
        }),
      ).toEqual({ token: expect.any(String) });
    });

    it('it should validate token', async () => {
      expect(await tokenController.validate('abcdefghijklmn')).toEqual({
        isValid: expect.any(Boolean),
      });
    });
  });
});
