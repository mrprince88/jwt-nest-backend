// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtDto } from './dto';
import { TokenService } from './token.service';

@Controller('jwt')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('generate')
  async generate(@Body() dto: JwtDto) {
    const token = await this.tokenService.generate(dto);
    return {
      token: token,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('validate')
  async validate(@Body('token') token: string) {
    const res = await this.tokenService.validator(token);
    return {
      isValid: res,
    };
  }
}
