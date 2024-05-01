import axios, { AxiosInstance, AxiosResponse } from "axios";

import { BASEURL } from "@/config";
import { ErrorDesignation, ErrorHandler } from "@/error/ServerError";

const api: AxiosInstance = axios.create({
	baseURL: BASEURL,
});

const refreshapi: AxiosInstance = axios.create({
	baseURL: BASEURL,
});

api.interceptors.request.use(
	config => {
		config.headers["Content-Type"] = "application/json";

		// include cookies
		config.withCredentials = true;

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

refreshapi.interceptors.request.use(config => {
	config.headers["Content-Type"] = "application/json";

	// include cookies
	config.withCredentials = true;

	return config;
});

refreshapi.interceptors.response.use(
	response => {
		const { data, error, type } = response.data;
		if (type === "error") {
			throw ErrorHandler(error, ErrorDesignation.USER);
		}
		return data;
	},
	error => {
		throw ErrorHandler(error.message, ErrorDesignation.NETWORK);
	}
);

type Data = Record<string, any>;

// Define a unified request function
const request = async (
	method: "get" | "post" | "put" | "delete",
	url: string,
	data?: Data
): Promise<Data> => {
	const response: AxiosResponse<Data> = await api[method](url, data);
	return response;
};

export const apiFunctions = {
	get: (url: string) => request("get", url),
	post: (url: string, data: Data) => request("post", url, data),
	put: (url: string, data: Data) => request("put", url, data),
	del: (url: string, data?: Data) => request("delete", url, data),
	refresh: (url: string, data?: Data) => refreshapi.post(url, data),
	refresh_get: (url: string): Promise<Data> => refreshapi.get(url),
	postForm: (url: string, data: Data): Promise<Data> =>
		api.post(url, data, {
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		}),
};
