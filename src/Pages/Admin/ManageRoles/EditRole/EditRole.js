import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { updateRole } from '../../../../service/roleService';

function ModalUpdateRole({ show, setShow, dataUpdate, resetDataUpdate, getAllRoles }) {
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setUrl(dataUpdate.url);
            setDescription(dataUpdate.description);
        }
    }, [dataUpdate]);

    const handleClose = () => {
        setShow(false);
        setUrl('');
        setDescription('');
        resetDataUpdate();
    };

    const handleUpdateRole = async () => {
        let data = await updateRole(dataUpdate.id, url, description);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await getAllRoles();
        } else {
            toast.error(data.EM);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-semibold">Update Role</h2>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                        X
                    </button>
                </div>
                <div className="mt-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium">URL</label>
                        <input
                            type="text"
                            className="w-full p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 bg-white"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Description</label>
                        <input
                            type="text"
                            className="w-full p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 bg-white"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleUpdateRole}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalUpdateRole;
