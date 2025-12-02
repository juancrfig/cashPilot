const URL_API = "https://jsonplaceholder.typicode.com/";

type ApiResponse<T> = T | null;

const getToken = (): string | null => {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
};

const getHeaders = (): Headers => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const token = getToken();
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return headers;
};

export const GetJson = async <T>(categoria: string): Promise<ApiResponse<T>> => {
  try {
    const respuesta = await fetch(`${URL_API}${categoria}`, {
      method: "GET",
      headers: getHeaders(),
      cache: "no-store",
    });

    if (respuesta.ok) {
      return (await respuesta.json()) as T;
    }

    switch (respuesta.status) {
      case 401:
        console.warn("No autorizado (401). Redirigir a login o pedir token.");
        break;
      case 404:
        console.warn(`${categoria} no existe.`);
        break;
      default:
        console.error("Error en la petición:", respuesta.status);
        break;
    }

    return null;
  } catch (error) {
    console.error("Error en GetJson:", (error as Error).message);
    return null;
  }
};

export const PostJson = async <T, R = unknown>(
  datos: T,
  categoria: string
): Promise<ApiResponse<R>> => {
  try {
    const respuesta = await fetch(`${URL_API}${categoria}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(datos),
    });

    return respuesta.ok ? ((await respuesta.json()) as R) : null;
  } catch (error) {
    console.error("Error en la solicitud POST:", (error as Error).message);
    return null;
  }
};

export const PatchJson = async <T, R = unknown>(
  datos: T,
  categoria: string,
  id: number | string
): Promise<ApiResponse<R>> => {
  try {
    const respuesta = await fetch(`${URL_API}${categoria}/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(datos),
    });

    return respuesta.ok ? ((await respuesta.json()) as R) : null;
  } catch (error) {
    console.error("Error en la solicitud PATCH:", (error as Error).message);
    return null;
  }
};

export const DeleteJson = async (
  categoria: string,
  id: number | string
): Promise<boolean> => {
  try {
    const respuesta = await fetch(`${URL_API}${categoria}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    return respuesta.ok;
  } catch (error) {
    console.error("Error en la solicitud DELETE:", (error as Error).message);
    return false;
  }
};
