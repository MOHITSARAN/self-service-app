import axios from "axios";

// Call api
const callAPI = (
  name,
  type,
  successCallBackFunc,
  errorCallBackFunc,
  reqBody
) => {
  let url = `/api/v1/${name}`;
  if (get("auth")) {
    axios.interceptors.request.use(function (config) {
      config.headers["x-auth-token"] = get("auth");
      return config;
    });
  }

  switch (type) {
    case "post":
      axios
        .post(url, reqBody)
        .then(data => successCallBackFunc(data))
        .catch(err => {
          errorCallBackFunc(err);
        });
      break;
    case "get":
      axios
        .get(url)
        .then(data => successCallBackFunc(data))
        .catch(err => {
          errorCallBackFunc(err);
        });
      break;
    default:
      console.log("Added default case for removing warning in console");
  }
};

// Get a key from Local Storage
const get = key => {
  return localStorage.getItem(key);
};

// Set Key Value in Local Storage
const set = (key, value) => {
  localStorage.setItem(key, value);
};

// Remove Key from Local Storage
const remove = key => {
  return localStorage.removeItem(key);
};

export { callAPI, get, set, remove };
