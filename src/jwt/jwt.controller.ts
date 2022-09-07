// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Controller, Post, Body } from '@nestjs/common';
import { JwtDto } from './dto';
import { JwtService } from './jwt.service';

@Controller('jwt')
export class JwtController {
  constructor(private jwtService: JwtService) {}

  @Post('generate')
  async generate(@Body() dto: JwtDto) {
    const token = await this.jwtService.generate(dto);
    return {
      token: token,
    };
  }

  @Post('validate')
  async validate(@Body('token') token: string) {
    const res = await this.jwtService.validator(token);
    return {
      isValid: res,
    };
  }
}
