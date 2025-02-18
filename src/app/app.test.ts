import request from 'supertest';
import { describe, it } from 'vitest';
import app from './index';

describe('GET /health-check', () => {
  it('should return 200', () => {
    request(app)
      .get('/health-check')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});
