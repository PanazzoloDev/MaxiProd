import PagePath from '../../Components/Page/PagePath';
import DatagridContainer from './Containers/DatagridContainer';

const FinancialSummaryPage = (): React.ReactNode => {
    return (
        <>
            <PagePath path='Home Control > Resumo Financeiro' />
            <DatagridContainer />
        </>
    )
}

export default FinancialSummaryPage;