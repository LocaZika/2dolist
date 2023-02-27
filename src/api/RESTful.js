import { url } from "./configs";
import logger from "./consoleLog";

const send = async (method, path, data) => {
  let statusCode = 0;
  try {
    const response = await fetch(`${url}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data === null || data === "" ? null : JSON.stringify(data),
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      statusCode = response.status;
    }
  } catch (error) {
    logger(`${error.message} || Status code: ${statusCode}`, {
      color: "red",
      fontSize: "16px",
      border: ".5px",
    });
  }
};
export const get = async (path) => {
  return send("GET", path);
};
export const post = async (path, data) => {
  return send("POST", path, data);
};
export const remove = async (path, id) => {
  return send("DELETE", `${path}/${id}`);
};
export const update = async (path, id, data) => {
  return send("PATCH", `${path}/${id}`, data);
};
export const filter = async (path, text) => {
  return send("GET", `${path}?=${text}`);
};
export default class RESTful {
  constructor(path, data) {
    this.path = path;
    this.data = data;
  }
  missingPath() {
    logger("You must provide a path", {
      color: "red",
      fontSize: "36px",
      border: "1px",
    });
  }
  get = async (path) => {
    if (path === null) {
      if (this.path === null) {
        this.missingPath();
      } else return send("GET", this.path);
    } else return send("GET", path);
  };
  post = async (path, data) => {
    let resourcePath = "";
    if (path === null) {
      if (this.path === null) {
        this.missingPath();
      } else resourcePath = this.path;
    } else resourcePath = path;
    return send("POST", resourcePath, data);
  };
  update = async (path, id, data) => {
    let resourcePath = "";
    if (path === null) {
      if (this.path === null) {
        this.missingPath();
      } else resourcePath = this.path;
    } else resourcePath = path;
    return send("PATCH", `${resourcePath}/${id}`, data);
  };
  delete = async (path, id) => {
    let resourcePath = "";
    if (path === null) {
      if (this.path === null) {
        this.missingPath();
      } else resourcePath = this.path;
    } else resourcePath = path;
    return send("DELETE", resourcePath, id);
  };
  filter = async (path, text) => {
    let resourcePath = "";
    if (path === null) {
      if (this.path === null) {
        this.missingPath();
      } else resourcePath = this.path;
    } else resourcePath = path;
    return send("GET", `${resourcePath}?=${text}`);
  };
}
