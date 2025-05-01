import { useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';

import { postCreateNewUser } from '../../../../service/userService';

function ModalCreateUser(props) {
    const { show, setShow } = props;

    const handleClose = () => {
        setShow(false);
        setEmail('');
        setPassword('');
        setImage('');
        setPreviewImage('');
        setPhone('');
        setBirthday('');
        setGroupId('1');
        setUsername('');
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDay, setBirthday] = useState('');
    const [groupId, setGroupId] = useState('1');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const validatePhone = (phone) => {
        return /^0\d{9}$/.test(phone);
    };

    const handleSubmitCreateUser = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Email không hợp lệ!');
            return;
        }

        if (!password) {
            toast.error('Mật khẩu không thể để trống!');
            return;
        }

        if (!validatePhone(phone)) {
            toast.error('Số điện thoại phải bắt đầu với 0 và có 10 số');
            return;
        }

        let data = await postCreateNewUser(email, password, username, phone, birthDay, groupId, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            props.setCurrentPage(1);
            await props.fetchListUsersWithPaginate(1);
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
                    <h2 className="text-xl font-semibold">Add new user</h2>
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
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full border rounded px-3 py-2"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
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
                                onChange={(event) => setBirthday(event.target.value)}
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
                        onClick={handleSubmitCreateUser}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalCreateUser;