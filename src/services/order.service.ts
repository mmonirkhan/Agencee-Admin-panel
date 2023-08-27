import httpRequest from "../helpers/http";

export const getAllOrderService = async () => {
    const res = await httpRequest.get({
        path: "/admin/order",
    });
    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.msg);
    }

    return result;
};
