// 1
setTimeout(() => {
  console.log("Delayed");
}, 2000);

// 2
function make_Get_Request(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((data) => {
        if (!data.ok) {
          throw new Error(`HTTP error! Status: ${data.status}`);
        }
        return data.json();
      })
      .then((data) => resolve(data))
      .catch((data) => reject(data));
  });
}

// 4.  Write a JavaScript function that takes an array of URLs and downloads the contents of each URL in parallel using Promises.

function getData(urls) {
  return new Promise((resolve, reject) => {
    urls.map((url) => {
      fetch(url)
        .then((data) => {
          if (!data.ok) {
            throw new Error(`HTTP Error! Status : ${data.status} `);
          }
          return data.text;
        })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  });
}

// usage

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
];

getData(urls)
  .then((content) => {
    console.log(`Downloaded content: ${content}`);
  })
  .catch((error) => {
    console.log(`Error : ${error.message}`);
  });

// 5. Write a JavaScript program that implements a function that performs a series of asynchronous operations in sequence using Promises and 'async/await'

function asynOperation1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Deal 1 done`);
      resolve();
    }, 1000);
  });
}

function asynOperation2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Deal 2 done`);
      resolve();
    }, 2000);
  });
}
function asynOperation3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Deal 3 done`);
      resolve();
    }, 1500);
  });
}

async function operations() {
  try {
    await asynOperation1();
    await asynOperation2();
    await asynOperation3();
    console.log("All operations complete");
  } catch (error) {
    console.log(error);
  }
}
