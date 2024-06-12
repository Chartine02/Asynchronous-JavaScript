const getTodos = (resource, callback) => {
  const request = new XMLHttpRequest();

  request.addEventListener("readystatechange", () => {
    //   console.log(request, request.readyState);
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.responseText);
      callback(undefined, data);
    } else if (request.readyState === 4 && request.status === 404) {
      callback("Could not fetch the data", undefined);
    }
  });

  request.open("GET", resource);
  request.send();

  return new Promise(function (resolve, reject) {});
};

getTodos(" todos/luigi.json", (err, data) => {
  console.log(data);
  getTodos(" todos/mario.json", (err, data) => {
    console.log(data);
    getTodos(" todos/shuan.json", (err, data) => {
      console.log(data);
    });
  });
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(data);
  //   }
});
