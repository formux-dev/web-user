const baseUrl = "https://us-central1-formux-8d67b.cloudfunctions.net/api";

const getFormsUrl = `${baseUrl}/forms`;
const getFormUrl = formId => `${baseUrl}/forms/${formId}`;
const postFormUrl = `${baseUrl}/forms`;

export { getFormsUrl, getFormUrl, postFormUrl };
