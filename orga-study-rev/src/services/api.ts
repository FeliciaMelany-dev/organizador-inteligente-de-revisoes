const BASE_URL = "http://localhost:3000";

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`Erro ao buscar ${endpoint}`);
    return response.json();
  },

  delete: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`Erro ao deletar ${endpoint}`);
  },

  post: async <T>(endpoint: string, data: T): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`Erro ao criar em ${endpoint}`);

    return response.json();
  },

  patch: async <T>(endpoint: string, data: Partial<T>): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(`Erro ao atualizar ${endpoint}`);

  return response.json();
}

};
