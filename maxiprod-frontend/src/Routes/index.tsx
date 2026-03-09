import {
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom';

import { DialogProvider } from '../Contexts/DialogContext';
import HomePage from '../Features/Home';
//import ProfilePage from '../Features/Profile';
import Page from '../Components/Page';
import FinancialSummaryPage from '../Features/FinancialSummary';
import PeoplePage from '../Features/People';
import TransactionPage from '../Features/Transactions';
import CategoriesPage from '../Features/Categories';


const PageScreen = (props: { children: React.JSX.Element }) => {
    return <Page>{props.children}</Page>
}

const AppRoute = () => {


    return (
        <Router>
            <DialogProvider>
                <Routes>
                    <Route path="/" element={<PageScreen><HomePage /></PageScreen>} />
                    <Route path="/home" element={<PageScreen><HomePage /></PageScreen>} />

                    <Route path="/transactions" element={<PageScreen><TransactionPage /></PageScreen>} />
                    <Route path="/people" element={<PageScreen><PeoplePage /></PageScreen>} />
                    <Route path="/financial-summary" element={<PageScreen><FinancialSummaryPage /></PageScreen>} />
                    <Route path="/categories" element={<PageScreen><CategoriesPage /></PageScreen>} />


                </Routes>
            </DialogProvider>
        </Router>
    );
};

export default AppRoute;
