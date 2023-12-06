// necessary functions and constants from this module.

// constants
export const productID = new URL(window.location.href).searchParams.get("id");
export const currentPage =
  new URL(window.location.href).searchParams.get("page") ?? 1; // ?? is used to avoid getting null when creating a page.

// APIs
export const API_HEADER_URL =
  "https://www.includecore.com/api/projects/4854/globals/7319-globals";
export const API_DETAILS_URL = `https://www.includecore.com/api/projects/4854/databases/7334-Products/entries/id=${productID}`;
export const API_PRODUCTS_URL = `https://www.includecore.com/api/projects/4854/databases/7334-Products?pageSize=3&page=${currentPage}`;

// Fetch data from API
export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const loadHeader = async (logoEl, footerEl) => {
  const data = await fetchData(API_HEADER_URL);
  logoEl.src = data.logo;
  footerEl.textContent = data.footer;
};
