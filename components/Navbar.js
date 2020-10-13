import styled from "styled-components";
import Tag from "./Tag";

export default function Navbar() {
  return (
    <NavbarContainer>
      <div>
        <img alt="logo" src="/favicon-192x192.png"></img>
        <h1>Formux Survey</h1>
      </div>
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

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  & > div > img {
    width: 48px;
    margin-right: 16px;
  }

  @media (max-width: 500px) {
    & > div > img {
      width: 32px;
      margin-right: 16px;
    }
  }
`;
