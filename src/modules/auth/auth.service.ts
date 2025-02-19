import { broadcastNewPost } from '@/events/sse';
import type { LoginResponseDTO } from './auth.validator';

class AuthService {
  async login(): Promise<LoginResponseDTO> {
    broadcastNewPost({
      id: 1,
      title: 'New Post',
      content: 'This is a new post',
    });
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
