function fetchApi(url) {
  return new Promise((resolve, reject) => {
    let count = 0;
    let timer = setInterval(() => {
      fetch(url)
        .then((res) => {
          const data = res.json();
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
      count++;
      if (count === 2) {
        clearInterval(timer);
      }
    }, 2000);
  });
}

function getData(url) {
  let count = 0;
  let timer = setInterval(() => {
    fetch(url)
      .then((res) => {
        const data = res.json();
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    count++;
    if (count === 2) {
      clearInterval(timer);
    }
  }, 2000);
}

// getData("https://jsonplaceholder.typicode.com/todos/2");

const url = "https://jsonplaceholder.typicode.com/posts";
const data = {
  title: "foo",
  body: "bar",
  userId: 1,
};

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "My-Custom-User-Agent",
  },
  body: JSON.stringify(data), // Convert the data object to a JSON string
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

// .then((response) => console.log(response))
// .catch((error) => console.log(error));
