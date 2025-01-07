import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { logout } from "../services/api";
import PropTypes from 'prop-types';

const Menu = ({ setMenu, navigate }) => {
    const { user, setUser } = useContext(UserContext)
    
    const handleMenuItemClick = (e, action) => {
        e.stopPropagation()
        setMenu(false)
        if (typeof action === 'string') {
            navigate(action)
        } else if (typeof action === 'function') {
            action()
        }
    }

    const handleLogout = async() => {
        try {
            await logout()
            setUser(null)
            navigate('/')
        } catch(err) {
            console.log("Error logging out", err)
        }
    }

    return (
        <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white shadow-xl border border-gray-200 dark:border-transparent dark:bg-gray-100 w-[200px] absolute top-[4rem] right-5 md:top-10 md:-left-10 p-4 flex flex-col items-start rounded-lg space-y-4"
        >
            {!user && (
                <div 
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-600 dark:hover:text-gray-500 cursor-pointer w-full flex items-center gap-3" 
                    onClick={(e) => handleMenuItemClick(e, '/login')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                </div>
            )}
            {!user && (
                <div 
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-600 dark:hover:text-gray-500 cursor-pointer w-full flex items-center gap-3" 
                    onClick={(e) => handleMenuItemClick(e, '/register')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Register
                </div>
            )}
            {user && (
                <div 
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-600 dark:hover:text-gray-500 cursor-pointer w-full flex items-center gap-3" 
                    onClick={(e) => handleMenuItemClick(e, '/profile')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                </div>
            )}
            {user && (
                <div 
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-600 dark:hover:text-gray-500 cursor-pointer w-full flex items-center gap-3" 
                    onClick={(e) => handleMenuItemClick(e, '/my-blog')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    My blogs
                </div>
            )}
            {user && (
                <div 
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-600 dark:hover:text-gray-500 cursor-pointer w-full flex items-center gap-3" 
                    onClick={(e) => handleMenuItemClick(e, () => handleLogout())}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </div>
            )}
        </div>
    )
}

Menu.propTypes = {
    setMenu: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
}

export default Menu;