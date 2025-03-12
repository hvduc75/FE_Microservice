import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import DefaultLayout from './layouts/UserLayout/DefaultLayout/DefaultLayout';
import OrganizerLayout from './layouts/UserLayout/OrganizerLayout/OrganizerLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import { getAccount } from './service/authService';
import { UserLoginSuccess } from './redux/action/userAction';

import Home from './Pages/User/Home/Home';
import AddEvent from './Pages/User/AddEvent/AddEvent';
import MyEvent from './Pages/User/MyEvent/MyEvent';
import TermOfUse from './Pages/User/TermOfUse/TermOfUse';
import ManageReport from './Pages/User/ManageReport/ManageReport';
import DashBoard from './Pages/Admin/DashBoard/DashBoard';
import ManageUser from './Pages/Admin/ManageUser/ManageUser';
import AddRole from './Pages/Admin/ManageRoles/AddRole/AddRole';
import AssignRole from './Pages/Admin/ManageRoles/AssignRole/AssignRole';
import ManageEvent from './Pages/Admin/ManageEvent/ManageEvent';
import ConfirmEvent from './Pages/Admin/ConfirmEvent/ConfirmEvent';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user.account);

    useEffect(() => {
        if (user && !user.access_token) {
            fetchAccount();
        }
    }, [location.pathname]);

    const fetchAccount = async () => {
        try {
            const response = await getAccount();
            if (response && +response.EC === 0) {
                dispatch(UserLoginSuccess(response));
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/organizer" element={<OrganizerLayout />}>
                    <Route path="create-event/:eventId?" element={<AddEvent />} />
                    <Route path="events/:eventId?" element={<MyEvent />} />
                    <Route path="events/:eventId?/edit" element={<AddEvent />} />
                    <Route path="term-of-use" element={<TermOfUse />} />
                    <Route path="report" element={<ManageReport />} />
                </Route>
                <Route path="/Admin" element={<AdminLayout />}>
                    <Route index element={<DashBoard />} />
                    <Route path="dashboard" element={<DashBoard />} />
                    <Route path="manage-user" element={<ManageUser />} />
                    <Route path="add-roles" element={<AddRole />} />
                    <Route path="assign-roles" element={<AssignRole />} />
                    <Route path="manage-event" element={<ManageEvent />} />
                    <Route path="confirm-event/:eventId?" element={<ConfirmEvent />} />
                </Route>
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default App;
