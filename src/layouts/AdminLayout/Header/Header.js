import React, { useState } from 'react';

function Header() {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    return (
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
            <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                <button className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <div className="flex justify-center flex-1 lg:mr-32">
                    <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                        <div className="absolute inset-y-0 flex items-center pl-2">
                            <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <input
                            className="w-full p-2 pl-8 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                            type="text"
                            placeholder="Search for projects"
                            aria-label="Search"
                        />
                    </div>
                </div>

                <ul className="flex items-center space-x-6">
                    <li className="relative">
                        <button
                            className="relative rounded-md focus:outline-none"
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                            </svg>
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full"></span>
                        </button>
                    </li>

                    <li className="relative">
                        <button
                            className="rounded-full focus:outline-none"
                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        >
                            <img
                                className="w-8 h-8 rounded-full"
                                src="https://images.unsplash.com/photo-1502378735452-bc7d86632805"
                                alt="User avatar"
                            />
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
