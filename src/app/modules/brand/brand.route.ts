import express from 'express'
import { brandController } from './brand.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/create', brandController.createBrand)
router.get('/get-all', brandController.getBrand)
router.get('/getbyid', auth('customer', 'admin'), brandController.getById)

export const brandRouter = router
