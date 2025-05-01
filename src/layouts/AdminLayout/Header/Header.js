import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import images from '../../../assets/images';
import { getImageSrc } from '../../../utils';
import { logout } from '../../../service/authService';
import { UserLogoutSuccess } from '../../../redux/action/userAction';

const Header = ({ isSideMenuOpen, setIsSideMenuOpen }) => {
    const user = useSelector((state) => state.user.account);
    const dispatch = useDispatch();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const handleOpenMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    };

    const handleLogout = async () => {
        dispatch(UserLogoutSuccess());
        await logout();
    };

    return (
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
            <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                <button
                    className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none"
                    onClick={() => handleOpenMenu()}
                >
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
                            className="w-full p-2 pl-8 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-2 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:border-2 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
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
                                className="w-6 h-6 rounded-full border border-gray-500"
                                src={getImageSrc(user.avatar) || images.avatar}
                                alt="User avatar"
                            />
                        </button>
                        {isProfileMenuOpen && (
                            <ul className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700">
                                <li class="flex cursor-pointer">
                                    <div class="inline-flex items-center w-full px-2 py-1 text-sm transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                                        <svg
                                            class="w-4 h-4 mr-3"
                                            aria-hidden="true"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                        <span>Profile</span>
                                    </div>
                                </li>
                                <li class="flex cursor-pointer">
                                    <div class="inline-flex items-center w-full px-2 py-1 text-sm transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                                        <svg
                                            class="w-4 h-4 mr-3"
                                            aria-hidden="true"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        <span>Settings</span>
                                    </div>
                                </li>
                                <li class="flex cursor-pointer" onClick={() => handleLogout()}>
                                    <div class="inline-flex items-center w-full px-2 py-1 text-sm transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                                        <svg
                                            class="w-4 h-4 mr-3"
                                            aria-hidden="true"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                        </svg>
                                        <span>Log out</span>
                                    </div>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
