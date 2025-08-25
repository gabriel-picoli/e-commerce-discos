import { lazy, Suspense } from 'react'

import { Routes, Route } from 'react-router-dom'

import Layout from '../components/layout/Layout'

import Login from '../pages/User/Login'
import Register from '../pages/User/Register'

export default function AppRoutes() {
  return (
    <Suspense fallback={<p>carregando...</p>}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/test" element={<div>test</div>} />
        </Route>
      </Routes>
    </Suspense>
  )
}
