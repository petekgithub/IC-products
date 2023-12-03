/**
 * Selectors
 */
const productContainer = document.getElementById("products");
const logoEl = document.getElementById("logo");
const footerEl = document.getElementById("footer");
const titleEl = document.getElementById("title");
const paginateItems = document.getElementById("pagination"); // Adjust this ID based on your HTML

/**
 * APIs
 */

// product list
const loadProducts = async function (page) {
  try {
    const response = await fetch(`
      https://www.includecore.com/api/projects/4854/databases/7334-Products`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // pages
    const productData = data.data;
    const pageSize = 5;
    const pages = [];

    for (let i = 0; i < productData.length; i += pageSize) {
      pages.push(productData.slice(i, i + pageSize));
    }

    // render product list
    const renderProductList = (activePage) => {
      productContainer.innerHTML = "";
      pages[activePage].forEach((data) => {
        const productTemplate = `
          <div class="product-card">
            <img 
              src="${data.products_list.product_image}" 
              alt="product"
            />
            <h2>${data.products_list.product_title}</h2>
            <div class="desc-box">
              ${data.products_list.product_description}
            </div>
            <span>Price: £ ${data.products_list.product_price}</span>
          </div>
        `;
        productContainer.insertAdjacentHTML("afterbegin", productTemplate);
      });
    };

    // pagination
    if (paginateItems) {
      const renderPaginate = (activePage) => {
        console.log("active page:" + activePage);
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

        if (paginateBtns) {
          paginateBtns.forEach((el) => {
            el.addEventListener("click", function (e) {
              const selectedPage = e.currentTarget.getAttribute("paginate");
              renderProductList(selectedPage);
              renderPaginate(selectedPage);
            });
          });
        }
      };

      renderPaginate(0);
      // renderProductList(0);
    } else {
      console.error("Element with ID 'pagination' not found.");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

loadProducts(1);
