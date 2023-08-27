import httpRequest from "../helpers/http";

export const getAllAttribute = async () => {
    const res = await httpRequest.get({
        path: "/attribute",
    });
    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.msg);
    }
    return result;
};

export const createAttributeService = async (data: { name: string }) => {
    const res = await httpRequest.post({
        path: "/attribute",
        data,
    });
    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.msg);
    }
    return result;
};

export const createAttributeValueService = async (
    data: any,
    attributeId: string
) => {
    const res = await httpRequest.post({
        path: `/attribute/${attributeId}/value`,
        data,
    });
    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.msg);
    }
    return result;
};
