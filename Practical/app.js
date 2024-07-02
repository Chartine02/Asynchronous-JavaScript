//1. Task: Create a function fetchWithTimeout that fetches data from https://jsonplaceholder.typicode.com/posts but times out if the request takes more than 5 seconds. Implement error handling to manage the timeout and network errors.

//2.**Scenario:**
// You need to fetch data from two different APIs concurrently. The first API provides user data, and the second API provides the user's posts. If either request fails or takes more than 5 seconds, you should handle the error gracefully and return a meaningful error message. Write an `async` function `fetchUserData` that accomplishes this.

// **APIs:**

// 1. User data: `https://jsonplaceholder.typicode.com/users/1`
// 2. User posts: `https://jsonplaceholder.typicode.com/posts?userId=1`

async function fetchUserData() {
  try {
    const controller = new AbortController();
    const { signal } = controller;

    const timer = setTimeout(() => {
      controller.abort();
    }, 5000);

    const promise1 = fetch("https://jsonplaceholder.typicode.com/users/1", {
      signal,
    });
    const promise2 = fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=1",
      { signal }
    );
    const data = await Promise.all([promise1, promise2]);
    const responses = data.map((el) => {
      clearTimeout(timer);
      if (!el.ok) {
        throw new Error(`Failed to fetch data`);
      } else {
        return el.json();
      }
    });
    const response = await Promise.all(responses);
    console.log(response);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log(`Fetching timed out`);
    } else {
      console.log(error);
    }
  }
}

// fetchUserData();

//  2. Write a function fetchWithRetry that attempts to fetch data from a given URL. If the fetch fails, it should retry up to 3 times with an exponential backoff (i.e., wait 1s before the first retry, 2s before the second retry, 4s before the third retry). If all attempts fail, it should throw an error.

async function fetchwithRetry(url, maxRetries) {
  let count = 0;

  async function fetchAttempt() {
    try {
      const data = await fetch(url);
      if (!data.ok) {
        throw new Error(`Fetch failed`);
      }
      const response = await data.json();

      console.log(response);
      return;
    } catch (error) {
      count++;
      if (count <= maxRetries) {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(`Retrying the fetch ${count} / ${maxRetries}`);
            fetchAttempt();
          }, count * 1000);
        });
      } else {
        console.log(error.message);
      }
    }
  }
  fetchAttempt();
}

// fetchwithRetry("https://jsonplaceholder.typicode.com/user", 3);

// 3.You need to implement a task queue that processes asynchronous tasks with a maximum concurrency of 3. Write a function taskQueue that accepts an array of tasks (functions returning Promises) and processes them with the specified concurrency.
//

//Fetch without delay
async function fetchWithoutDelay(url, maxRetries) {
  let count = 0;
  async function fetchAttempt() {
    try {
      const controller = new AbortController();
      const { signal } = controller;

      const timer = setTimeout(() => {
        controller.abort();
      }, 200);

      const data = await fetch(url, {
        signal,
      });
      clearTimeout(timer);

      if (!data.ok) {
        throw new Error(`Failed to fetch data`);
      }
      const response = await data.json();
      console.log(response);
    } catch (error) {
      count++;
      if (count <= maxRetries) {
        if (error.name === "AbortError") {
          console.log(`Fetching timed out, Retrying...`);
          return fetchAttempt();
        } else {
          console.log(`Error on attempt ${count}: ${error.message}`);
          return fetchAttempt();
        }
      } else {
        console.log(error);
      }
    }
  }
  return fetchAttempt();
}

// fetchWithoutDelay("https://jsonplaceholder.typicode.com/users/1", 3);

// Write a function fetchWithAuth that makes a POST request to a given URL with custom headers, including an authentication token. The function should also handle JSON responses and errors.

async function fetchWithAuth(url, data, token) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error();
    }

    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

const url = "https://jsonplaceholder.typicode.com/users";
const data = { name: `Cutecat`, Age: 12, Passcode: `Mind your bss` };
const token = "your-auth";

// fetchWithAuth(url, data, token);

// Write a function fetchAllData that fetches data from multiple URLs concurrently using Promise.allSettled. The function should handle cases where some requests fail, and it should return the results of successful requests along with the errors of failed requests.

async function fetchAllData(urls) {
  const response = urls.map((url) => {
    fetch(url)
      .then((data) => {
        data.json();
      })
      .catch((err) => {
        `Error: ${err.message}`;
      });
  });

  const info = await Promise.allSettled(response);

  return info.map((result) =>
    result.status === "fulfilled"
      ? console.log(result.value)
      : console.log(result.reason)
  );
  console.log(data);
}

const urlss = [
  "https://jsonplaceholder.typicode.com/users/1",
  "https://jsonplaceholder.typicode.com/posts?userId=1",
  "https://jsonplaceholder.typicode.com/invalid-url",
];

// fetchAllData(urls);

async function fetchAllData(urls) {
  const fetchPromises = urls.map((url) =>
    fetch(url)
      .then((res) => res.json())
      .catch((err) => ({ error: err.message }))
  );

  const results = await Promise.allSettled(fetchPromises);

  return results.map((result) =>
    result.status === "fulfilled"
      ? console.log(result.value)
      : console.log(result)
  );
}

// Usage:
const urls = [
  "https://jsonplaceholder.typicode.com/users/1",
  "https://jsonplaceholder.typicode.com/posts?userId=1",
  "https://jsonplaceholder.typicode.com/invalid-url",
];

// fetchAllData(urls);
// .then((results) => console.log(results))
// .catch((error) => console.error(error));

async function fetchVehicles() {
  try {
    const response = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllManufacturers?format=json&page=2"
    );
    const data = await response.json();

    const brands = data.Results;
    for (let brand of brands) {
      if (brand.Country === "UNITED STATES (USA)") {
        console.log(brand);
      }
    }
  } catch (error) {}
}

// fetchVehicles();

async function getFastPosts() {
  try {
    const promise1 = fetch("https://dummyjson.com/posts");
    const promise2 = fetch("https://this-may-not-exist.com/posts");
    const promise3 = fetch("https://jsonplaceholder.typicode.com/posts");

    const response = await Promise.any([promise1, promise2, promise3]);

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getFastPosts();
