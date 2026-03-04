import styled from "styled-components";
import logo from "../../../assets/maxiprod-teste-logo.png";

const Logo = styled.img`
    height: 60px;
    margin: 10px;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))
`;

const MaxiProd = () => {
  return <Logo src={logo} alt="Grupo SR" />;
};

export { MaxiProd };
