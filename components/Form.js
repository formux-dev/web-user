import styled from "styled-components";
import { useEffect, useContext } from "react";
import beautify from "json-beautify";
import { useQuery } from "react-query";

import { FormContext } from "./context/FormContext"
import { fetchForm } from "./api/endpoints";

import Navbar from "./Navbar";
import Tag from "./Tag";
import Block from "./Block";
import Title from "./Title";
import Rating from "./Rating";

export default function Form({ formID }) {
  const { formData, setFormData, setUserData } = useContext(FormContext)

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

  const { data, isFetching, error, isFetched } = useQuery(["form", { formID }], fetchForm)

  
  // if (isFetching) {
  //   return <span>Loading...</span>
  // }

  // if (error) {
  //   return <span>Error: {error.message}</span>
  // }

  // if (isFetched && data.blocks) {
  //   setUserData(generateInitialUserData(data));
  //   setFormData(data);
  // }

  // useEffect(() => {
  //   if (data.blocks) {
  //     setUserData(generateInitialUserData(data));
  //   }
  // }, [data]);

  // TODO: Read logs


  return (
    <Wrapper>
      <Navbar/>

      {/* {isFetching && <span>Loading...</span>}

      {error && <span>{error.message}</span>}

      {isFetched && <form>
        <Debug/>
        <Title>{formData.meta && formData.meta.title}</Title>
        <BlockList/>
        <Rating/>
      </form>} */}

     
      <form>
        <Debug/>
        <Title>{formData.meta && formData.meta.title}</Title>
        <BlockList/>
        <Rating/>
      </form>
  
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

function BlockList() {
  const { formData, userData, setUserData } = useContext(FormContext)

  const handleBlockChange = ({ key, value }) => {
    setUserData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  return formData.blocks ? (
    formData.blocks &&
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