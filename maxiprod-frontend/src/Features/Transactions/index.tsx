import PagePath from '../../Components/Page/PagePath';
import DatagridContainer from './Containers/DatagridContainer';

const TransactionPage = (): React.ReactNode => {
    return (
        <>
            <PagePath path='Home Control > Transações' />
            <DatagridContainer />
        </>
    )
}

export default TransactionPage;