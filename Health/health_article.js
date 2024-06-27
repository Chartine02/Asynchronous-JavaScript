// function getHealthArticle(url) {
//   let request = new XMLHttpRequest();

//   request.addEventListener("readystatechange", () => {
//     if (request.readyState === 4 && request.status === 200) {
//       const data = JSON.parse(request.responseText);
//       console.log(data);
//     }
//   });
//   request.open("GET", url);
//   request.send();
// }
// getHealthArticle("./health_article.json");

function getHealthArticle() {
  let request = new XMLHttpRequest();
  const url = "./health_article.json";
  request.responseType = "json";
  request.open("GET", url);
  request.send();

  request.onload = function () {
    const articles = request.response.articles;
    console.log(articles);
    const articlesDiv = document.getElementById("articles");

    articles.forEach(function (article) {
      const articleDiv = document.createElement("div");
      articleDiv.classList.add("article");

      const title = document.createElement("h2");
      title.textContent = article.title;

      const description = document.createElement("p");
      description.textContent = article.description;

      const waysHeader = document.createElement("h3");
      waysHeader.textContent = "Ways to Achieve:";

      const waysList = document.createElement("ul");
      article.ways_to_achieve.forEach(function (way) {
        const listItem = document.createElement("li");
        listItem.textContent = way;
        waysList.appendChild(listItem);
      });

      const benefitsHeader = document.createElement("h3");
      benefitsHeader.textContent = "Benefits:";

      const benefitsList = document.createElement("ul");
      article.benefits.forEach(function (benefit) {
        const listItem = document.createElement("li");
        listItem.textContent = benefit;
        benefitsList.appendChild(listItem);
      });

      articleDiv.appendChild(title);
      articleDiv.appendChild(description);
      articleDiv.appendChild(waysHeader);
      articleDiv.appendChild(waysList);
      articleDiv.appendChild(benefitsHeader);
      articleDiv.appendChild(benefitsList);

      articlesDiv.appendChild(articleDiv);
    });
  };
}

getHealthArticle();
