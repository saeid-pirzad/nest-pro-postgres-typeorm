import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from '../common/auth/jwt-auth-guard.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../common/auth/jwt.strategy.js';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_TOKEN'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [JwtAuthGuard, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
