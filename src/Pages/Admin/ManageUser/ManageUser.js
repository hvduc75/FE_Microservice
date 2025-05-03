import React, { useState, useEffect } from 'react';
import { getUserWithPaginate } from '../../../service/userService';
import { getImageSrc, formatDateAdmin } from '../../../utils';
import ModalCreateUser from './AddUser/ModalCreateUser';
import ModalUpdateUser from './UpdateUser/ModalUpdateUser';
import ModalDeleteUser from './DeleteUser/ModalDeleteUser';

function ManageUser(props) {
    const LIMIT_USER = 6;
    const [listUsers, setListUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        fetchListUsersWithPaginate(1);
    }, []);

    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    };

    console.log('listUsers', listUsers);

    const handleEditUser = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    };

    const handleDeleteUser = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    };

    const resetUpdateData = () => {
        setDataUpdate({});
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4 mt-4">
                <div className="relative w-full max-w-xs">
                    <input
                        type="text"
                        className="w-full p-2 pl-10 text-sm text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-300 focus:border-purple-300"
                        placeholder="Tìm kiếm người dùng..."
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </div>
                <button
                    className="ml-4 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-300"
                    onClick={() => setShowModalCreateUser(true)}
                >
                    Thêm mới
                </button>
            </div>
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th className="px-4 py-3">Client</th>
                                <th className="px-4 py-3">Phone</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3">BirthDay</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {listUsers &&
                                listUsers.length > 0 &&
                                listUsers.map((user, index) => (
                                    <tr className="text-gray-700 dark:text-gray-400">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm">
                                                <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                    <img
                                                        className="object-cover w-full h-full rounded-full"
                                                        src={
                                                            getImageSrc(user.avatar) ||
                                                            'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                                                        }
                                                        alt=""
                                                        loading="lazy"
                                                    />
                                                    <div
                                                        className="absolute inset-0 rounded-full shadow-inner"
                                                        aria-hidden="true"
                                                    ></div>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{user.username}</p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{user.phone}</td>
                                        <td className="px-4 py-3 text-xs">
                                            <span
                                                className={`px-2 py-1 font-semibold leading-tight rounded-full ${
                                                    user.groupId === 1
                                                        ? 'text-orange-700 bg-orange-100'
                                                        : 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100'
                                                }`}
                                            >
                                                {user.groupId === 2 ? 'Admin' : 'User'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {user.birthDay ? formatDateAdmin(user.birthDay) : ''}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center space-x-4 text-sm">
                                                <button
                                                    className="flex items-center justify-between px-2 py-2 text-sm
                                                    font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400
                                                    focus:outline-none focus:shadow-outline-gray"
                                                    aria-label="Edit"
                                                    onClick={() => handleEditUser(user)}
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                                    </svg>
                                                </button>
                                                <button
                                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                    aria-label="Delete"
                                                    onClick={() => handleDeleteUser(user)}
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                    <span className="flex items-center col-span-3">Showing 21-30 of 100</span>
                    <span className="col-span-2"></span>
                    <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                        <nav aria-label="Table navigation">
                            <ul className="inline-flex items-center">
                                <li>
                                    <button
                                        className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                                        aria-label="Previous"
                                    >
                                        <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                            <path
                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                        1
                                    </button>
                                </li>
                                <li>
                                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                        2
                                    </button>
                                </li>
                                <li>
                                    <button className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                                        3
                                    </button>
                                </li>
                                <li>
                                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                        4
                                    </button>
                                </li>
                                <li>
                                    <span className="px-3 py-1">...</span>
                                </li>
                                <li>
                                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                        8
                                    </button>
                                </li>
                                <li>
                                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                        9
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                                        aria-label="Next"
                                    >
                                        <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                            <path
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </span>
                </div>
            </div>
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalUpdateUser
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                dataUpdate={dataUpdate}
                resetUpdateData={resetUpdateData}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                dataDelete={dataDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default ManageUser;
