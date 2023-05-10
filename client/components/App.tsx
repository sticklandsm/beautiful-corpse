import Header from './Header'
import Footer from './Footer'
import ClientRoutes from '../clientRoutes/ClientRoutes'
import { useState } from 'react'

function App() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode') || 'false')
  )

  return (
    <>
      <div className={darkMode ? 'dark' : ''}>
        <div className="app h-screen dark:bg-slate-800 dark:text-gray-400">
          <Header setDarkMode={setDarkMode} darkMode={darkMode} />
          <ClientRoutes />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
