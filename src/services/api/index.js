import * as base64 from "base-64";
import { queryParamsURLEncodedString } from "../WebService";
import { basicAuth } from "../APIService";

const basicMethod = {
  jsonrpc: "2.0",
  method: null,
  params: null, // [mywallet, publicAddress, publicKey]
};

const Api = {
  postRequest: (method, parameters, callback, errorCallback = null) => {
    let url = process.env.REACT_APP_WALLET_ADDRESS;
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64.encode(process.env.BASIC_AUTH)}`,
      },
      body: JSON.stringify({
        ...basicMethod,
        method: method,
        params: parameters,
      }),
    };
    fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((json) => {
        callback(json);
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  },
  postRequestAsync: async (method, parameters) => {
    let url = process.env.REACT_APP_JSONRPC_ADDRESS;
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...basicMethod,
        method: method,
        params: parameters,
      }),
    };
    try {
      const response = await fetch(url, fetchOptions);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return { error };
    }
  },
  directPostRequest: (url, parameters, callback, errorCallback = null) => {
    const headers = {
      "Content-Type": parameters?.formData
        ? "multipart/form-data"
        : parameters?.wwwForm
        ? "application/x-www-form-urlencoded"
        : "application/json",
    };

    if (parameters?.basicAuth) {
      headers.Authorization = `Basic ${base64.encode(parameters.basicAuth)}`;
      delete parameters.basicAuth;
    } else if (parameters?.jwt) {
      headers.Authorization = `Bearer ${parameters.jwt}`;
      delete parameters.jwt;
    } else if (false) {
      headers.Authorization = `Bearer preferences.apiJwtToken`;
    }
    if (parameters.headers) {
      Object.assign(headers, parameters.headers);
    }
    const fetchOptions = {
      method: "POST",
      headers,
      body: parameters?.formData
        ? parameters.formData
        : parameters?.wwwForm
        ? queryParamsURLEncodedString(parameters.wwwForm)
        : JSON.stringify(parameters?.rawBody ? parameters.rawBody : parameters),
    };
    fetch(url, fetchOptions)
      .then((response) => response.text())
      .then((text) => {
        try {
          callback(JSON.parse(text));
        } catch (e) {
          errorCallback && errorCallback(text);
        }
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  },
  directPutRequest: (url, parameters, callback, errorCallback = null) => {
    const headers = {
      "Content-Type": parameters?.formData
        ? "multipart/form-data"
        : parameters?.wwwForm
        ? "application/x-www-form-urlencoded"
        : "application/json",
    };

    if (parameters?.basicAuth) {
      headers.Authorization = `Basic ${base64.encode(parameters.basicAuth)}`;
      delete parameters.basicAuth;
    } else if (parameters?.jwt) {
      headers.Authorization = `Bearer ${parameters.jwt}`;
      delete parameters.jwt;
    } else if (false) {
      headers.Authorization = `Bearer preferences.apiJwtToken`;
    }
    if (parameters.headers) {
      Object.assign(headers, parameters.headers);
    }
    const fetchOptions = {
      method: "PUT",
      headers,
      body: parameters?.formData
        ? parameters.formData
        : parameters?.wwwForm
        ? queryParamsURLEncodedString(parameters.wwwForm)
        : JSON.stringify(parameters?.rawBody ? parameters.rawBody : parameters),
    };
    fetch(url, fetchOptions)
      .then((response) => response.text())
      .then((text) => {
        try {
          callback(JSON.parse(text));
        } catch (e) {
          errorCallback && errorCallback(text);
        }
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  },
  standardPostRequest: (route, parameters, callback, errorCallback = null) => {
    let url = process.env.REACT_APP_REST_ADDRESS + route;
    Api.directPostRequest(url, parameters, callback, errorCallback);
  },
  directGetRequest: (url, parameters, callback, errorCallback = null) => {
    const headers = {};

    if (parameters?.basicAuth) {
      headers.Authorization = `Basic ${base64.encode(parameters.basicAuth)}`;
      delete parameters.basicAuth;
    } else if (parameters?.jwt) {
      headers.Authorization = `Bearer ${parameters.jwt}`;
      delete parameters.jwt;
    } else if (false) {
      headers.Authorization = `Bearer preferences.apiJwtToken`;
    } else {
      headers.Authorization = `Basic ${base64.encode(basicAuth)}`;
    }
    const route = url + "?" + queryParamsURLEncodedString(parameters || {});

    const fetchOptions = {
      method: "GET",
      headers,
    };
    fetch(route, fetchOptions)
      .then((response) => response.text())
      .then((text) => {
        try {
          return JSON.parse(text);
        } catch (e) {
          console.log("error", route, e);
          return text;
        }
      })
      .then((json) => {
        callback(json);
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  },
  getRequest: (route, callback, errorCallback = null) => {
    let url = process.env.REACT_APP_REST_ADDRESS + route;
    const fetchOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
    fetch(url, fetchOptions)
      .then((response) => response.text())
      .then((text) => {
        try {
          callback(JSON.parse(text));
        } catch (e) {
          errorCallback && errorCallback(text);
        }
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  },
  paypalCreateOrderRequest: (data, token, callback, errorCallback = null) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", fetchOptions)
      .then((response) => response.json())
      .then((json) => {
        callback(json);
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback(error.message);
        }
      });
  },
};

export default Api;
