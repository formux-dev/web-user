import styled from "styled-components";
import { useEffect, useState } from "react";
import beautify from "json-beautify";

import Navbar from "./Navbar";
import Tag from "./Tag";

export default function Form({ formID }) {
  return (
    <Wrapper>
      <Content>
        <Navbar/>
        <Main>
          <FormFields formID={formID}></FormFields>
        </Main>
      </Content>
    </Wrapper>
  );
}

function FormFields({ formID }) {
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState({});
  const [globalDebug, setGlobalDebug] = useState(false);

  const generateInitialUserData = (data) => {
    return Object.assign(
      {},
      ...data.blocks.map((block) =>
        block.key
          ? {
              [block.key]: block.data.responseIsArray ? [] : "",
            }
          : null
      )
    )
  }

  const handleBlockChange = ({ key, value }) => {
    setUserData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  useEffect(() => {
    fetch(
      `https://us-central1-formux-8d67b.cloudfunctions.net/form?formID=${formID}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Got data from function", data);

        setUserData(generateInitialUserData(data))
        setFormData(data);
      });
  }, []);

  return (
    <form>
      <Tag style={{ marginBottom: "32px" }}>
        <input
          type="checkbox"
          id="debug"
          value={globalDebug}
          onChange={(e) => setGlobalDebug(e.target.checked)}
        />
        <label htmlFor="debug"> Debug mode</label>
      </Tag>

      <h2>{formData.meta && formData.meta.title}</h2>

      {formData.blocks ? (
        formData.blocks &&
        formData.blocks.map((block, index) => (
          <Block
            block={block}
            key={index}
            index={index}
            globalDebug={globalDebug}
            onChange={handleBlockChange}
            value={userData[block.key]}
          />
        ))
      ) : (
        <p>Loading form...</p>
      )}

      {globalDebug && (
        <p style={{ whiteSpace: "pre-wrap", marginTop: "64px" }}>
          Userdata: {beautify(userData, null, 2, 80)}
        </p>
      )}
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


const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > form {
    width: 100%;
  }

  & > form > h2 {
    font-size: 2.5em;
    margin-bottom: 16px;
  }
`;

