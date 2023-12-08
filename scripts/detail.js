import {
  productID,
  API_HEADER_URL,
  API_DETAILS_URL,
  fetchData,
} from "./common.js";

// Selectors
const productContainer = document.querySelector("#product-details");
const productImage = document.querySelector(".product-image-section");
const logoEl = document.getElementById("logo");
const footerEl = document.getElementById("footer");
const backBtn = document.getElementById("backBtn");

const renderProductDetails = (data) => {
  productContainer.innerHTML = "";
  productImage.innerHTML = "";

  const productImg = document.createElement("img");
  productImg.src = data.img[0];
  productImg.alt = "product img";
  productImg.classList.add("product-img");

  // general div for product details
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  const productTitle = document.createElement("h2");
  productTitle.textContent = data.title;

  // just for long desc. => innerHTML
  const productDesc = document.createElement("div");
  productDesc.innerHTML = data.desc;

  const productPrice = document.createElement("div");
  productPrice.classList.add("price");
  productPrice.textContent = data.price;

  const productNumber = document.createElement("span");
  productNumber.textContent = data.item_num;

  const productShipping = document.createElement("span");
  productShipping.classList.add("shipping");
  productShipping.textContent = data.shipping;

  // Append elements to productCard
  productImage.appendChild(productImg);
  productCard.appendChild(productNumber);
  productCard.appendChild(productTitle);
  productCard.appendChild(productDesc);
  productCard.appendChild(productPrice);
  productCard.appendChild(productShipping);

  // Append productCard to productContainer
  productContainer.appendChild(productCard);
};

// Render pagination
const renderPaginate = (pagination) => {
  const pageNumber = pagination.last_page;
  const paginationContainer = document.getElementById("pagination");

  for (let i = 1; i <= pageNumber; i++) {
    const pageNumberLink = document.createElement("a");
    pageNumberLink.classList.add("pagination-link");

    if (i == currentPage) {
      pageNumberLink.classList.add("active");
    } else {
      pageNumberLink.href = `/productCatalog.html?page=${i}`;
    }

    paginationContainer.appendChild(pageNumberLink);
  }
};

// load product-details
const loadDetails = async (page) => {
  try {
    const result = await fetchData(API_DETAILS_URL);
    const details = result.data;

    if (details) {
      //console.log("details=", details);
      renderProductDetails(details);
      const pagination = result.pagination;
      renderPaginate(pagination);
    } else {
      console.error("Error loading details: Data is undefined");
    }
  } catch (error) {
    console.error("Error loading details:", error);
  }
};

// Event listener for the back button
backBtn.addEventListener("click", () => {
  // Navigate to the productCatalog.html page
  window.location.href = "/productCatalog.html";
});

// Load header data
const loadHeader = async () => {
  const data = await fetchData(API_HEADER_URL);
  logoEl.src = data.data.logo;
  footerEl.textContent = data.data.footer;
};

// Initial load
loadHeader();
loadDetails(0);
