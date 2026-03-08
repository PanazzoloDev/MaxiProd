import PagePath from '../../Components/Page/PagePath';
import DatagridContainer from './Containers/DatagridContainer';

const PeoplePage = (): React.ReactNode => {
    return (
        <>
            <PagePath path='Home Control > Pessoas'/>
            <DatagridContainer />
        </>
    )
}

export default PeoplePage;