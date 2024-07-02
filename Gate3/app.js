// Write a JavaScript program that converts  this callback-based function to a promise-based function.
// function fetchData(callback) {
//   setTimeout(() => {
//     const data = "Data fetched successfully!";
//     callback(null, data);
//   }, 1000);
// }

// fetchData((error, data) => {
//   if (error) {
//     console.error("Error:", error);
//   } else {
//     console.log(data);
//   }
// });

// conver fetchData into a promise-based function

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = "Data fetched successfully!";
      resolve(data);
    }, 1000);
  });
}

fetchData()
  .then((respone) => {
    console.log(respone);
  })
  .catch((error) => {
    console.log(error);
  });
