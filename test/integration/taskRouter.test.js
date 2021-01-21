const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);

describe('Task',async () => {
  
  it('should be able to get all task from cache', async () => {
    const response = await request.get('/api/v1/task').send();
    expect(response.status).toBe(200);
  });

  it('Add task', async () => {
    const response = await request.post('/api/v1/task').send({
      task: 'Cleaning',
      description: 'test',
      status: 'done',
      user: 'admin'
    });
    expect(response.status).toBe(201);
  });
});
