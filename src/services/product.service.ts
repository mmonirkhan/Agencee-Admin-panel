import httpRequest from "../helpers/http";

export const getAllProduct = async () => {
    const res = await httpRequest.get({
        path: "/admin/product",
    });
    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.msg);
    }
    return result;
};

export const createProductService = async (data: any) => {
    const res = await httpRequest.post({
        path: "/admin/product",
        data,
    });
    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.msg);
    }
    return result;
};

export const getProductService = async (productId: string) => {
    const res = await httpRequest.get({
        path: `/admin/product/${productId}`,
    });
    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.msg);
    }
    return result;
};

export const updateProductService = async (productId: string, data: any) => {
    const res = await httpRequest.patch({
        path: `/admin/product/${productId}`,
        data,
    });
    const result = await res.json();
    return { res, result };
};

export const updateProductVariantService = async (
    variantId: string,
    data: any
) => {
    const res = await httpRequest.patch({
        path: `/admin/product/variant/${variantId}`,
        data,
    });
    const result = await res.json();
    return { res, result };
};
