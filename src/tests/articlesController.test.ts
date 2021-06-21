import request from 'supertest';
import app from '../app';

describe('[POST] > /article', () => {
  it('Send Req without a name Should return stausCode 201', async () => {
    const res = await request(app).post('/article').send({
      author_id: 12,
      name: '',
      title: 'new Article'
    });
    expect(res.statusCode).toEqual(201);
  });
  it('Send Req without a author_id Should return stausCode 201', async () => {
    const res = await request(app).post('/article').send({
      author_id: '',
      name: 'New Author',
      title: 'new Article'
    });
    expect(res.statusCode).toEqual(201);
  });

  it('Send Req without author_id and name Should return stausCode 401', async () => {
    const res = await request(app).post('/article').send({
      author_id: '',
      name: '',
      title: 'new Article'
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Author id or name must be provided');
  });

  it('Send Req without title Should return stausCode 401', async () => {
    const res = await request(app).post('/article').send({
      author_id: '12',
      name: '',
      title: ''
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Title must be provided');
  });
});
