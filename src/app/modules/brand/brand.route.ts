import express from 'express'
import { brandController } from './brand.controller'

const router = express.Router()

router.post('/create', brandController.createBrand)
router.get('/get-all', brandController.getBrand)

export const brandRouter = router
