import Header from './Header'
import Footer from './Footer'
import ClientRoutes from '../clientRoutes/ClientRoutes'
import { useState } from 'react'

function App() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode') || 'true')
  )

  return (
    <>
      <div className={darkMode ? 'dark' : ''}>
        <div
          className="app h-screen dark:bg-slate-800 dark:text-gray-400"
          style={{ minHeight: '100vh', position: 'relative' }}
        >
          <Header setDarkMode={setDarkMode} darkMode={darkMode} />
          <ClientRoutes />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
