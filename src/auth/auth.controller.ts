import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() input: AuthCredentialsDto): Promise<void> {
    await this.authService.signUp(input);
  }

  @Post('/signin')
  async signIn(
    @Body() input: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(input);
  }
}
