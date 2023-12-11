// slider.js

export const createSlider = (data, targetImage, targetButtons) => {
  const sliderButtons = document.getElementById(targetButtons);
  const productImage = document.querySelector(targetImage);

  data.img.forEach((picture, index) => {
    const pictureElement = document.createElement("img");
    pictureElement.src = picture;
    pictureElement.classList.add("slider-picture", "none");
    pictureElement.setAttribute("data-index", index);

    const buttonElement = document.createElement("button");
    buttonElement.classList = "slider-button";

    buttonElement.addEventListener("click", () => {
      if (buttonElement.classList.contains("active")) return;

      document
        .querySelectorAll(".slider-button")
        .forEach((button) => button.classList.remove("active"));
      buttonElement.classList.add("active");

      document
        .querySelectorAll(".slider-picture")
        .forEach((picture) => picture.classList.add("none"));
      document
        .querySelector(`.slider-picture[data-index='${index}']`)
        .classList.remove("none");
    });

    productImage.appendChild(pictureElement);
    sliderButtons.appendChild(buttonElement);

    if (index === 0) buttonElement.click();
  });
};
