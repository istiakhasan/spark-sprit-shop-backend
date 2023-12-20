import express from 'express'
import { brandController } from './brand.controller'

const router = express.Router()

router.post('/create', brandController.createBrand)

export const brandRouter = router
