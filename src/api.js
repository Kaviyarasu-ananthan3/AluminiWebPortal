const backendByFrontendHost = {
  "aluminiwebportal-1.onrender.com": "https://aluminiwebportalbackend-1.onrender.com",
};

const defaultApiUrl =
  backendByFrontendHost[window.location.hostname] ||
  "https://aluminiwebportalbackend.onrender.com";

export const API_BASE_URL = (
  process.env.REACT_APP_API_URL || defaultApiUrl
).replace(/\/$/, "");
