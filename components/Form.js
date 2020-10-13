import styled from "styled-components";
import beautify from "json-beautify";
import { useContext } from "react";
import { useQuery } from "react-query";

import { FormContext, FormProvider } from "./context/FormContext"
import { fetchForm } from "./api/endpoints";

import Navbar from "./Navbar";
import Tag from "./Tag";
import Block from "./Block";
import Title from "./Title";
import Rating from "./Rating";

export default function Form({ formID }) {
  const { data: formData, isFetching, error } = useQuery(["form", { formID }], fetchForm)

  if (isFetching) {
    return <span>Loading...</span>
  }

  if (error) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Wrapper>
      <Navbar/>

      <FormProvider>
        <form>
          <Debug/>
          <Title>{formData.meta && formData.meta.title}</Title>
          <BlockList formData={formData}/>
          <Rating/>
        </form>
      </FormProvider>
    </Wrapper>
  );
}

function Debug() {
  const { debug, setDebug, userData } = useContext(FormContext);

  return (
    <div>
      <Tag >
        <input
          type="checkbox"
          id="debug"
          value={debug}
          onChange={(e) => setDebug(e.target.checked)}
        />
        <label htmlFor="debug"> Debug mode</label>
      </Tag>

      {debug && (
        <p style={{ whiteSpace: "pre-wrap" }}>
          Userdata: {beautify(userData, null, 2, 80)}
        </p>
      )}
    </div>
  )
}

function BlockList({ formData }) {
  const { userData, setUserData } = useContext(FormContext)

  const handleBlockChange = ({ key, value }) => {
    setUserData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  return formData && formData.blocks ? (
    formData.blocks.map((block, index) => (
      <Block
        block={block}
        key={index}
        index={index}
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