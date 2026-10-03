import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Ruta 1: El cliente entra acá y NestJS lo redirige a la pantalla de Google
 @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) { 
  }

  // Ruta 2: Google devuelve al usuario a esta ruta (callback) con sus datos
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: any) { // <-- Agregado : any
    return this.authService.generateJwt(req.user);
  }
}