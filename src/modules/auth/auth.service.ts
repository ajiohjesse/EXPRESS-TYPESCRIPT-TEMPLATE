import type { LoginResponseDTO } from './auth.validator';

class AuthService {
  async login(): Promise<LoginResponseDTO> {
    return {
      isEmailVerified: false,
      token: 'random-token',
      userId: 'user-id',
    };
  }

  async register(): Promise<LoginResponseDTO> {
    return {
      isEmailVerified: false,
      token: 'random-token',
      userId: 'user-id',
    };
  }
}

export default new AuthService();
