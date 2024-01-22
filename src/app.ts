import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
import cookieParser from 'cookie-parser'
import { getBaseUrl } from './helpers/envConfig'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const app: Application = express()
// app.use(cors({ origin: 'https://spark-spirit-shop.vercel.app', credentials: true }))
app.use(cors({ origin: getBaseUrl(), credentials: true }))
app.use(cookieParser())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Spark Spirit Shop',
      version: '1.0.0',
      description: 'API documentation for spark spirit shop',
    },
    servers: [
      {
        url: 'https://spart-spirit-shop-backend.vercel.app', // Update with your server URL
        description: 'Live server',
      },
      {
        url: 'http://localhost:5000', // Update with your server URL
        description: 'Local development server',
      },
    ],
  },
  apis: ['./dist/app/modules/**/*.route.js'], // Path to the API route files
}

const specs = swaggerJsDoc(options)
const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css'
// Serve Swagger UI
// app.use('/api-docs', express.static('./node_modules/swagger-ui-dist/'));
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { customCssUrl: CSS_URL }),
)

app.use('/api/v1', routes)
app.get('/', (req, res) => {
  res.send('successfully run')
})

//global error handler
app.use(globalErrorHandler)
//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app
