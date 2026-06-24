let API_BASE_URL = "";

if (window.location.hostname === "localhost") {
  // Local development
  API_BASE_URL = "http://localhost:5000";
} else {
  // Live domain
  API_BASE_URL = "https://micmastersindia.com";
}

export default API_BASE_URL;
