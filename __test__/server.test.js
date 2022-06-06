'use strict';
const { app } = require('../src/server'); 
const supertest = require('supertest');
const mockRequest = supertest(app);


const { db } = require('../src/models/index');

beforeAll(async () => {
  await db.sync();
});

describe('Web server', () => {


  it('Should respond with 404 status on an invalid route', async () => {
    const response = await mockRequest.get('/foo');
    expect(response.status).toBe(404);
  });
  it('Should respond with 404 status on an invalid method', async () => {
    const response = await mockRequest.patch('/food');
    expect(response.status).toBe(404);
  });

 
  it('can add a food ', async () => {
    const response = await mockRequest.post('/food').send({
      name: 'orange',
      calories: 333
    });
    expect(response.status).toBe(201);
  });

  
  it('can get all food ', async () => {
    const response = await mockRequest.get('/food');
    expect(response.status).toBe(200);

  });


  it('can get one record', async () => {
    const response = await mockRequest.get('/food/1');
    expect(response.status).toBe(200);
  });


  it('can update a record', async () => {
    const response = await mockRequest.put('/food/1');
    expect(response.status).toBe(201);
  });
 
  it('can delete a record', async () => {
    const response = await mockRequest.delete('/food/1');
    expect(response.status).toBe(204);
  });
});

afterAll(async () => {
  await db.drop();
});