import styled from "styled-components";

type ButtonProps = {
    textcolor: string,
    color: string,
    type: string
}
const Button = styled.button<ButtonProps>`
    font-size: 16px;
    color: ${($props) => $props.textcolor};
    background-color: ${(props) => props.color};
    border-radius: 5px;
    padding: 5px 20px;
    border: 1px ${($props) => $props.textcolor} solid;
    box-shadow: 2px 2px 4px 4px rgba(0,0,0,0.2);
    &:hover{
        color: ${($props) => $props.color};
        background-color: ${($props) => $props.textcolor};
    }
    &:active{
        color: ${($props) => $props.textcolor};
        background-color: ${(props) => props.color};
    }
`
export {
    Button
}