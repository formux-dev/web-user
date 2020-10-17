const fetchForm = async (key, { formID }) => {
  const res = await fetch(
    `https://us-central1-formux-8d67b.cloudfunctions.net/fetchform?formID=${formID}`
  );
  return await res.json();
};

const submitForm = async data => {
  return fetch(`https://us-central1-formux-8d67b.cloudfunctions.net/submitform`, data);
};

export { fetchForm, submitForm };
