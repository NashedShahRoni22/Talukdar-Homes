export const getApi = async (endpoint, headers = {}) => {
  try {
    const res = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API error:", error);
    return null;
  }
};
