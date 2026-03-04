import styled from "styled-components";
import { primary, secondary } from "../../Commons/colors";

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`
const ImageContainer = styled.div`
    border-radius: 20px;
    border: 1px solid;
    background-color: ${primary};
    box-shadow: 10px 10px 10px rgba(0,0,0,0.3);
`

const GreetingContainer = styled.h2`
    color: ${secondary};
    font-size: 32px;
    text-shadow: 4px 4px 5px rgba(0,0,0,0.3);
`

const Picture = styled.img`
    height: 300px;
    margin: 10px;
    box-shadow: 10px 10px 10px rgba(0,255,0,0.3);
    transition: 1s;
    &:hover {
        transform: translate(20px, 20px);
    }
`

export {
    GreetingContainer, HomeContainer, ImageContainer, Picture
};
