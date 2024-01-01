import express from 'express'
import { UserRouter } from '../modules/user/user.route'
import { ProductRouter } from '../modules/product/product.route'
import { CategoryRouter } from '../modules/category/category.route'
import { brandRouter } from '../modules/brand/brand.route'
import { reviewRouter } from '../modules/review/review.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/user',
    route: UserRouter,
  },
  {
    path: '/product',
    route: ProductRouter,
  },
  {
    path: '/category',
    route: CategoryRouter,
  },
  {
    path: '/brand',
    route: brandRouter,
  },
  {
    path: '/review',
    route: reviewRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
