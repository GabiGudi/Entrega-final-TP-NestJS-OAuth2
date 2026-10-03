import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, // Registramos nuestro módulo de autenticación
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}