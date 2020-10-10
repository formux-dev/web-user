import styled from "styled-components";
import { useEffect, useState } from "react";
import beautify from "json-beautify";

import Navbar from "./Navbar";
import Tag from "./Tag";
import Block from "./Block";

export default function Form({ formID }) {
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
    <Wrapper>
      <Navbar/>
     
      <FormContainer>
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
      </FormContainer>
  
    </Wrapper>
  );
}


const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 700px;
  padding: 64px 32px;

  @media (max-width: 500px) {
    max-width: unset;
    width: 100%;
    padding: 24px 16px;
  }
`

const FormContainer = styled.form`
  & > h2 {
   
  }
`;

