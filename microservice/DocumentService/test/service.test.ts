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


import {test, expect, vi} from 'vitest'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { Readable } from 'stream'

import {DocumentService} from '../src/document/DocumentService'

vi.mock('server-only', () => ({}))
dotenv.config({ path: resolve(__dirname, '../.env') })

test('No API KEY Error', async () => {
  const originalApiKey = process.env.GOOGLE_GEMINI_KEY

  delete process.env.GOOGLE_GEMINI_KEY
  expect(() => {
    new DocumentService()
  }).toThrow('No API Key')

  if (originalApiKey !== undefined) {
    process.env.GOOGLE_GEMINI_KEY = originalApiKey
  }
})

test('Document JSON is returned correctly', async () => {
  const pdfFilePath = resolve(__dirname, './test.pdf')
  const pdfBuffer = readFileSync(pdfFilePath)

  const mockFileStream = new Readable();
  mockFileStream.push(pdfBuffer);
  mockFileStream.push(null);

  const mockFile: Express.Multer.File = {
    fieldname: 'file',
    originalname: 'test.pdf',
    encoding: '7bit',
    mimetype: 'application/pdf',
    size: pdfBuffer.length,
    buffer: pdfBuffer,
    destination: '',
    filename: '',
    path: '',
    stream: mockFileStream,
  }

  const documentService = new DocumentService()

  const result = await documentService.getJSONFromDocument(mockFile)
  expect(result).toBeDefined()
}, 60000)
