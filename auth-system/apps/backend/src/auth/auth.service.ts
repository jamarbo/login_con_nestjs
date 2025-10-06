import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User, JwtPayload, AuthResponse } from './interfaces/auth.interface';

/**
 * Servicio de autenticación
 * En producción, esto debería conectarse a una base de datos real
 */
@Injectable()
export class AuthService {
  // Mock de usuarios en memoria (en producción usar DB)
  private users: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      password: '$2b$10$YourHashedPasswordHere', // password: admin123
      createdAt: new Date(),
    },
  ];

  constructor(private jwtService: JwtService) {}

  /**
   * Valida las credenciales del usuario
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  /**
   * Login del usuario
   */
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.generateTokenResponse(user);
  }

  /**
   * Registro de nuevo usuario
   */
  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // Verificar si el usuario ya existe
    const existingUser = this.users.find((u) => u.email === registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('El usuario ya existe');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Crear nuevo usuario
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      email: registerDto.email,
      name: registerDto.name,
      password: hashedPassword,
      createdAt: new Date(),
    };

    this.users.push(newUser);

    return this.generateTokenResponse(newUser);
  }

  /**
   * Valida un token JWT y retorna el usuario
   */
  async validateToken(token: string): Promise<User | null> {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      const user = this.users.find((u) => u.id === payload.sub);
      return user || null;
    } catch {
      return null;
    }
  }

  /**
   * Genera la respuesta con token JWT
   */
  private generateTokenResponse(user: User): AuthResponse {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  /**
   * Obtiene el perfil del usuario por ID
   */
  async getUserById(userId: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === userId);
    return user || null;
  }
}
