import styled from "styled-components";
import { useEffect, useState } from "react";
import beautify from "json-beautify";

import Navbar from "./Navbar";
import Tag from "./Tag";
import Block from "./Block";
import Title from "./Title";

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
     
      <form>
        <Debug userData={userData} globalDebug={globalDebug} setGlobalDebug={setGlobalDebug}/>
        <Title>{formData.meta && formData.meta.title}</Title>
        <BlockList formData={formData} userData={userData} globalDebug={globalDebug} handleBlockChange={handleBlockChange}/>
      </form>
  
    </Wrapper>
  );
}

function Debug({ userData, globalDebug, setGlobalDebug }) {
  return (
    <div>
      <Tag >
        <input
          type="checkbox"
          id="debug"
          value={globalDebug}
          onChange={(e) => setGlobalDebug(e.target.checked)}
        />
        <label htmlFor="debug"> Debug mode</label>
      </Tag>

      {globalDebug && (
        <p style={{ whiteSpace: "pre-wrap" }}>
          Userdata: {beautify(userData, null, 2, 80)}
        </p>
      )}
    </div>
  )
}

function BlockList({ formData, userData, globalDebug, handleBlockChange   }) {
  return formData.blocks ? (
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
  )
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