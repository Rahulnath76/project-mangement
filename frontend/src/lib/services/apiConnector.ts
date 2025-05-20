import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:7000/api"
});

export const apiConnector = async <T> (
    method: Method,
    url: string,
    bodyData?: any,
    headers?: Record<string, string>,
    params?: Record<string, any>
): Promise<AxiosResponse<T>> => {
    const config: AxiosRequestConfig = {
        method,
        url,
        data: bodyData || null,
        headers: headers || undefined,
        params: params || undefined,
        withCredentials: true,
    }

    return axiosInstance.request<T>(config);
}