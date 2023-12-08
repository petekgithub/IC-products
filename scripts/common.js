// necessary functions and constants from this module.

// constants
export const productID = new URL(window.location.href).searchParams.get("id");
export const currentPage =
  new URL(window.location.href).searchParams.get("page") ?? 1; // ?? is used to avoid getting null when creating a page.
const articleId = new URL(window.location.href).searchParams.get("id");

// APIs
export const API_HEADER_URL =
  "https://www.includecore.com/api/projects/4854/globals/7319-globals";

//export const API_DETAILS_URL = `https://www.includecore.com/api/projects/4854/databases/7334-Products/entries/id=${productID}`;
export const API_DETAILS_URL = ` https://www.includecore.com/api/projects/4854/databases/7334-Products/entries/9335`;

export const API_PRODUCTS_URL = `https://www.includecore.com/api/projects/4854/databases/7334-Products?pageSize=3&page=${currentPage}`;

// Fetch data from API
export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched data:", data);

    return { data };
  } catch (error) {
    return Promise.reject(error);
  }
};
