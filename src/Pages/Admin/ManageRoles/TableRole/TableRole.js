import React, { forwardRef, useImperativeHandle } from 'react';
import { toast } from 'react-toastify';
import { deleteRole } from '../../../../service/roleService';
import { FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';

const TableRole = forwardRef((props, ref) => {
    const { listRoles, getAllRoles, handleEditRole } = props;

    useImperativeHandle(ref, () => ({
        fetListRolesAgain() {
            getAllRoles();
        },
    }));

    const handleDeleteRole = async (roleId) => {
        let data = await deleteRole(roleId);
        if (data && +data.EC === 0) {
            toast.success(data.EM);
            await getAllRoles();
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm text-left text-gray-700">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Id</th>
                        <th className="border p-2">URL</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ? (
                        listRoles.map((item, index) => (
                            <tr key={`row-${index}`} className="border-b hover:bg-gray-50">
                                <td className="border p-2">{listRoles.length - index}</td>
                                <td className="border p-2">{item.url}</td>
                                <td className="border p-2">{item.description}</td>
                                <td className="mt-1 p-2 flex space-x-3">
                                    <span
                                        title="edit"
                                        className="text-orange-500 cursor-pointer hover:text-orange-700"
                                        onClick={() => handleEditRole(item)}
                                    >
                                        <FaPencilAlt />
                                    </span>
                                    <span
                                        title="delete"
                                        className="text-red-500 cursor-pointer hover:text-red-700"
                                        onClick={() => handleDeleteRole(item.id)}
                                    >
                                        <FaRegTrashAlt />
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="border p-2 text-center">Not Found Roles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
});

export default TableRole;
