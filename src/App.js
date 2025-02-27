import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import DefaultLayout from './layouts/UserLayout/DefaultLayout/DefaultLayout';
import OrganizerLayout from './layouts/UserLayout/OrganizerLayout/OrganizerLayout';

import Home from './Pages/User/Home/Home';
import Organizer from './Pages/User/Organizer/Organizer';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/organizer" element={<OrganizerLayout />}>
                    <Route index element={<Organizer />} />
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
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
