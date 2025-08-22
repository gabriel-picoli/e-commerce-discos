import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">Sobre</Link>
        </nav>
      </header>

      <main>
        {/* onde as paginas vao aparecer */}
        <Outlet />
      </main>

      <footer>
        <p>© 2025 - Meu Site</p>
      </footer>
    </div>
  )
}
