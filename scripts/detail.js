import {
  productID,
  API_HEADER_URL,
  API_DETAILS_URL,
  fetchData,
} from "./common.js";

// Selectors
const productContainer = document.querySelector("#product-details");
const logoEl = document.getElementById("logo");
const footerEl = document.getElementById("footer");

// Load header data
const loadHeader = async () => {
  const data = await fetchData(API_HEADER_URL);
  logoEl.src = data.logo;
  footerEl.textContent = data.footer;
};

// Initial load
loadHeader();
