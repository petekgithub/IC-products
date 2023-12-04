const currentPage = new URL(window.location.href).searchParams.get("page") ?? 1; // assign a define value a null

const API_PRODUCTS_URL = `https://www.includecore.com/api/projects/4854/databases/7334-Products?pageSize=3&page=${currentPage}`;

const API_HEADER_URL =
  "https://www.includecore.com/api/projects/4854/globals/7319-globals";

// Selectors
const productContainer = document.querySelector("#products");
const logoEl = document.getElementById("logo");
const footerEl = document.getElementById("footer");
const titleEl = document.getElementById("title");
const paginateItems = document.getElementById("pagination");

// Fetch data from API
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error (e.g., display a message to the user)
  }
};

// Render product list
// change the every item to createElement !! for security reason
const renderProductList = (data) => {
  productContainer.innerHTML = "";
  data.forEach((item) => {
    const productTemplate = `
      <div class="product-card">
        <img src="${item.products_list.product_image}" alt="product" />
        <h2>${item.products_list.product_title}</h2>
        <div class="desc-box">${item.products_list.product_description}</div>
        <span>Price: ${item.products_list.product_price}</span>
      </div>
    `;
    productContainer.insertAdjacentHTML("afterbegin", productTemplate);
  });
};

// create a function for short desc. like show the first 10 text-char or somethinglike that

// Render pagination
const renderPaginate = (pagination) => {
  const pageNumber = pagination.last_page;

  for (let i = 1; i <= pageNumber; i++) {
    const anchor = document.createElement("a");
    anchor.href = `/productCatalog.html?page=${i}`;
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    anchor.append(pageButton);
    paginateItems.append(anchor);
  }
};

// Load product data
const loadProduct = async (page) => {
  const data = await fetchData(API_PRODUCTS_URL);
  // const pageSize = 6;
  // const pages = Array.from(
  //   { length: Math.ceil(data.data.length / pageSize) },
  //   (_, index) => data.data.slice(index * pageSize, (index + 1) * pageSize)
  // );

  //renderPaginate(pages, page);

  const products = data.data;
  renderProductList(products);

  const pagination = data.pagination;
  renderPaginate(pagination);
};

// Load header data
const loadHeader = async () => {
  const data = await fetchData(API_HEADER_URL);
  logoEl.src = data.logo;
  footerEl.textContent = data.footer;
  titleEl.textContent = data.title;
};

// Initial load
loadProduct(0);
loadHeader();
