// let counter = 0;

// let timer = setInterval(function () {
//   console.log("I am an asynchronous message");

//   counter += 1;

//   if (counter >= 5) {
//     clearInterval(timer);
//   }
// }, 1000);

// console.log("I am a synchronous message");

function job3(callback1, callback2) {
  setTimeout(() => {
    callback1();
  }, 2000);

  let count = 0;
  let callTwo = setInterval(() => {
    callback2();
    count += 1;

    if (count >= 3) {
      clearInterval(callTwo);
    }
  }, 1000);
}
function callback1() {
  console.log("Callback 1 executed after 2 seconds.");
}

function callback2() {
  console.log("Callback 2 executed every second.");
}

// job3(callback1, callback2);

function job8() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("hello world");
    }, 2000);
  });
}

function job9(data) {
  return new Promise(function (resolve, reject) {
    if (isNaN(data)) {
      reject("error");
    }
    setTimeout(() => {
      if (data % 2 !== 0) {
        resolve("odd");
      }
    }, 1000);
    setTimeout(() => {
      if (data % 2 === 0) {
        resolve("even");
      }
    }, 2000);
  });
}

job9("cash")
  .then((response) => {
    console.log(response);
  })
  .catch((response) => {
    console.log(response);
  });
