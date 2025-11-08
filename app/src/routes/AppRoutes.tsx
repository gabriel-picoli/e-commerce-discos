import { lazy, Suspense } from 'react'

import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'

import Layout from '../components/layout'
import Loading from '../components/loading/Loading'

import { Login } from '../pages/Access/Login'
import { Register } from '../pages/Access/Register'

const Main = lazy(() => import('../pages/Main/Main'))
const ProductDetail = lazy(() => import('../pages/ProductDetail'))
const Shop = lazy(() => import('../pages/Shop'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* rotas publicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/product" element={<ProductDetail />} />
            <Route path="/shop" element={<Shop />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
