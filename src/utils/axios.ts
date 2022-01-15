import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

const TIMEOUT = 10000;
const BASE_URL = 'localhost/api';

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: TIMEOUT,
};

// const requestInterceptorSuccess = async (req: AxiosRequestConfig) => {
//   // const token = await asyncStorageGet(StorageKeys.AccessToken);
//   // req.headers.authorization = `Bearer ${token}`;
//   return req;
// };

const requestInterceptorError = (error: AxiosError) => Promise.reject(error);

const responseInterceptorSuccess = async (res: AxiosResponse) => res;

const responseInterceptorError = (error: AxiosError) => {
  switch (error.response?.status) {
    case 401: {
      console.log('Logout');
      return Promise.reject(error);
    }
    default:
      return Promise.reject(error);
  }
};

const instance = axios.create(config);
instance.interceptors.request.use(async (req) => req, requestInterceptorError);
instance.interceptors.response.use(
  responseInterceptorSuccess,
  responseInterceptorError,
);

export const get = async <T = unknown, R = AxiosResponse<T>>(
  url: string,
  requestConfig?: AxiosRequestConfig,
): Promise<AxiosResponse | R | null> => {
  let response: AxiosResponse | R | PromiseLike<R> | null = null;
  const source = axios.CancelToken.source();

  setTimeout(() => {
    if (response === null) {
      source.cancel('Connection timeout');
    }
  }, requestConfig?.timeout || TIMEOUT);

  return await axios
    .get(url, {
      ...requestConfig,
      cancelToken: source.token,
    })
    .then((r) => {
      response = r;
      return r;
    });
};

export const post = async <T = unknown, R = AxiosResponse<T>>(
  url: string,
  data?: unknown,
  requestConfig?: AxiosRequestConfig,
): Promise<AxiosResponse | R | null> => {
  let response: AxiosResponse | R | PromiseLike<R> | null = null;
  const source = axios.CancelToken.source();

  setTimeout(() => {
    if (response === null) {
      source.cancel('Connection timeout');
    }
  }, requestConfig?.timeout || TIMEOUT);

  return await axios
    .post(url, data, {
      ...requestConfig,
      cancelToken: source.token,
    })
    .then((r) => {
      response = r;
      return r;
    });
};

export default instance;
