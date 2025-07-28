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

import express, {
  Express,
  Router,
  Response as ExResponse,
  Request as ExRequest,
  ErrorRequestHandler ,
  NextFunction
} from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import {RegisterRoutes} from "../build/routes"

const app: Express = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/v0/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  res.send(
    swaggerUi.generateHTML(await import('../build/swagger.json'))
  )
})

const router = Router()
RegisterRoutes(router)
app.use('/api/v0', router)

const errorHandler: ErrorRequestHandler = (err: any, _req: ExRequest, res: ExResponse, next: NextFunction) => {
    console.error("Backend Error Caught:", err);

    const statusCode = err.status || 500
    const message = err.message
    const errors = err.errors

    res.status(statusCode).json({
        message: message,
        errors: errors,
        status: statusCode,
    })
}
app.use(errorHandler)

export default app
