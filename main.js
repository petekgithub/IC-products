const API_PRODUCTS_URL =
  "https://www.includecore.com/api/projects/4854/databases/7334-Products";
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

// Render pagination
const renderPaginate = (pages, activePage) => {
  paginateItems.innerHTML = "";
  pages.forEach((item, index) => {
    const paginateTemplate = `
      <button paginate="${index}">
        <img src="/assets/${
          Number(activePage) === index ? "active-paginate" : "paginate"
        }.png" alt="" />
      </button>
    `;
    paginateItems.insertAdjacentHTML("afterbegin", paginateTemplate);
  });
};

// Event handling for pagination
const handlePagination = (e) => {
  const selectedPage = e.target.getAttribute("paginate");
  loadProduct(selectedPage);
};

// Load product data
const loadProduct = async (page) => {
  const data = await fetchData(API_PRODUCTS_URL);
  const pageSize = 6;
  const pages = Array.from(
    { length: Math.ceil(data.data.length / pageSize) },
    (_, index) => data.data.slice(index * pageSize, (index + 1) * pageSize)
  );

  renderProductList(pages[page]);
  renderPaginate(pages, page);
};

// Load header data
const loadHeader = async () => {
  const data = await fetchData(API_HEADER_URL);
  logoEl.src = data.logo;
  footerEl.textContent = data.footer;
  titleEl.textContent = data.title;
};

// Set up event listener for pagination
paginateItems.addEventListener("click", handlePagination);

// Initial load
loadProduct(0);
loadHeader();
