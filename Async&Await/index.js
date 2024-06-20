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
    resolve("Money money");
  }, 8000);
});

async function getData() {
  let val = await promise1;
  console.log(val);

  let val2 = await promise2;
  console.log(val2);
  console.log(`Hello World`);
}

getData();
