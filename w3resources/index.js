// Practical.
// 1. Create a function called createAlarm that generates a wake-up message for a person after a specified time delay. This function should accept two parameters: the person's name and the delay time in seconds.The function should return a promise that resolves with the wake-up message (e.g.Wake up person) but if the delay is less than 2 seconds,the promise should be immediately rejected with an error message stating Delay is not sufficient

function createAlarm(name, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 2) {
      reject("Delay is insufficient");
    }
    setTimeout(() => {
      resolve(`Wake up ${name}`);
    }, delay);
  });
}

createAlarm("John", 4)
  .then((message) => {
    console.log(message); // output "Wake up John" after 4 seconds
  })
  .catch((error) => {
    console.error(error);
  });

createAlarm("John", 1)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error); // output "Delay is not sufficient"
  });

// 2. Write a JavaScript function that fetches data from multiple APIs concurrently and returns a combined result using Promises

function getMultiple(urls) {
  return new Promise((resolve, reject) => {
    urls.map((url) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch data`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
}

async function getMultipleApi(urls) {
  let response = urls.map((url) => {
    fetch(url).then((res) => {
      return res;
    });
  });
  let fetchData = Promise.all(response);
  let data = await Promise.all(fetchData.map((res) => res.json()));
}

const apiUrls = [
  "https://jsonplaceholder.typicode.com/posts/4",
  "https://jsonplaceholder.typicode.com/posts/5",
  "https://jsonplaceholder.typicode.com/posts/6",
];

fetchMultipleAPIs(apiUrls)
  .then((results) => {
    console.log("Combined Results:", results);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

// 3.Write a javascript function that changes the background color of the body (HTML tag) every 3 seconds.

function changeBg() {
  setInterval(
    () =>
      (document.body.style.backgroundColor = `#${Math.floor(
        Math.random() * 16777215
      ).toString(16)}`),
    3000
  );
}

// 4. Create a function called myFetch that should work as a simple version of the native fetch() API. The function myFetch should use the XMLHttpRequest to make a GET Request and return a promise that resolves with the request’s response and rejects with an error if any.function myFetch(){ //... your code here
// }
// myFetch('https://my-random-api.com/data')
// .then(data => console.log(data))
// .catch(error => console.log('Error:', error));Bonus points (optional)
// Make your fetch function perform other request methods like POST or receive request options.

function myFetch(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4 && request.status === 200) {
        reject("Gato");
      }
    });
    request.open("GET", url);
    request.send();
  });
}

myFetch("https://my-random-api.com/data")
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
