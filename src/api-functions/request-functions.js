//declar functiile ce trimit solicitarile aici, pt o mai buna accesibilitate -> in locul declararii in fiecare componenta
// 🢣 vor fi folosite pt a fi trimise catre hook-ul personalizat useHttp ca si argumente

const FIREBASE_DOMAIN =
  "https://great-quotes-app-2ac05-default-rtdb.europe-west1.firebasedatabase.app";

// 🢣 functie pt a adauta un citat
export const addQuote = async (quoteData) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quoteData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not post the quote");
  }

  return null;
};

// 🢣 functie pt a prelua toate citatele
export const getAllQuotes = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch quotes!");
  }

  //transform datele primite, din Obiect in Vector.
  const transformedQuotes = [];
  for (let key in data) {
    transformedQuotes.push({ id: key, ...data[key] });
  }

  return transformedQuotes;
};

// 🢣 functie pt a prelua un singur citat
export const getSingleQuote = async (quoteId) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the quote!");
  }

  return { id: quoteId, ...data };
};

// 🢣 functie pt trimiterea comentariului catre server
export const addComment = async (commentData) => {
  //trimit comentariile catre server, pe acelasi ID cu cel al citatului (le grupez)
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${commentData.quoteId}.json`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData.data),
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment!");
  }

  return { commentId: data.name };
};

// 🢣 functie pt preluarea tuturor comentariilor
export const getAllComments = async (quoteId) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch comments!");
  }
  const transformedComments = [];
  for (let key in data) {
    transformedComments.push({ id: key, ...data[key] });
  }

  return transformedComments;
};
