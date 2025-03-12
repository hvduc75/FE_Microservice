import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import { PageIcon, DashboardIcon, FormIcon, CardIcon, ChartIcon, UserIcon, DropdownIcon } from '../../../assets/icons/Icon';

function SideBar() {
    return (
        <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
            <div className="py-4 text-gray-500 dark:text-gray-400">
                <NavLink className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" to="/">
                    TicketBox
                </NavLink>
                <ul className="mt-6 space-y-2">
                    <SidebarItem to="/admin/dashboard" Icon={DashboardIcon} label="Dashboard" />
                    <SidebarItem to="/admin/manage-user" Icon={UserIcon} label="Manage User" />
                    <SidebarItem to="/forms" Icon={FormIcon} label="Forms" />
                    <SidebarItem to="/cards" Icon={CardIcon} label="Cards" />
                    <SidebarItem to="/charts" Icon={ChartIcon} label="Charts" />
                    <SidebarDropdownItem label="Manage Roles" Icon={PageIcon} items={[{ to: '/admin/add-roles', label: 'Add Role' }]} />
                </ul>
            </div>
        </aside>
    );
}

const SidebarItem = ({ to, Icon, label }) => (
    <li className="relative">
        <NavLink
            to={to}
            className={({ isActive }) =>
                `relative flex items-center px-6 py-3 text-sm font-semibold transition-colors duration-150 rounded-lg ${
                    isActive
                        ? 'text-gray-800 dark:text-gray-200 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-purple-600 before:rounded-tr-lg before:rounded-br-lg'
                        : 'text-gray-500'
                } hover:text-gray-800 dark:hover:text-gray-200`
            }
        >
            <Icon />
            <span className="ml-4">{label}</span>
        </NavLink>
    </li>
);

const SidebarDropdownItem = ({ label, Icon, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

    return (
        <li className="relative px-6 py-3">
            <button
                className="flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={toggleMenu}
                aria-haspopup="true"
            >
                <span className="flex items-center">
                    <Icon />
                    <span className="ml-4">{label}</span>
                </span>
                <DropdownIcon />
            </button>
            {isOpen && (
                <ul
                    className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                    aria-label="submenu"
                >
                    {items.map(({ to, label }) => (
                        <li key={to} className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                            <NavLink to={to} className="w-full block">
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default SideBar;
