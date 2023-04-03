import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { loadWeb3 } from './PosteconomyV2'
import { ToastContainer } from 'react-toastify'
// import { isUserLoggedIn } from './CometChat'
import Home from './views/Home'
import Proposal from './views/Proposal'
// import Chat from './views/Chat'
import 'react-toastify/dist/ReactToastify.min.css'
import DAO from "./views/DAO";

const App = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    loadWeb3().then((res) => {
      if (res) setLoaded(true)
    })
    // isUserLoggedIn()
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#212936] dark:text-gray-300">
      {loaded && (
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="dao/:addr/proposal/:id" element={<Proposal/>} />
          <Route path="dao/:addr" element={<DAO/>} />
          {/* <Route path="chat/:gid" element={<Chat />} /> */}
        </Routes>
      )}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
