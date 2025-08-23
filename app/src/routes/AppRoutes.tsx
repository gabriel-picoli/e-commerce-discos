import { lazy, Suspense } from 'react'

import { Routes, Route } from 'react-router-dom'

import Layout from '../components/layout/Layout'

const EnterPage = lazy(() => import('../pages/EnterPage/EnterPage'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<p>carregando...</p>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/enter" element={<EnterPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
