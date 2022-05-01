import axios from "axios";
import LocalStorage from "./local_storage";
import qs from "qs";
export const config = {
  headers: {
    Authorization: JSON.parse(LocalStorage.getUser())?.token
  },
  // baseURL: "http://localhost:2500/api/v1",
  baseURL: "https://api.teams.bookgmt.com/api/v1",
};

const updateHeaders = () => {
  config.headers.Authorization =
  JSON.parse(LocalStorage.getUser())?.token
};

const remote = axios.create(config);

const errorResponse = (data) => {
  return {
    status: data?.status || false,
    message: data?.message || "You might not be connected to  internet.",
    statusCode: data?.statusCode || 404,
    data: data?.data || null,
  };
};

export const requests = {
  post: async (url, data) => {
    updateHeaders();
    return remote
      .post(url, data, config)
      .then((d) => {
        return d;
      })
      .catch((err) => {
        return { data: errorResponse };
      });
  },

  get: async (url, params) => {
    updateHeaders();
    return remote
      .get(url, {
        ...config,
        params,
        paramsSerializer: (param) => {
          return qs.stringify(param);
        },
      })
      .then((d) => {
        return d;
      })
      .catch((err) => {
        return { data: errorResponse };
      });
  },

  patch: async (url, data) => {
    updateHeaders();
    return remote
      .patch(url, data, { ...config })
      .then((d) => {
        return d;
      })
      .catch((err) => {
        return { data: errorResponse };
      });
  },
  delete: async (url, data, params) => {
    updateHeaders();
    if (params) {
      return remote
        .delete(`${url}`, { data: data, ...config, params })
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return { data: errorResponse };
        });
    }
    return remote
      .delete(url, { data: data, ...config })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return { data: errorResponse };
      });
  },

  baseUrl: {
    users: (url) => {
      return "/users".concat(url || "/");
    },
    teams: (url) => {
      return "/teams".concat(url || "/");
    },
    invites: (url) => {
      return "/invites".concat(url || "/");
    },
    teamMem: (url) => {
      return "/team-members".concat(url || "/");
    },
    files: (url) => {
      return "/file".concat(url || "/");
    },
  },
  endpoint: {
    base: "/",
    create: "/create",
    forTeam: "/for-team",
    login: "/login",
    delete: "/delete",
    update: "/update",
    upload: "/upload",
    validate: "/validate",
    accept: "/accept",
    requestPasswordReset: "/request-reset",
    resetPassword: "/reset-password",
  },
};
