import express from 'express'
import { addressBookController } from './addressBook.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/create', addressBookController.createAddress)
router.patch('/update', addressBookController.updateAddress)
// router.get('/get-all', brandController.getBrand)
router.get('/getbyid', auth('customer', 'admin'), addressBookController.getById)

export const addressBookRouter = router
