import { useState, useEffect } from 'react'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { MdLightMode } from 'react-icons/md'
import { FaMoon } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { connectWallet } from '../PosteconomyV2'
import { useGlobalState } from '../store'

const Header = () => {
  const [theme, setTheme] = useState(localStorage.theme)
  const themeColor = theme === 'dark' ? 'light' : 'dark'
  const darken = theme === 'dark' ? true : false
  const [connectedAccount] = useGlobalState('connectedAccount')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(themeColor)
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [themeColor, theme])

  const toggleLight = () => {
    const root = window.document.documentElement
    root.classList.remove(themeColor)
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
    setTheme(themeColor)
  }

  return (
    <header className="sticky top-0 z-50 dark:text-blue-500">
      <nav className="navbar navbar-expand-lg shadow-md py-2 relative flex items-center w-full justify-between bg-white dark:bg-[#212936]">
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
          <div className="navbar-collapse collapse grow flex flex-row justify-between items-center p-2">
            <Link
              to={'/'}
              className="flex flex-row justify-start items-center space-x-3"
            >
              <FaRegMoneyBillAlt className="cursor-pointer" size={25} />
              <span className="invisible md:visible dark:text-gray-300">
                PostEconomy
              </span>
            </Link>

            <div className="flex flex-row justify-center items-center space-x-5">
              {darken ? (
                <MdLightMode
                  className="cursor-pointer"
                  size={25}
                  onClick={toggleLight}
                />
              ) : (
                <FaMoon
                  className="cursor-pointer"
                  size={25}
                  onClick={toggleLight}
                />
              )}

              {connectedAccount ? (
                <button
                  className="px-4 py-2.5 text-white
                  font-medium text-xs leading-tight uppercase
                  rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg
                  focus:bg-blue-700 focus:shadow-lg focus:outline-none
                  focus:ring-0 active:bg-blue-800 active:shadow-lg
                  transition duration-150 ease-in-out dark:text-blue-500
                  dark:border dark:border-blue-500 dark:bg-transparent"
                  style={{'background-color': '#7380FF'}}
                >
                  {connectedAccount}
                </button>
              ) : (
                <button
                  className="px-4 py-2.5 text-white
                  font-medium text-xs leading-tight uppercase
                  rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg
                  focus:bg-blue-700 focus:shadow-lg focus:outline-none
                  focus:ring-0 active:bg-blue-800 active:shadow-lg
                  transition duration-150 ease-in-out dark:text-blue-500
                  dark:border dark:border-blue-500 dark:bg-transparent"
                  onClick={connectWallet}
                  style={{'background-color': '#7380FF'}}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
