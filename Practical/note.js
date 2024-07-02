function fetchData(url) {
  const controller = new AbortController();
  const { signal } = controller;

  let counter = setTimeout(() => {
    controller.abort();
  }, 10000);

  return fetch(url, { signal })
    .then((response) => {
      clearTimeout(counter);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        throw new Error(`Timed out `);
      } else {
        throw error;
      }
    });
}

fetchData("https://jsonplaceholder.typicode.com/todos")
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

function fetchData(url) {
  const controller = new AbortController();
  const { signal } = controller;

  let counter = setTimeout(() => {
    controller.abort();
  }, 1000);

  return fetch(url, { signal })
    .then((response) => {
      clearTimeout(counter);
      console.log(response.json());
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        console.error(`Timed out `);
      } else {
        console.error("Another reason ntazi");
      }
    });
}

// fetchData("https://jsonpl.aceholder.typicode.com/todos")

// 2. Write a javascript function that displays a number every two seconds and stops displaying after 5 seconds

function display(n) {
  let timer = setInterval(() => {
    console.log(n);
  }, 2000);
  setTimeout(() => {
    clearInterval(timer);
    console.log(`Timed out`);
  }, 5000);
}

// display("2");

// 3.Write a JavaScript function that fetches data from an API and retries the request a specified number of times if it fails.

function getInfo(url, maxRetries) {
  return new Promise((resolve, reject) => {
    let retries = 0;
    const fetchData = () => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching data ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          retries++;
          if (retries < maxRetries) {
            console.log(`Failed, Retrying (${retries}/${maxRetries})... `);
            fetchData();
          } else {
            reject(
              new Error(
                `Failed after ${maxRetries} retries. Error: ${error.message}`
              )
            );
          }
        });
    };
    fetchData();
  });
}
//4. Write a JavaScript function fetchToDo that uses XMLHttpRequest to fetch data from the given URL (https://jsonplaceholder.typicode.com/todos/1). The function should handle both successful responses and errors (such as network issues or invalid URLs). Upon receiving a successful response, it should log the fetched data to the console. If there's an error, it should catch the error and log an appropriate message.

function fetchToDo(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4 && request.status === 400) {
        reject(`Error fetching data`);
      }
    });

    request.open("GET", url);
    request.send();
  });
}

fetchToDo("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => console.log(response))
  .catch((error) => console.log(error));

// 5. Extend the fetchToDo function from Question 4 to include custom headers in the request. Specifically, you need to add a User-Agent header with a custom value and a Content-Type header set to application/json. Additionally, modify the function to send a JSON payload in the request body. After sending the request, the function should parse the JSON response and log the parsed object to the console.

function fetchToDo(url, payload) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4) {
        if (request.status > 200 && request.status < 300) {
          try {
            const data = JSON.parse(request.responseText);
            resolve(data);
          } catch (error) {
            reject(`Failed to parse JSON response`);
          }
        }
      } else {
        reject(`Error fetching data`);
      }
    });

    request.open("POST", url);

    request.setRequestHeader("User-Agent", "CustomUserAgent/1.0");
    request.setRequestHeader("Content-Type", "application/json");

    request.send(JSON.stringify(payload));
  });
}

fetchToDo("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => console.log(response))
  .catch((error) => console.log(error));

//6. You are building a web application that fetches data from multiple APIs to display information about different countries. You need to fetch the country details from one API and the weather information for the capital city from another API.

function countryInfo(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch data`);
        }
        data = res.json();
        // console.log(typeof data);
        resolve(data);
      })
      .then((data) => {
        return data.capital;
      })
      .catch((err) => {
        reject("Failing to get data");
      });
  });
}

function weatherInfo(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch data`);
        }
        data = res.json();
        resolve(data);
      })
      .then((data) => {})
      .catch((err) => {
        reject("Failing to get data");
      });
  });
}
const countryName = `Rwanda`;

countryInfo(`https://restcountries.com/v3.1/name/${countryName}`)
  .then((response) => {
    // console.log(response[0].latlng);
    const lat = response[0].latlng[0];
    const lng = response[0].latlng[1];
    console.log(`Country: ${countryName}`);
    console.log(`Capital: ${response[0].capital}`);
    weatherInfo(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    )
      .then((response) =>
        console.log("Temperature:", response.current_weather.temperature)
      )
      .catch((error) => console.log(error));
  })
  .catch((error) => console.log(error));

// 7. 1. Create a function called `fetchUserTodos` that uses the `Promise.all()` method to fetch users and todos concurrently from the provided API endpoints and combine them based on the `userId`. The function should return a promise that resolves with the combined data.
// - Users endpoints [`https://jsonplaceholder.typicode.com/users`](https://jsonplaceholder.typicode.com/users)
// - Todos endpoints [`https://jsonplaceholder.typicode.com/todos`](https://jsonplaceholder.typicode.com/todos) The returned promise should resolve into an array of users, where each user object has a new key `todos`. This key should contain an array of todos that belong to the user, determined by matching the `userId` of the todo with the `id` of the user

async function fetchUserTodos(url1, url2) {
  try {
    const usersResponse = fetch(url1);
    const todoResponse = fetch(url2);
    const responses = await Promise.all([usersResponse, todoResponse]);

    const dataPromises = responses.map((response) => response.json());

    const data = await Promise.all(dataPromises);

    const users = data[0];
    const todos = data[1];

    users.map((user) => {
      todos.map((todo) => {
        if ("todo" in user && user.id === todo.userId) {
          user.todo.push(todo);
        } else if (user.id === todo.userId) {
          user.todo = [todo];
          console.log(user);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

const url1 = `https://jsonplaceholder.typicode.com/users`;
const url2 = `https://jsonplaceholder.typicode.com/todos`;

fetchUserTodos(url1, url2);

// You are building a web application that fetches data from multiple APIs to display information about different countries. You need to fetch the country details from one API and the weather information for the capital city from another API.

// **Here are the requirements:**

// - Use the fetch API to get the country details from [https://restcountries.com/v3.1/name/{countryName}](https://restcountries.com/v3.1/name/%7BcountryName%7D).
// Use the fetch API to get the weather details from https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true.
// Display the results in the console as follows:

// Country: France
// Capital: Paris
// Current Temperature: 18°C

async function getTemperature(country) {
  // fetch the countries information
  // fetch the weather info
  try {
    const countryName = country;
    let capital;
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await response.json();
    console.log(data[0].latlng);
    capital = data[0].capital;
    const lat = data[0].latlng[0];
    const lng = data[0].latlng[1];
    // console.log(lng);
    const weather = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    );

    const info = await weather.json();
    // console.log(info.current_weather.temperature);
    const temperature = info.current_weather.temperature;

    console.log(`
        Country : ${country} 
        Capital: ${capital}
        Temperature: ${temperature}`);
  } catch (error) {
    console.log(error);
  }
}

getTemperature("France");
