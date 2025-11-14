import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import NonSellerRoute from './NonSellerRoute'
import SellerRoute from './SellerRoute'
import Layout from '../components/layout'
import SellerLayout from '../components/layout/seller-layout/SellerLayout'
import Loading from '../components/loading/Loading'

import { Login } from '../pages/Access/Login'
import { Register } from '../pages/Access/Register'

const Main = lazy(() => import('../pages/Main/Main'))
const ProductDetail = lazy(() => import('../pages/ProductDetail'))
const Shop = lazy(() => import('../pages/Shop'))
const Checkout = lazy(() => import('../pages/Checkout'))

// paginas de vendedor
const ManageProducts = lazy(() => import('../pages/SellerDashboard/ManageProducts/ManageProducts'))
const ProductForm = lazy(() => import('../pages/SellerDashboard/ProductForm/ProductForm'))
const ManageAds = lazy(() => import('../pages/SellerDashboard/ManageAds/ManageAds'))
const AdForm = lazy(() => import('../pages/SellerDashboard/AdForm/AdForm'))
const SellerProfile = lazy(() => import('../pages/SellerDashboard/SellerProfile/SellerProfile'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* rotas publicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* rotas de usuario (apenas nao-vendedores) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<NonSellerRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Main />} />
              <Route path="/product" element={<ProductDetail />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Route>
        </Route>

        {/* rotas de vendedodor */}
        <Route path="/seller" element={<ProtectedRoute />}>
          <Route element={<SellerRoute />}>
            <Route element={<SellerLayout />}>
              <Route index path="products" element={<ManageProducts />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/edit/:id" element={<ProductForm />} />

              <Route path="ads" element={<ManageAds />} />
              <Route path="ads/new" element={<AdForm />} />
              <Route path="ads/edit/:id" element={<AdForm />} />

              <Route path="profile" element={<SellerProfile />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
