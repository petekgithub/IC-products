/*
 * # Selectors
 */
const productContainer = document.querySelector("#products");
const logoEl = document.getElementById("logo");
const footerEl = document.getElementById("footer");
const titleEl = document.getElementById("title");
const paginateItems = document.getElementById("pagination");

/**
 * # APIs
 */

const loadProduct = async function (page) {
  const response = await fetch(
    `https://www.includecore.com/api/projects/4854/databases/7334-Products`
  );
  const data = await response.json();
  // pages
  const productData = data.data;
  const pageSize = 6;
  const pages = [];
  for (let index = 0; index < productData.length; index += pageSize) {
    pages.push(productData.slice(index, index + pageSize));
  }
  // init product list
  const renderProductList = function (activePage) {
    productContainer.innerHTML = "";
    pages[activePage].forEach((data) => {
      const productTepplate = `
      <div class="product-card">
      <img
        src="${data.products_list.product_image}"
        alt="product"
      />
      <h2>${data.products_list.product_title}</h2>
      <div class="desc-box">
      ${data.products_list.product_description}
      </div>
      <span>Price: ${data.products_list.product_price}</span>
    </div>
      `;
      productContainer.insertAdjacentHTML("afterbegin", productTepplate);
    });
  };
  renderProductList(0);
  // pagination
  const renderPaginate = function (activePage) {
    console.log("activePage", activePage);
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
    const paginateBtns = document.querySelectorAll(
      ".paginate-container button"
    );
    paginateBtns.forEach((el) => {
      el.addEventListener("click", function (e) {
        const selectedPage = e.currentTarget.getAttribute("paginate");
        renderProductList(selectedPage);
        renderPaginate(selectedPage);
      });
    });
  };
  renderPaginate(0);
};
loadProduct(1);
const loadHeader = async function () {
  const response = await fetch(
    "https://www.includecore.com/api/projects/4854/globals/7319-globals"
  );
  const data = await response.json();
  logoEl.src = data.logo;
  footerEl.textContent = data.footer;
  titleEl.textContent = data.title;
};
loadHeader();
/**
 * # Events
 */
