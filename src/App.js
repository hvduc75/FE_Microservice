import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import DefaultLayout from './layouts/UserLayout/DefaultLayout/DefaultLayout';
import OrganizerLayout from './layouts/UserLayout/OrganizerLayout/OrganizerLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';

import Home from './Pages/User/Home/Home';
import AddEvent from './Pages/User/AddEvent/AddEvent';
import MyEvent from './Pages/User/MyEvent/MyEvent';
import TermOfUse from './Pages/User/TermOfUse/TermOfUse';
import ManageReport from './Pages/User/ManageReport/ManageReport';
import DashBoard from './Pages/Admin/DashBoard/DashBoard';
import ManageUser from './Pages/Admin/ManageUser/ManageUser';
import AddRole from './Pages/Admin/ManageRoles/AddRole/AddRole';
import AssignRole from './Pages/Admin/ManageRoles/AssignRole/AssignRole';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/organizer" element={<OrganizerLayout />}>
                    <Route path="create-event/:eventId?" element={<AddEvent />} />
                    <Route path="events" element={<MyEvent />} />
                    <Route path="term-of-use" element={<TermOfUse />} />
                    <Route path="report" element={<ManageReport />} />
                </Route>
                <Route path="/Admin" element={<AdminLayout />}>
                    <Route index element={<DashBoard />} />
                    <Route path="dashboard" element={<DashBoard />} />
                    <Route path="manage-user" element={<ManageUser />} />
                    <Route path="add-roles" element={<AddRole />} />
                    <Route path="assign-roles" element={<AssignRole />} />
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
