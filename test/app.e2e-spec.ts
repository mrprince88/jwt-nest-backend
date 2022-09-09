import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/jwt/generate (POST)', () => {
    return request(app.getHttpServer())
      .post('/jwt/generate')
      .send({
        email: 'joshn@abc.com',
        password: '1231244',
      })
      .then((res) => {
        console.log(res.body);
        expect(res.body).toEqual({
          token: expect.any(String),
        });
      });
  });

  it('/jwt/validate (POST)', () => {
    return request(app.getHttpServer())
      .post('/jwt/validate')
      .send({
        token: 'abcdefghti',
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          isValid: expect.any(Boolean),
        });
      });
  });
});
