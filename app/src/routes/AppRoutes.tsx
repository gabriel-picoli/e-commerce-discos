import { lazy, Suspense } from 'react'

import { Routes, Route } from 'react-router-dom'

import Layout from '../components/layout'

import { Login } from '../pages/Access/Login'
import { Register } from '../pages/Access/Register'

const Main = lazy(() => import('../pages/Main/Main'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<p>carregando...</p>}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/test" element={<Main />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
