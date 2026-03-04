import {
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom';

import { DialogProvider } from '../Contexts/DialogContext';
import HomePage from '../Features/Home';
//import ProfilePage from '../Features/Profile';
//import PeoplePage from '../Features/People';

const AppRoute = () => {
    return (
        <Router>
            <DialogProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />

                    {/*<Route path="/users" element={<UsersScreen />} />
                    <Route path="/settings" element={<ParametersScreen />} />

                    <Route path="/profile" element={<ProfileScreen />} /> */}
                </Routes>
            </DialogProvider>
        </Router>
    );
};

export default AppRoute;
