import PagePathStyled from "./style"

type pagePathProps = {
    path: string
}

const PagePath = (props: pagePathProps) => {
    return(
        <PagePathStyled>
            {props.path}
        </PagePathStyled>
    )
}

export default PagePath