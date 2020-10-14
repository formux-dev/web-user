import styled from "styled-components";
import { getBackgroundColor, getTextColor } from "./styles/themeValues";

export default function Wrapper({ children }) {
  return (
    <WrapperBackground>
      <WrapperContent>{children}</WrapperContent>
    </WrapperBackground>
  );
}

const WrapperBackground = styled.div`
  color: ${props => getTextColor(props)};
  background: ${props => getBackgroundColor(props)};
  min-height: 100vh;
`;

const WrapperContent = styled.div`
  margin: 0 auto;
  max-width: 700px;
  padding: 64px 32px;

  @media (max-width: 500px) {
    max-width: unset;
    width: 100%;
    padding: 24px 16px;
  }
`;
