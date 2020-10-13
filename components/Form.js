import { ThemeProvider } from "styled-components";
import { useQuery } from "react-query";

import { FormProvider } from "./context/FormContext";
import { fetchForm } from "./api/endpoints";

import Navbar from "./Navbar";
import Block from "./Block";
import Title from "./Title";
import Rating from "./Rating";
import FormSkeleton from "./FormSkeleton";
import Debug from "./Debug";
import Wrapper from "./Wrapper";

export default function Form({ formID }) {
  const { isLoading, isError, error, data: formData } = useQuery(["form", { formID }], fetchForm);

  const theme = {
    colorTheme: "dark",
  };

  // const theme = {
  //   colorTheme: "dark",
  // };

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
        <Title>Error</Title>
        <p>{error.message}</p>
      </Wrapper>
    );
  }

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

function BlockList({ formData }) {
  return (
    formData &&
    formData.blocks &&
    formData.blocks.map((block, index) => <Block block={block} key={index} index={index} />)
  );
}
