import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock-token'),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return auth response on valid credentials', async () => {
      const loginDto = {
        email: 'admin@example.com',
        password: 'admin123',
      };

      const result = await service.login(loginDto);

      expect(result).toBeDefined();
      expect(result.access_token).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(loginDto.email);
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      const loginDto = {
        email: 'invalid@example.com',
        password: 'wrong-password',
      };

      try {
        await service.login(loginDto);
        fail('Should have thrown UnauthorizedException');
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });

  describe('register', () => {
    it('should create new user and return auth response', async () => {
      const registerDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123',
      };

      const result = await service.register(registerDto);

      expect(result).toBeDefined();
      expect(result.access_token).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(registerDto.email);
      expect(result.user.name).toBe(registerDto.name);
    });

    it('should throw UnauthorizedException if user already exists', async () => {
      const registerDto = {
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
      };

      try {
        await service.register(registerDto);
        fail('Should have thrown UnauthorizedException');
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });

  describe('validateToken', () => {
    it('should return user if token is valid', async () => {
      const mockPayload = {
        sub: '1',
        email: 'admin@example.com',
        name: 'Admin User',
      };

      jest.spyOn(jwtService, 'verify').mockReturnValue(mockPayload);

      const result = await service.validateToken('valid-token');

      expect(result).toBeDefined();
      expect(result?.email).toBe(mockPayload.email);
    });

    it('should return null if token is invalid', async () => {
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = await service.validateToken('invalid-token');

      expect(result).toBeNull();
    });
  });
});
