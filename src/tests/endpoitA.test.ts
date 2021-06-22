import request from 'supertest';
import app from '../app';

describe('EndpointA', () => {
  it('Try send a query without per_page, Should return statusCode 400 ', async () => {
    const res = await request(app).get('/endpointA').query({
      per_page: '',
      page: 2,
      order: 'name',
      sort: 'desc'
    });
    expect(res.statusCode).toBe(400);
  });
  it('Try send a query without page, Should return statusCode 400 ', async () => {
    const res = await request(app).get('/endpointA').query({
      per_page: '3',
      page: '',
      order: 'name',
      sort: 'desc'
    });
    expect(res.statusCode).toBe(400);
  });
  it('Try send a query without order, Should return statusCode 400 ', async () => {
    const res = await request(app).get('/endpointA').query({
      per_page: '3',
      page: 2,
      order: '',
      sort: 'desc'
    });
    expect(res.statusCode).toBe(400);
  });
  it('Try send a query without sort, Should return statusCode 400 ', async () => {
    const res = await request(app).get('/endpointA').query({
      per_page: '3',
      page: 2,
      order: 'name',
      sort: ''
    });
    expect(res.statusCode).toBe(400);
  });
  it('Try send a query with wrong order value, Should return statusCode 400 ', async () => {
    const res = await request(app).get('/endpointA').query({
      per_page: '3',
      page: 2,
      order: 'birth',
      sort: 'desc'
    });
    expect(res.statusCode).toBe(400);
  });
  it('Try send a query with wrong sort value, Should return statusCode 400 ', async () => {
    const res = await request(app).get('/endpointA').query({
      per_page: '3',
      page: 2,
      order: 'name',
      sort: 'max'
    });
    expect(res.statusCode).toBe(400);
  });
  it('Try send a query with correct values, Should return statusCode 200 ', async () => {
    const res = await request(app).get('/endpointA').query({
      per_page: '3',
      page: 2,
      order: 'name',
      sort: 'desc'
    });
    expect(res.statusCode).toBe(200);
  });
  it('Try send a query with par_page, Should return statusCode 200 and correct body length ', async () => {
    const res = await request(app).get('/endpointA').query({
      per_page: 5,
      page: 2,
      order: 'name',
      sort: 'desc'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(5);
  });
});
