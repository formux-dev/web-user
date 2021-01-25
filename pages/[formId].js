import Head from "next/head";
import { ReactQueryDevtools } from "react-query-devtools";

import GlobalStyle from "./globalStyles";

import Form from "../components/Form";
import { FormProvider } from "../components/context/FormContext";

import { getForm, getForms } from "../queries/generator";

export default function Home({ formId, title, description }) {
  return (
    <div>
      <GlobalStyle />
      <ReactQueryDevtools initialIsOpen={false} />

      <Head>
        <meta charSet="utf-8"></meta>
        <title>{`${title} - Formux`}</title>
        <meta name="description" content={description}></meta>
        <meta property="og:title" content={`${title} - Formux`}></meta>
        <meta property="og:site_name" content="Formux"></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="og:image" content="/social.jpg"></meta>
        <meta property="og:url" content={"https://formux.web.app/" + formId}></meta>
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

        <script
          async
          defer
          data-domain="formux.web.app"
          src="https://plausible.io/js/plausible.js"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible = window.plausible || function(){" "}
              {(window.plausible.q = window.plausible.q || []).push(arguments)}
          `,
          }}
        ></script>
      </Head>

      <FormProvider>
        <Form formId={formId} />
      </FormProvider>
    </div>
  );
}

export async function getStaticProps({ params: { formId } }) {
  const json = await getForm(formId);

  return {
    props: {
      formId,
      ...json.meta,
    },
  };
}

export async function getStaticPaths() {
  const json = await getForms();

  return {
    paths: json.map(form => ({
      params: {
        formId: form.formId,
      },
    })),
    fallback: false,
  };
}
