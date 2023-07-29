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

  document
    .querySelectorAll(".project-card .project-body button")
    .forEach((elemen) => {
      elemen.addEventListener("click", (button) => {
        const paragraf = button.target.parentElement.querySelector("p");
        paragraf.classList.toggle("truncate");

        const text = paragraf.classList.contains("truncate")
          ? "More..."
          : "Hide";

        button.target.innerText = text;
      });
    });

  document
    .querySelectorAll(".carousel .carousel-button")
    .forEach((button, index) => {
      const slides = button.parentElement.querySelector("ul");
      slides.children[0].dataset.active = true;

      button.addEventListener("click", () => {
        const offset = index === 1 ? 1 : -1;

        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
      });
    });
};
