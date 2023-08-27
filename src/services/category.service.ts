import httpRequest from "../helpers/http";

export const getAllCategory = async () => {
    const res = await httpRequest.get({
        path: "/category",
    });
    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.msg);
    }
    return result;
};

export const createCategoryService = async (data: any) => {
    const res = await httpRequest.post({
        path: "/category/create",
        data,
    });
    const result = await res.json();
    return { res, result };
};
