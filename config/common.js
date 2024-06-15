import base from './base';
import supertest from 'supertest';
const request = supertest(base.baseURL);

export default request;