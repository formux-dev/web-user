const fetchForm = async (key, { formID }) => {
  const res = await fetch(
    `https://us-central1-formux-8d67b.cloudfunctions.net/fetchform?formID=${formID}`
  );
  return await res.json();
};

const submitForm = async data => {
  return await fetch(`https://us-central1-formux-8d67b.cloudfunctions.net/submitform`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};

export { fetchForm, submitForm };
