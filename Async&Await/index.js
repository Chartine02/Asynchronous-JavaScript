//Async

// async function getData() {
//   return promise;
// }

// const promiseData = getData();

// promiseData.then((res) => console.log(res));

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Money talk");
  }, 5000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Money talk");
  }, 5000);
});

async function getData() {
  console.log(`Hello World`);
  let val = await promise1;
  console.log(val);

  let val2 = await promise1;
  console.log(val);
}

getData();
