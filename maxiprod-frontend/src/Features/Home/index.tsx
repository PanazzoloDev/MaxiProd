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
        <HomeContainer>
            <GreetingContainer>
                {greeting}!, bem vindo aos controle financeiro familiar
            </GreetingContainer>
                <h1>
                    HomeControl
                </h1>

        </HomeContainer>
    )
}

export default HomePage;