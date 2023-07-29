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
      renderEJS(combinedString, {data: data});
    }
  );
}

displayApp();
