import styled from "styled-components";
import translations from "./i18n/translations";
import Tag from "./Tag";

export default function Navbar({ lang }) {
  return (
    <NavbarContainer>
      <RightSide>
        <Logo alt="logo" src="/favicon-192x192.png" />
        <h1>{translations[lang].appTitle}</h1>
      </RightSide>
      <Tag>Alpha</Tag>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 64px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.img`
  width: 48px;
  margin-right: 16px;

  @media (max-width: 500px) {
    width: 32px;
    margin-right: 16px;
  }
`;
