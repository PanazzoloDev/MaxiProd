import Page from '../../Components/Page';
import PagePath from '../../Components/Page/PagePath';
import DatagridContainer from './Containers/DatagridContainer';

const TransactionPage = (): React.ReactNode => {
    return (
        <Page>
            <PagePath path='Home Control > Transações' />
            <DatagridContainer />
        </Page>
    )
}

export default TransactionPage;