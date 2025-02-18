const getBaseUrl = () => {
  return (
    import.meta.env.VITE_BACKEND_URL ||
    "https://bookstore-mern-backend-alpha.vercel.app"
  );
};

export default getBaseUrl;
