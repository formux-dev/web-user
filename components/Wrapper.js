import styled from "styled-components";

export default function Wrapper({ children }) {
  return (
    <WrapperBackground>
      <WrapperContent>{children}</WrapperContent>
    </WrapperBackground>
  );
}

const WrapperBackground = styled.div`
  color: ${props => (props.theme.colorTheme == "dark" ? "white" : "black")};
  background: ${props => (props.theme.colorTheme == "dark" ? "rgba(0, 0, 0, 0.85)" : "rgba(0, 0, 0, 0.0.5)")};
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
