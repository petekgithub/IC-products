import {
  productID,
  API_HEADER_URL,
  API_DETAILS_URL,
  fetchData,
} from "./common.js";
import { createSlider } from "./slider.js";

// Selectors
const productContainer = document.querySelector("#product-details");
const logoEl = document.querySelector("#logo");
const footerEl = document.querySelector("#footer");
const backBtn = document.querySelector("#backBtn");

const renderProductDetails = (data) => {
  productContainer.innerHTML = "";

  createSlider(data, ".product-image-section", "main_pictures_buttons");

  // General div for product details
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  const productTitle = document.createElement("h2");
  productTitle.textContent = data.title;

  // just for long desc. => innerHTML
  const productDesc = document.createElement("div");
  productDesc.innerHTML = data.desc;

  const productPrice = document.createElement("div");
  productPrice.classList.add("price");
  productPrice.textContent = `€ ${data.price}`;

  const productNumber = document.createElement("span");
  productNumber.textContent = data.item_num;

  const productShipping = document.createElement("span");
  productShipping.classList.add("shipping");
  productShipping.textContent = data.shipping;

  // Append elements to productCard
  //productImage.appendChild(productImg);
  productCard.appendChild(productNumber);
  productCard.appendChild(productTitle);
  productCard.appendChild(productDesc);
  productCard.appendChild(productPrice);
  productCard.appendChild(productShipping);

  // Append productCard to productContainer
  productContainer.appendChild(productCard);
};

// load product-details
const loadDetails = async () => {
  try {
    const result = await fetchData(API_DETAILS_URL);
    const details = result.data;

    if (details) {
      renderProductDetails(details);
    } else {
      console.error("Error loading details: Data is undefined");
    }
  } catch (error) {
    console.error("Error loading details:", error);
  }
};

// Event listener for the back button
backBtn.addEventListener("click", (event) => {
  // Navigate to the productCatalog.html page
  event.preventDefault();
  window.location.href = "/productCatalog.html";
});

{
  /* <a href="/productCatalog.html">< Back </a> */
}

// Load header data
const loadHeader = async () => {
  const data = await fetchData(API_HEADER_URL);
  logoEl.src = data.data.logo;
  footerEl.textContent = data.data.footer;
};

// Initial load
loadHeader();
loadDetails();
