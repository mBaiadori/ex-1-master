import request from 'supertest';
import app from '../app';

describe('/authors/list', () => {
  it('Should retunr a stausCode 200', async () => {
    const response = await request(app).get('/authors/list').send();
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
  });
});
