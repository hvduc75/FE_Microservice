import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoutes';
import PrivateRoute from './PrivateRoutes';
import AdminRoutes from './AdminRoutes';

import DefaultLayout from '../layouts/UserLayout/DefaultLayout/DefaultLayout';
import AccountLayout from '../layouts/UserLayout/AccountLayout/AccountLayout';
import BookingLayout from '../layouts/UserLayout/BookingLayout/BookingLayout';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import OrganizerLayout from '../layouts/UserLayout/OrganizerLayout/OrganizerLayout';

import Home from '../Pages/User/Home/Home';
import Search from '../Pages/User/Search/Search';
import EventDetail from '../Pages/User/EventDetail/EventDetail';
import CodePage from '../Pages/Auth/CodePage';

import EventBooking from '../Pages/User/EventBooking/EventBooking';
import Payment from '../Pages/User/Payment/Payment';
import Profile from '../Pages/User/Profile/Profile';
import PurchasedTickets from '../Pages/User/PurchasedTickets/PurchasedTickets';
import AddEvent from '../Pages/User/AddEvent/AddEvent';
import MyEvent from '../Pages/User/MyEvent/MyEvent';
import TermOfUse from '../Pages/User/TermOfUse/TermOfUse';
import ManageReport from '../Pages/User/ManageReport/ManageReport';
import SummaryRevenue from '../Pages/User/SummaryRevenue/SummaryRevenue';

import DashBoard from '../Pages/Admin/DashBoard/DashBoard';
import ManageUser from '../Pages/Admin/ManageUser/ManageUser';
import AddRole from '../Pages/Admin/ManageRoles/AddRole/AddRole';
import AssignRole from '../Pages/Admin/ManageRoles/AssignRole/AssignRole';
import ManageEvent from '../Pages/Admin/ManageEvent/ManageEvent';
import ConfirmEvent from '../Pages/Admin/ConfirmEvent/ConfirmEvent';
import NotFound from '../Pages/User/NotFound/NotFound';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="search" element={<Search />} />
                    <Route path="event-detail/:eventId" element={<EventDetail />} />
                </Route>
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
                <Route path="/my-account" element={<AccountLayout />}>
                    <Route index element={<Profile />} />
                    <Route path="my-profile" element={<Profile />} />
                    <Route path="tickets" element={<PurchasedTickets />} />
                </Route>
                <Route path="/" element={<BookingLayout />}>
                    <Route index element={<Home />} />
                    <Route path="event-booking/:eventId" element={<EventBooking />} />
                    <Route path="event-booking/:eventId/payment/:bookingId" element={<Payment />} />
                </Route>
                <Route path="/organizer" element={<OrganizerLayout />}>
                    <Route path="create-event/:eventId?" element={<AddEvent />} />
                    <Route path="events/:eventId?" element={<MyEvent />} />
                    <Route path="events/:eventId?/edit" element={<AddEvent />} />
                    <Route path="events/:eventId?/summary-revenue" element={<SummaryRevenue />} />
                    <Route path="term-of-use" element={<TermOfUse />} />
                    <Route path="report" element={<ManageReport />} />
                </Route>
            </Route>
            <Route path="/code/:userId/:tokenLogin" element={<CodePage />} />

            {/* Admin Routes */}
            <Route element={<AdminRoutes />}>
                <Route path="/Admin" element={<AdminLayout />}>
                    <Route index element={<DashBoard />} />
                    <Route path="dashboard" element={<DashBoard />} />
                    <Route path="manage-user" element={<ManageUser />} />
                    <Route path="add-roles" element={<AddRole />} />
                    <Route path="assign-roles" element={<AssignRole />} />
                    <Route path="manage-event" element={<ManageEvent />} />
                    <Route path="confirm-event/:eventId?" element={<ConfirmEvent />} />
                </Route>
            </Route>

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
