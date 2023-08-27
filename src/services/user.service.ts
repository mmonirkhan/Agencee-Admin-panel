import httpRequest from "../helpers/http";

export const getAllUserService = async () => {
    const res = await httpRequest.get({
        path: "/admin/user",
    });
    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.msg);
    }
    return result;
};
