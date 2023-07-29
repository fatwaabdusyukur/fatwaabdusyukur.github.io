window.onload = function () {
  document
    .querySelector("header button")
    .addEventListener("click", (button) => {
      button.preventDefault();
      const nav = document.querySelector(".nav-link-container");
      nav.classList.toggle("hidden");

      document.querySelectorAll(".hamburger-menu").forEach((span, index) => {
        if (index === 0) span.classList.toggle("flip-one");
        else if (index === 1) span.classList.toggle("dissepear");
        else span.classList.toggle("flip-two");
      });
    });
};
