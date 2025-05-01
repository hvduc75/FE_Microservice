import React, { useState } from 'react';
import SideBar from './SideBar/SideBar';
import SideBarMini from './SideBar/SideBarMini';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';

function AdminLayout(props) {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <SideBar />
            {/* {isSideMenuOpen && (
                <div
                    className="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
                    onClick={closeSideMenu}
                ></div>
            )} */}
            <SideBarMini
                isSideMenuOpen={isSideMenuOpen}
                setIsSideMenuOpen={setIsSideMenuOpen}
                isPagesMenuOpen={isPagesMenuOpen}
                setIsPagesMenuOpen={setIsPagesMenuOpen}
            />
            <div className="flex flex-col flex-1 w-full">
                <Header isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen} />
                <main className="h-full overflow-y-auto">
                    <div className="container px-6 mx-auto grid w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
