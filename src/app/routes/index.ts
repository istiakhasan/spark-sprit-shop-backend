import express from 'express'
import { UserRouter } from '../modules/user/user.route'
import { ProductRouter } from '../modules/product/product.route'
import { CategoryRouter } from '../modules/category/category.route'
import { brandRouter } from '../modules/brand/brand.route'
import { reviewRouter } from '../modules/review/review.route'
import { OrderRouter } from '../modules/order/order.route'
import { addressBookRouter } from '../modules/addressBook/addressBook.route'
import { orderLogRouter } from '../modules/orderlog/orderLog.route'
import { blogRouter } from '../modules/blog/blog.route'
import { blogCategoryRouter } from '../modules/blogCategory/blogCategory.route'
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
  {
    path: '/address-book',
    route: addressBookRouter,
  },
  {
    path: '/orderlog',
    route: orderLogRouter,
  },
  {
    path: '/blog',
    route: blogRouter,
  },
  {
    path: '/blog-category',
    route: blogCategoryRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
