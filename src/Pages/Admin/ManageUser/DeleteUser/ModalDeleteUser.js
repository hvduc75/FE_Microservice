import React from 'react';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../../service/userService';

function ModalDeleteUser(props) {
    const { show, setShow, dataDelete, fetchListUsersWithPaginate, currentPage } = props;

    const handleClose = () => {
        setShow(false);
    };

    const handleSubmitDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchListUsersWithPaginate(currentPage);
        } else if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">Confirm Delete the User?</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={handleClose}
                    >
                        ✕
                    </button>
                </div>
                <div className="px-6 py-4">
                    <p>
                        Are you sure to delete this user? Email ={' '}
                        <b>{dataDelete && dataDelete.email ? dataDelete.email : ''}</b>
                    </p>
                </div>
                <div className="flex justify-end px-6 py-4 border-t">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mr-2"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={handleSubmitDeleteUser}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalDeleteUser;