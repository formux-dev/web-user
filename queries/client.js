import { getFormUrl, postFormUrl } from "./config";

const getForm = async (key, { formId }) => {
  return await (await fetch(getFormUrl(formId))).json();
};

const postForm = async data => {
  return await (
    await fetch(postFormUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
  ).json();
};

export { getForm, postForm };
