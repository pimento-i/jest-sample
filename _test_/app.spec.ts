import request from 'supertest';
import { AppServer } from '@/server';
import { container } from '@/inversify/inversify.config';
import { TYPES } from '@/types';

describe('GET /diary', () => {
  it('Test to ensure that data is stored in the DB in the order of submitting.', async () => {
    const server = container.get<AppServer>(TYPES.AppServer);
    await server.setUp();
    server.start();
    const title_1 = 'hello';
    const article_1 = 'first diary';
    const title_2 = 'good morning';
    const article_2 = 'good morning every one';
    const title_3 = 'good night';
    const article_3 = 'good night, see you tommorow';
    const postData = [
      { title: title_1, article: article_1 },
      { title: title_2, article: article_2 },
      { title: title_3, article: article_3 },
    ];
    for await (const data of postData) {
      await request(server.appServer).post('/diary').send({
        title: data.title,
        article: data.article,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Waiting for Insert
    }
    const response = await request(server.appServer).get('/diary');
    const diaries = response.body.allDiary;
    expect(diaries[1].title).toBe(title_2);
    expect(diaries[1].article).toBe(article_2);
    await server.stop();
  });
});
