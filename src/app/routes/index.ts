import express from 'express'
import { UserRouter } from '../modules/user/user.route'
import { ProductRouter } from '../modules/product/product.route'
import { CategoryRouter } from '../modules/category/category.route'
import { brandRouter } from '../modules/brand/brand.route'
import { reviewRouter } from '../modules/review/review.route'
import { OrderRouter } from '../modules/order/order.route'
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
  {
    path: '/order',
    route: OrderRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
