import styled from "styled-components";
import { useQuery } from "react-query";

import { FormProvider } from "./context/FormContext";
import { fetchForm } from "./api/endpoints";

import Navbar from "./Navbar";
import Block from "./Block";
import Title from "./Title";
import Rating from "./Rating";
import FormSkeleton from "./FormSkeleton";
import Debug from "./Debug";

export default function Form({ formID }) {
  const { isLoading, isError, error, data: formData } = useQuery(["form", { formID }], fetchForm);

  if (isLoading) {
    return (
      <Wrapper>
        <Navbar />
        <FormSkeleton />
      </Wrapper>
    );
  }

  if (isError) {
    return (
      <Wrapper>
        <Navbar />
        <span>Error: {error.message}</span>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Navbar />

      <FormProvider>
        <form>
          <Debug />

          <Title>{formData.meta && formData.meta.title}</Title>
          <BlockList formData={formData} />
          <Rating />
        </form>
      </FormProvider>
    </Wrapper>
  );
}

function BlockList({ formData }) {
  return (
    formData &&
    formData.blocks &&
    formData.blocks.map((block, index) => <Block block={block} key={index} index={index} />)
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
`;
