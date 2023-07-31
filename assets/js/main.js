const appEl = document.getElementById("app");

const fileEJS = {
  header: "/templates/header.ejs",
  footer: "/templates/footer.ejs",
};

const pages = {
  home: "/pages/home.ejs",
};

async function loadEJS(path) {
  try {
    const response = await fetch(path);
    return await response.text();
  } catch (error) {
    return console.error(error);
  }
}

async function fetchData() {
  try {
    const response = await fetch("/assets/js/data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function renderEJS(template, data) {
  const renderedTemplate = ejs.render(template, data);
  appEl.innerHTML = renderedTemplate;
}

function displayApp() {
  let templates = [];
  let data = [];
  fetchData().then((res) => (data = [...res.projects]));

  for (const route in fileEJS) {
    templates.push(loadEJS(fileEJS[route]));
  }

  templates.splice(1, 0, loadEJS(pages.home));

  Promise.all(templates).then(
    ([headerContent, indexContent, footerContent]) => {
      const combinedString =
        headerContent + "\n" + indexContent + "\n" + footerContent;
      renderEJS(combinedString, { data: data });
    }
  );
}

displayApp();

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector).children.length > 0) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector).children.length > 0) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

window.onload = function () {
  waitForElm("#app")
    .then((app) => {
      const phrases = ["Web Development", "Android Development"];
      let sleepTime = 100;
      let activePhrase = 0;

      const reactiveText = async () => {
        const text = app.querySelector(".jumbotron p .reactive-text");

        while (true) {
          let phrase = phrases[activePhrase];

          for (let i = 0; i < phrase.length; i++) {
            text.innerText = phrase.substring(0, i + 1);
            await sleep(sleepTime);
          }

          await sleep(sleepTime * 10);

          for (let i = phrase.length; i > 0; i--) {
            text.innerText = phrase.substring(0, i - 1);
            await sleep(sleepTime);
          }

          await sleep(sleepTime * 5);

          activePhrase =
            activePhrase === phrases.length - 1 ? 0 : activePhrase + 1;
        }
      };

      reactiveText();

      app.querySelector("header button").addEventListener("click", (button) => {
        button.preventDefault();
        const nav = app.querySelector(".nav-link-container");
        nav.classList.toggle("hidden");

        app.querySelectorAll(".hamburger-menu").forEach((span, index) => {
          if (index === 0) span.classList.toggle("flip-one");
          else if (index === 1) span.classList.toggle("dissepear");
          else span.classList.toggle("flip-two");
        });
      });

      app
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

      app
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

      const modal = app.querySelector(".modal-container");

      app
        .querySelectorAll(
          ".project-container .project-card .project-body .carousel .carousel-item"
        )
        .forEach((card) => {
          card.addEventListener("click", (item) => {
            const input =
              item.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
                "input"
              );
            const title = input.dataset.title;
            const url = input.value;

            modal.classList.replace("hide-modal", "show-modal");

            modal.querySelector(".modal .modal-header h2").innerText = title;
            modal.querySelector(".modal .modal-body iframe").src = url;
          });
        });

      modal.querySelector(".modal button").addEventListener("click", () => {
        modal.classList.replace("show-modal", "hide-modal");
      });
    })
    .catch((err) => console.error(err));
};
