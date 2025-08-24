import { lazy, Suspense } from 'react'

import { Routes, Route } from 'react-router-dom'

import Layout from '../components/layout/Layout'

const Login = lazy(() => import('../pages/Login/Login'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<p>carregando...</p>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/test" element={<div>test</div>} />
        </Route>
      </Routes>
    </Suspense>
  )
}
