import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import { API } from "../config";
import Router from "next/router";

export const handleResponse = (response) => {
  // if response is 401, clear localStorage and cookie
  if (response.status === 401) {
    signout(() => {
      Router.push({
        pathname: "/signin",
        query: {
          message: "Your session is expired. Please sign in.",
        },
      });
    });
  } else {
    return;
  }
};

export const preSignup = (user) => {
  return fetch(`${API}/pre-signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  return fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((response) => {
      console.log("signout success");
    })
    .catch((error) => console.log(error));
};

export const setCookie = (key, value) => {
  // with Next.js this runs in both client and server side
  // check that we are in client side
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1, // expires in 1 day
    });
  }
};

export const removeCookie = (key) => {
  // with Next.js this runs in both client and server side
  // check that we are in client side
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key, value) => {
  // with Next.js this runs in both client and server side
  // check that we are in client side
  if (process.browser) {
    return cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

export const authenticate = (data, next) => {
  // cookie considered better option to store token
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

// check if token is in cookie and user in local storage
export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const updateUser = (user, next) => {
  // check if in client side
  if (process.browser) {
    if (localStorage.getItem("user")) {
      let auth = JSON.parse(localStorage.getItem("user"));

      // update user in localStorage
      auth = user;

      localStorage.setItem("user", JSON.stringify(auth));

      // execute callback
      next();
    }
  }
};

export const forgotPassword = (email) => {
  return fetch(`${API}/forgot-password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const resetPassword = (resetInfo) => {
  return fetch(`${API}/reset-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resetInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const loginWithGoogle = (user) => {
  return fetch(`${API}/google-login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
