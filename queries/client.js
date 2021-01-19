import { getFormUrl, postFormUrl } from "./config";

async function getForm(_, formId) {
  return await (await fetch(getFormUrl(formId))).json();
}

async function postForm(data) {
  return await (
    await fetch(postFormUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
  ).json();
}

export { getForm, postForm };
