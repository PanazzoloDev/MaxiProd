import PagePath from '../../Components/Page/PagePath';
import DatagridContainer from './Containers/DatagridContainer';

const CategoriesPage = (): React.ReactNode => {
    return (
        <>
            <PagePath path='Home Control > Categorias'/>
            <DatagridContainer />
        </>
    )
}

export default CategoriesPage;