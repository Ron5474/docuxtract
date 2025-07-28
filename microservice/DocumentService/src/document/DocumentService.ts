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
/*
#######################################################################
#                   DO NOT MODIFY THIS FILE
#######################################################################
*/

import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai"

import { JsonDoc } from '.'

export class DocumentService {
  private genAI: GoogleGenerativeAI
  private model: GenerativeModel

  constructor() {
    if (!process.env.GOOGLE_GEMINI_KEY) throw Error('No API Key')
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY)
    this.model = this.genAI.getGenerativeModel({model: "gemini-1.5-flash"})
  }

  public async getJSONFromDocument(file: Express.Multer.File): Promise<JsonDoc> {
    // console.log('File type: ', file.mimetype)
    const base64EncodedData = file.buffer.toString('base64')
    const prompt = `
      Analyze this PDF and return the contents of the file as JSON (Key, Value) pairs.
      
      Return only the JSON content and nothing else.
    `

    const result = await this.model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64EncodedData,
          mimeType: file.mimetype
        }
      }
    ])

    const response = await result.response
    let text = response.text()
    
    // console.log('Gemini raw response:', text)
    if (text.startsWith('```json')) {
        text = text.substring(7)
    }
    if (text.endsWith('```')) {
        text = text.substring(0, text.length - 3)
    }
    text = text.trim()
    return {"answer": text}
  }
}
