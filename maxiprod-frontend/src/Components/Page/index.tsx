import { Box } from "@mui/material";
import React from "react";
import NavigationMenu from "./NavigationMenu";
import TopBar from "./TopBar";
import { BoxPageContent, PageBody, PageContainer } from "./style";

type pageProps = {
    children?: React.ReactNode
    screenPath?: string
}

const Page = (
    props: pageProps
) => {
    return (
        <PageContainer>
            <TopBar />
            <PageBody>
                <NavigationMenu />
                <Box sx={BoxPageContent}>
                    {props.children}
                </Box>
            </PageBody >
        </PageContainer >
    )
}

export default Page;