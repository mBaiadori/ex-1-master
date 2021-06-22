import request from 'supertest';
import app from '../app';
import { updateArrayFile } from '../utils';
const articlesBackup = require('../data/articlesBackup.json');
const articlesFilePath = 'src/data/articles.json';
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

  it('Send Req without author_id and name Should return stausCode 400', async () => {
    const res = await request(app).post('/article').send({
      author_id: '',
      name: '',
      title: 'new Article'
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Author id or name must be provided');
  });

  it('Send Req without title Should return stausCode 400', async () => {
    const res = await request(app).post('/article').send({
      author_id: '12',
      name: '',
      title: ''
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Title must be provided');
  });
});

describe('[PUT] > / Article', () => {
  it('Try update a single Article, Should return StatusCode 204  ', async () => {
    const res = await request(app)
      .put('/article')
      .send([
        {
          id: 12,
          author_id: 10,
          title: 'new Article'
        }
      ]);
    expect(res.statusCode).toEqual(204);
  });
  it('Try update multiple Articles, Should return StatusCode 204  ', async () => {
    const res = await request(app)
      .put('/article')
      .send([
        {
          id: 12,
          author_id: 10,
          title: 'new Article author 10'
        },
        {
          id: 13,
          author_id: 9,
          title: 'new Article author 9'
        },
        {
          id: 11,
          author_id: 8,
          title: 'new Article author 8'
        }
      ]);
    expect(res.statusCode).toEqual(204);
  });

  it('Without id Should return StatusCode 400 ', async () => {
    const res = await request(app)
      .put('/article')
      .send([
        {
          id: '',
          author_id: 10,
          title: 'new Article'
        }
      ]);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Id must be provided, DataIndex:0');
  });
  it('Without Author_iD Should return StatusCode 400 ', async () => {
    const res = await request(app)
      .put('/article')
      .send([
        {
          id: 12,
          author_id: '',
          title: 'new Article'
        }
      ]);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Author id must be provided, DataIndex:0');
  });
  it('Without Title Should return StatusCode 400 ', async () => {
    const res = await request(app)
      .put('/article')
      .send([
        {
          id: 12,
          author_id: 10,
          title: ''
        }
      ]);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Title must be provided, DataIndex:0');
  });
  it('ID not exists Should return StatusCode 400 ', async () => {
    const res = await request(app)
      .put('/article')
      .send([
        {
          id: 120,
          author_id: 10,
          title: 'New Title'
        }
      ]);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Article not find, DataIndex:0');
  });
});
describe('[DELETE] > / Article', () => {
  beforeAll(async () => {
    await updateArrayFile(articlesFilePath, articlesBackup);
  });

  it('Try delete a single Article, Should return StatusCode 204  ', async () => {
    const res = await request(app).delete('/article').send([12]);
    expect(res.statusCode).toEqual(204);
  });
  it('Try delete multiple Article, Should return StatusCode 204  ', async () => {
    const res = await request(app).delete('/article').send([13, 14]);
    expect(res.statusCode).toEqual(204);
  });
  it('Try delete single Article it not exist, Should return StatusCode 400  ', async () => {
    const res = await request(app).delete('/article').send([130]);
    expect(res.statusCode).toEqual(400);
  });
});
