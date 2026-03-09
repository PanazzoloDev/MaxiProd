import styled from "styled-components";

const PageContainer = styled.div<{children: React.ReactNode}>`
    display: flex;
    flex-direction: column;
`
const PageBody = styled.div<{children: React.ReactNode}>`
    display: flex;
    flex-direction: row;
`
const BoxPageContent = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'top',
    height: '100vh',
    padding: '20px',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paddingTop: (theme: any) => theme.spacing(12),
}

export {
    PageBody,
    PageContainer,
    BoxPageContent
};