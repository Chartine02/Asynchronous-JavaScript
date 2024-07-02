//   You have a user registration form on your website, and you need to send the form data to an API endpoint to register a new user. The API endpoint is https://jsonplaceholder.typicode.com/posts, and it expects the following data in JSON format:

// username: The username of the new user.
// email: The email address of the new user.
// password: The password for the new user.

// async function postData(url) {
//   try {
//     let response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: "Chartine",
//         email: "noe@gmail.com",
//         password: "cutecat",
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error posting data`);
//     }
//     console.log(response);
//     response = await response.json();
//     console.log(response);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

function postData(url) {
  try {
    const request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    data = JSON.stringify({
      username: "Chartine",
      email: "noe@gmail.com",
      password: "cutecat",
    });
    request.send(data);

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        const response = JSON.parse(request.responseText);
        console.log(request.status);
        console.log(response);
      }
    };
  } catch (error) {
    console.log(error);
  }
}

postData("https://jsonplaceholder.typicode.com/posts");
