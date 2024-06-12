const getTodos = (resource) => {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4 && request.status === 404) {
        reject("Error getting resources");
      }
    });

    request.open("GET", resource);
    request.send();
  });
};

getTodos("todos/luigi.json")
  .then((data) => {
    console.log("Promise 1 resolved:", data);
    return getTodos("todos/mario.json");
  })
  .then((data) => {
    console.log("Promise 2 resolved:", data);
    return getTodos("todos/shuans.json");
  })
  .then((data) => {
    console.log("Promise 3 resolved:", data);
  })
  .catch((err) => {
    console.log("promise rejected:", err);
  });
