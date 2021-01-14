import Head from "next/head";
import { ReactQueryDevtools } from "react-query-devtools";

import GlobalStyle from "./globalStyles";

import Form from "../components/Form";
import { FormProvider } from "../components/context/FormContext";

export default function Home({ formID, title, description }) {
  return (
    <div>
      <GlobalStyle />
      <ReactQueryDevtools initialIsOpen={false} />

      <Head>
        <title>{"Formux Survey - " + title}</title>
        <meta name="description" content={description}></meta>
        <meta property="og:title" content={"Formux Survey - " + title}></meta>
        <meta property="og:site_name" content="Formux"></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="og:image" content="/social.jpg"></meta>
        <meta property="og:url" content={"https://formux.web.app/" + formID}></meta>
        <meta name="twitter:card" content="summary"></meta>

        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Lora:wght@400;500&display=swap"
          rel="stylesheet"
        ></link>

        <link rel="icon" href="/favicon.ico"></link>
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <meta name="theme-color" content="#3281fb"></meta>
      </Head>

      <FormProvider>
        <Form formID={formID} />
      </FormProvider>
    </div>
  );
}

export async function getStaticProps({ params: { formID } }) {
  const response = await fetch(
    "https://us-central1-formux-8d67b.cloudfunctions.net/fetchFormMeta?formID=" + formID
  );

  const json = await response.json();

  return {
    props: {
      formID,
      ...json,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch("https://us-central1-formux-8d67b.cloudfunctions.net/fetchFormIDs");
  const json = await response.json();

  return {
    paths: json.forms.map(form => ({
      params: {
        formID: form,
      },
    })),
    fallback: false,
  };
}
