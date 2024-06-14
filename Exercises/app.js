setTimeout(() => {
  console.log("Delayed");
}, 2000);

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
