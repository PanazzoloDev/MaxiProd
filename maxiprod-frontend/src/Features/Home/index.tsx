import Page from "../../Components/Page";
import { GreetingContainer, HomeContainer } from "./style";


const GetGrettingPhrase = () => {
    const hours = new Date().getHours()
    if (hours < 12) return 'Bom dia';
    if (hours < 19) return 'Boa tarde';
    return 'Boa noite';
}

const HomePage = (): React.ReactNode => {

    const greeting = GetGrettingPhrase()

    return (
        <Page>
            <HomeContainer>
                <GreetingContainer>
                    {greeting}! <br/>
                    bem vindo aos controle financeiro familiar<br/>
                    HomeControl
                </GreetingContainer>
            </HomeContainer>        
        </Page>
    )
}

export default HomePage;