/*
 * # Selectors
 */
const productContainer = document.querySelector("#products");
/**
 * # APIs
 */
const loadProduct = async function (page) {
  const response = await fetch(
    `https://www.includecore.com/api/projects/4854/databases/7334-Products?pageSize=3&page="${page}`
  );
  const data = await response.json();
  console.log("data", data);
  data.data.forEach((data) => {
    console.log(data);
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
loadProduct(1);
/**
 * # Events
 */
