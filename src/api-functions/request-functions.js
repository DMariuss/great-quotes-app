//declar functiile ce trimit solicitarile aici, pt o mai buna accesibilitate -> in locul declararii in fiecare componenta
// 🢣 vor fi folosite pt a fi trimise catre hook-ul personalizat useHttp ca si argumente

const FIREBASE_DOMAIN =
  "https://great-quotes-app-2ac05-default-rtdb.europe-west1.firebasedatabase.app";

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
