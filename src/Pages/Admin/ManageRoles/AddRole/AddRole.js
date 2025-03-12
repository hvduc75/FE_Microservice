import { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

import { FaPlusCircle, FaRegTrashAlt } from 'react-icons/fa';
import { createAddRole, fetchAllRole } from '../../../../service/roleService';
import TableRole from '../TableRole/TableRole';
import ModalUpdateRole from '../EditRole/EditRole';

function AddRole() {
    const dataChildDefault = { url: '', description: '', isValidUrl: true };
    const childRef = useRef();
    const [listRoles, setListRoles] = useState([]);
    const [showModalUpdateRole, setShowModalUpdateRole] = useState(false);
    const [roleEdit, setRoleEdit] = useState({});
    const [listChilds, setListChilds] = useState({
        child1: dataChildDefault,
    });

    useEffect(() => {
        getAllRoles();
    }, []);

    const getAllRoles = async () => {
        let data = await fetchAllRole();
        if (data && +data.EC === 0) {
            setListRoles(data.DT);
        }
    };

    const handleOnChangInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;
        if (value && name === 'url') {
            _listChilds[key]['isValidUrl'] = true;
        }
        setListChilds(_listChilds);
    };

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = dataChildDefault;
        setListChilds(_listChilds);
    };

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);
    };

    const buildDataToPersist = () => {
        let result = [];
        Object.entries(listChilds).map(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description,
            });
        });
        return result;
    };

    const handleSave = async () => {
        let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
            return child && !child.url;
        });

        if (!invalidObj) {
            let data = buildDataToPersist();
            let res = await createAddRole(data);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                childRef.current.fetListRolesAgain();
            }
        } else {
            toast.error('Input URL must not be empty');
            let _listChilds = _.cloneDeep(listChilds);
            const key = invalidObj[0];
            _listChilds[key]['isValidUrl'] = false;
            setListChilds(_listChilds);
        }
    };

    const handleEditRole = (item) => {
        setRoleEdit(item);
        setShowModalUpdateRole(true);
    };

    const resetDataUpdate = () => {
        setRoleEdit({});
    };

    return (
        <div className="p-4">
            <div className="mt-3">
                <h4 className="text-lg font-semibold">Add a new role ...</h4>
                <div className="space-y-3">
                    {Object.entries(listChilds).map(([key, child], index) => (
                        <div key={key} className="flex items-center space-x-3">
                            <div className="flex-1">
                                <label className="block text-sm font-medium">URL:</label>
                                <input
                                    type="text"
                                    className={`w-full px-3 py-2 border rounded-md ${
                                        child.isValidUrl ? 'border-gray-300' : 'border-red-500'
                                    }`}
                                    value={child.url}
                                    onChange={(event) => handleOnChangInput('url', event.target.value, key)}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium">Description:</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    value={child.description}
                                    onChange={(event) => handleOnChangInput('description', event.target.value, key)}
                                />
                            </div>
                            <div className="flex space-x-2 mt-6">
                                <FaPlusCircle className="text-green-500 text-xl cursor-pointer" onClick={handleAddNewInput} />
                                {index >= 1 && (
                                    <FaRegTrashAlt className="text-red-500 text-xl cursor-pointer" onClick={() => handleDeleteInput(key)} />
                                )}
                            </div>
                        </div>
                    ))}
                    <button className="px-4 py-2 mt-3 text-white bg-green-600 rounded-md" onClick={handleSave}>
                        Add
                    </button>
                </div>
            </div>
            <hr className="my-4" />
            <div>
                <h4 className="text-lg font-semibold">List Current Roles</h4>
                <TableRole listRoles={listRoles} handleEditRole={handleEditRole} getAllRoles={getAllRoles} ref={childRef} />
            </div>
            <ModalUpdateRole
                show={showModalUpdateRole}
                setShow={setShowModalUpdateRole}
                dataUpdate={roleEdit}
                resetDataUpdate={resetDataUpdate}
                getAllRoles={getAllRoles}
            />
        </div>
    );
}

export default AddRole;
