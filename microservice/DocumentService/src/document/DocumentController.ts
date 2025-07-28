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

import { Controller, Route, Post, UploadedFile } from 'tsoa'

import { DocumentService } from './DocumentService'
import { JsonDoc } from '.'


@Route('document')
export class DocumentController extends Controller {
    @Post('upload')
    public async createRequest(
        @UploadedFile('document') file:  Express.Multer.File
    ): Promise<JsonDoc> {
        return new DocumentService().getJSONFromDocument(file)
    }
}