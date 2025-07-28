import { test, beforeAll, afterAll, expect, beforeEach, vi } from 'vitest'
import supertest from 'supertest'
import * as http from 'http'
import * as dotenv from 'dotenv'
import { resolve, join } from 'path'
import { readFileSync } from 'fs'

import app from '../src/app'

dotenv.config({ path: resolve(__dirname, '../.env') })
let server: http.Server

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.resetModules()
})

beforeAll(async () => {
  server = http.createServer(app)
  server.listen()
})

afterAll(() => {
  server.close()
})

test('Request API endpoint using a mock file', async () => {
  const pdfPath = join(__dirname, 'test.pdf') // adjust path if needed
  const fileBuffer = readFileSync(pdfPath)

  const response = await supertest(server)
    .post(`/api/v0/document/upload`)
    .attach('document', fileBuffer, {
      filename: 'success_document.pdf',
      contentType: 'application/pdf'
    })
    .expect(200)

  console.log('Res: ', response.body)
  expect(response.body).toBeDefined()
}, 30000)


// test('GET /docs page swagger UI', async () => {
//   await supertest(server)
//     .get(`/api/v0/docs/`)
//     .expect(404)
// })

test('GET /docs page swagger UI', async () => {
  process.env.API_DOCS = 'true' //enable docs for test
  await supertest(server)
    .get(`/api/v0/docs/`)
    .expect(200)
})