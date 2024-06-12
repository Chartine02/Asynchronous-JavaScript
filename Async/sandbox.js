const getTodos = async () => {
  const response = await fetch("todos/luigis.json").then();
  if (response.status !== 200) {
    throw new Error("can not fetch the data");
  }
  const data = await response.json();

  return data;
};
getTodos()
  .then((data) => console.log("resolved", data))
  .catch((err) => console.log("rejected:", err.message));

// fetch("todos/luigi.json")
//   .then((response) => {
//     console.log("resolved", response);
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("rejected", err);
//   });
