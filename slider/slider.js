"use strict";

let slider = function (sliderElement, options = {}) {
  if (!sliderElement) return;

  const defaultOptions = {
    gap: 16,
  };

  const config = { ...defaultOptions, ...options };

  const wrapper = sliderElement.querySelector(".slider-wrapper");
  const cards = wrapper.children;
  const leftBtn = sliderElement.querySelector('[data-slider-direction="left"]');
  const rightBtn = sliderElement.querySelector(
    '[data-slider-direction="right"]'
  );

  if (!wrapper || !leftBtn || !rightBtn) {
    console.error("Slider elements are missing!");
    return;
  }

  wrapper.addEventListener("scroll", updateButtonState);
  leftBtn.addEventListener("click", () => slide(false));
  rightBtn.addEventListener("click", () => slide(true));

  function slide(toRight) {
    const cardWidth = cards[0].clientWidth;
    const nbrCards = Math.floor(sliderElement.clientWidth / cardWidth);
    const gap = config.gap;

    const scrollValue =
      (toRight ? 1 : -1) * (nbrCards * cardWidth + nbrCards * gap);

    wrapper.scrollBy({
      left: scrollValue,
      behavior: "smooth",
    });

    updateButtonState();
  }

  function updateButtonState() {
    leftBtn.disabled = wrapper.scrollLeft === 0;
    rightBtn.disabled =
      wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth;
  }

  updateButtonState();

  return {
    next: () => slide(true),
    prev: () => slide(false),
  };
};

// Initialize the slider
const mySlider = document.getElementById("slider");
const sliderInstance = slider(mySlider, { gap: 16 });
