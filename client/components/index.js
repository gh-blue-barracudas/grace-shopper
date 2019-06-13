/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export {default as EmptyCart} from './emptycart'
export {default as ConnectedCart} from './cart'
export {default as AllProducts} from './all-products'
export {default as SingleProduct} from './single-product'
export {default as Home} from './home'
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as Checkout} from './checkout'
export {Login, Signup} from './auth-form'
export {default as OrderConfirm} from './orderConfirm'
export {default as NotFound} from './notFound'
export {default as AboutUs} from './aboutUs'
