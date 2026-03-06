import PagePath from '../../Components/Page/PagePath';
import Page from '../../Components/Page';
import DatagridContainer from './Containers/DatagridContainer';

const PeoplePage = (): React.ReactNode => {
    return (
        <Page>
            <PagePath path='Home Control > Pessoas'/>
            <DatagridContainer />
        </Page>
    )
}

export default PeoplePage;