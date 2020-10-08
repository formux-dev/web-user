import Head from "next/head";
import * as firebase from "firebase/app";
import "firebase/firestore";
import Form from "../components/form";
import GlobalStyle from "./globalStyles";

export default function Home({ formID, title, description }) {
  return (
    <div>
      <GlobalStyle />

      <Head>
        <title>{"Formux Survey - " + title}</title>
        <meta name="description" content={description}></meta>
        <meta property="og:title" content={"Formux Survey - " + title}></meta>
        <meta property="og:site_name" content="Formux"></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="og:image" content="/social.jpg"></meta>
        <meta
          property="og:url"
          content={"https://formux.web.app/" + formID}
        ></meta>
        <meta name="twitter:card" content="summary"></meta>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        ></link>

        <link rel="icon" href="/favicon.ico"></link>
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon-192x192.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <meta name="theme-color" content="#3281fb"></meta>
      </Head>

      <Form formID={formID} />
    </div>
  );
}

export const connectFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }

  return firebase;
};

export async function getStaticProps({ params: { formID } }) {
  const firebase = await connectFirebase();

  const form = await firebase.firestore().collection("forms").doc(formID).get();

  return {
    props: {
      formID,
      ...form.data().meta,
    },
  };
}

export async function getStaticPaths() {
  const firebase = await connectFirebase();

  const forms = await firebase.firestore().collection("forms").get();

  return {
    paths: forms.docs.map((doc) => ({
      params: {
        formID: doc.id,
      },
    })),
    fallback: false,
  };
}
