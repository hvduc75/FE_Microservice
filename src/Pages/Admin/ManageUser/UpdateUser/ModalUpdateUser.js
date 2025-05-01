import { useEffect, useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { putUpdateUser } from '../../../../service/userService';

function ModalUpdateUser(props) {
    const { show, setShow, dataUpdate } = props;
    const handleClose = () => {
        setShow(false);
        setEmail('');
        setImage('');
        setPreviewImage('');
        setBirthDay('');
        setPhone('');
        setGroupId('1');
        setUsername('');
        props.resetUpdateData();
    };

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [phone, setPhone] = useState('');
    const [groupId, setGroupId] = useState('1');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    console.log(dataUpdate);

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setPhone(dataUpdate.phone);
            if (dataUpdate.birthDay) {
                const date = new Date(dataUpdate.birthDay);
                const formattedDate = date.toISOString().slice(0, 16);
                setBirthDay(formattedDate);
            }
            setGroupId(dataUpdate.groupId);
            if (dataUpdate.avatar) {
                const byteArray = new Uint8Array(dataUpdate.avatar.data);
                let binary = '';
                byteArray.forEach((byte) => (binary += String.fromCharCode(byte)));
                const base64String = window.btoa(binary);
                setPreviewImage(`data:image/jpeg;base64,${base64String}`);
            }
        }
    }, [dataUpdate]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
        }
    };

    const handleUpdateUser = async () => {
        let data = await putUpdateUser(dataUpdate.id, username, birthDay, groupId, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListUsersWithPaginate(props.currentPage);
            // props.setCurrentPage(props.currentPage);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold">Update user</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={handleClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-6">
                    <form className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full border rounded px-3 py-2"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Username</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Birth Day</label>
                            <input
                                type="datetime-local"
                                className="w-full border rounded px-3 py-2"
                                value={birthDay}
                                onChange={(event) => setBirthDay(event.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Role</label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={groupId}
                                onChange={(event) => setGroupId(event.target.value)}
                            >
                                <option value="1">USER</option>
                                <option value="2">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label
                                className="block text-sm font-medium mb-1 cursor-pointer"
                                htmlFor="labelUpload"
                            >
                                <div className="flex items-center gap-2 border rounded px-3 py-2 bg-gray-100 hover:bg-gray-200">
                                    <FcPlus className="text-xl" />
                                    <span>Upload File Image</span>
                                </div>
                            </label>
                            <input
                                type="file"
                                hidden
                                id="labelUpload"
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>
                        <div className="col-span-2 flex justify-center items-center border-dashed border-2 border-red-500 rounded h-36">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="max-w-full max-h-full"
                                />
                            ) : (
                                <span className="text-gray-400">Preview Image</span>
                            )}
                        </div>
                    </form>
                </div>
                <div className="flex justify-end px-6 py-4 border-t">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleUpdateUser}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalUpdateUser;