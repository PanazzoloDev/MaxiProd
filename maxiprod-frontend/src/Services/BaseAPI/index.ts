import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import type { responseType } from "../../Commons/types";

export const API = axios.create({
  baseURL: 'https://localhost:7058/api'
});


// Controlador geral, semelhante a um middleware para avaliar 
// problemas na requisições, filtrar e/ou notificar de forma simples
export const handleRequest = (response?: AxiosResponse | Error, method: '' | 'post' | 'put' | 'delete' = ''): Promise<responseType | Error> => {
  return new Promise<responseType | Error>((resolve) => {

    // Verifica se ocorreu um erro na requisição
    if (response instanceof Error) {
      const errorMessage = response ? response.message || 'Erro na requisição.' : 'Erro na requisição.';
      toast.error(errorMessage)
      resolve(response);
      return;
    }

    // Verifica se houve um erro na resposta da requisição (incluindo erro 404)
    if (!response || response.status === undefined || ![200, 201].includes(response.status)) {
      const errorMessage = response ? response.statusText || 'Erro na requisição.' : 'Erro na requisição.';
      toast.error(errorMessage)
      resolve(new Error(errorMessage));
      return;
    }

    // Verifica se houve um erro na resposta da requisição
    if (!response || ![200, 201].includes(response.status)) {
      const errorMessage = response ? response.data.message || 'Erro na requisição.' : 'Erro na requisição.';
      toast.error(errorMessage)
      resolve(new Error(errorMessage));
      return;
    }

    if (['put', 'delete'].includes(method) || method == 'post' && response.status == 201) {
      const messageDictionary = { post: 'criado', put: 'atualizado', delete: 'excluído' }
      if (method !== '')
        toast.success(`Registro ${messageDictionary[method]} com sucesso`);
    }

    resolve({
      data: response.data,
      statusCode: response.status,
      messages: response.statusText
    });
  });
};

export const Authenticate = async (username: string, password: string): Promise<responseType | Error> => {
  return API
    .post(`/login?code=${username}&password=${password}`)
    .then((response: AxiosResponse) => handleRequest(response))
    .catch((error: Error) => handleRequest(error));
}

export const Post = async (url: string, data?: object, config?: AxiosRequestConfig): Promise<responseType | Error> => {
  return API
    .post(url, data, config)
    .then((response: AxiosResponse) => handleRequest(response, 'post'))
    .catch((error: Error) => handleRequest(error));
};

export const Put = async (url: string, data?: object, config?: AxiosRequestConfig): Promise<responseType | Error> => {
  return API
    .put(url, data, config)
    .then((response: AxiosResponse) => handleRequest(response, 'put'))
    .catch((error: Error) => handleRequest(error));
};

export const Get = async (url: string, config?: AxiosRequestConfig): Promise<responseType | Error> => {
  return API
    .get(url, config)
    .then((response: AxiosResponse) => handleRequest(response))
    .catch((error: Error) => handleRequest(error));
}

export const Delete = async (url: string, config?: AxiosRequestConfig): Promise<responseType | Error> => {
  return API
    .delete(url, config)
    .then((response: AxiosResponse) => handleRequest(response, 'delete'))
    .catch((error: Error) => handleRequest(error));
}
