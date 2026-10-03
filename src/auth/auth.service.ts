import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService // Inyectamos el servicio de JWT
  ) {}

  async validateOAuthLogin(profile: any) {
    const { id, emails, name, photos } = profile;
    const email = emails[0].value;
    const avatar = photos[0].value;
    const fullName = `${name.givenName} ${name.familyName}`;

    let user = await this.prisma.user.findFirst({
      where: { OR: [{ googleId: id }, { email: email }] }
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: { email, googleId: id, name: fullName, avatar },
      });
    } else if (!user.googleId) {
      user = await this.prisma.user.update({
        where: { email },
        data: { googleId: id, avatar },
      });
    }

    return user;
  }

  // Método para firmar el token con los datos esenciales del usuario
  generateJwt(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}