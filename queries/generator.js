import { getFormsUrl, getFormUrl } from "./config";

async function getForms() {
  return await (await fetch(getFormsUrl)).json();
}

async function getForm(formId) {
  return await (await fetch(getFormUrl(formId))).json();
}

export { getForms, getForm };
