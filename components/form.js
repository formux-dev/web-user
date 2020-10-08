import styled from "styled-components";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { useEffect, useState } from "react";

export default function Form({ formID }) {
  return (
    <Wrapper>
      <Content>
        <Navbar>
          <div>
            <img src="/favicon-192x192.png"></img>
            <h1>Formux</h1>
          </div>
          <p>Beta</p>
        </Navbar>
        <Main>
          <p>Loading data...</p>
          <FormFields formID={formID}></FormFields>
        </Main>
      </Content>
    </Wrapper>
  );
}

function FormFields({ formID }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch("https://us-central1-formux-8d67b.cloudfunctions.net/form?" + formID)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <form>
      <input type="text" value="" placeholder="Skriv något" />
    </form>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  max-width: 700px;
  width: 70%;
  padding: 64px 0;

  @media (max-width: 500px) {
    max-width: unset;
    width: 100%;
    padding: 24px 16px;
  }
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 128px;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  & > div > img {
    width: 48px;
    margin-right: 32px;
  }

  & > p {
    background: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.6);
    padding: 2px 6px;
    border-radius: 4px;
  }

  @media (max-width: 500px) {
    & > div > img {
      width: 32px;
      margin-right: 16px;
    }
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
