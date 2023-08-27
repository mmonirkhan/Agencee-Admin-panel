import { BASE_URL } from "../constants/variables";

const methods = {
    get: "GET",
    post: "POST",
    patch: "PATCH",
    put: "PUT",
};

const httpRequest = {
    get: async ({ path }: { path: string; isAuth?: boolean }) => {
        const headers: any = {};
        headers["Content-Type"] = "application/json";

        return await fetch(`${BASE_URL}${path}`, {
            method: methods.get,
            headers,
        });
    },
    post: async ({
        path,
        data,
    }: {
        path: string;
        isAuth?: boolean;
        data: any;
    }) => {
        const headers: any = {};
        headers["Content-Type"] = "application/json";

        return await fetch(`${BASE_URL}${path}`, {
            method: methods.post,
            headers,
            body: JSON.stringify(data),
        });
    },
    patch: async ({
        path,
        data,
    }: {
        path: string;
        isAuth?: boolean;
        data: any;
    }) => {
        const headers: any = {};
        headers["Content-Type"] = "application/json";

        return await fetch(`${BASE_URL}${path}`, {
            method: methods.patch,
            headers,
            body: JSON.stringify(data),
        });
    },
};

export default httpRequest;
