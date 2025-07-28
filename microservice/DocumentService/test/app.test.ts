/*
#######################################################################
#
# Copyright (C) 2025 Ronak A. Patel. All right reserved.
#
# You may not use, distribute, publish, or modify this code without 
# the express written permission of the copyright holder.
#
#######################################################################
*/

import {test, beforeAll, afterAll, beforeEach, vi, expect} from 'vitest'
import supertest from 'supertest'
import * as http from 'http'

import app from '../src/app'

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>

beforeAll(async () => {
    server = http.createServer(app)
    return new Promise<void>((resolve) => {
        server.listen(() => {
            resolve()
        })
    })
})

afterAll(() => {
  server.close()
  console.log('Test server closed.')
})

beforeEach(() => {
  vi.restoreAllMocks()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  vi.spyOn(console, 'log').mockImplementation(() => {})
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  vi.spyOn(console, 'error').mockImplementation(() => {})
    
});

test('GET /api/v0/docs/ should return 200 OK', async () => {
    await supertest(server)
      .get('/api/v0/docs/')
      .expect(200)
})

test('should return 500 for a Multer LIMIT_UNEXPECTED_FILE error', async () => {
    const smallBuffer = Buffer.alloc(10)

    const response = await supertest(server)
        .post('/api/v0/document/upload')
        .attach('unexpectedField', smallBuffer, 'dummy.bin')
        .expect(500)

    expect(response.body.message).toBe('Unexpected field')
    expect(response.body.status).toBe(500)
})