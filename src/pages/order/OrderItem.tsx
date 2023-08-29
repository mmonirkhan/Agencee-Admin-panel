import { Select } from "antd";
import httpRequest from "../../helpers/http";
import { useEffect, useState } from "react";
import { ProductDetails } from "../../models/product.model";
// import { Options } from "use-debounce";
type Props = {
    productId: string;
    change: (data2: object) => void;
};

const OrderItem = (props: Props) => {
    const [orderProduct, setOrderProductData] = useState<ProductDetails>();
    const getOrderProductDataList = async () => {
        const res = await httpRequest.get({
            path: `/admin/product/${props.productId}`,
        });

        // setLoading(false);
        const orderProductApiData = await res.json();

        setOrderProductData(orderProductApiData.data);
    };
    // const newProductObjList = (
    //     _idList: string[],
    //     options: {
    //         value: string;
    //         label: string;
    //         price: number;
    //     }[]
    // ) => {
    //     const updateOrderProductTable = {
    //         _id: orderProduct?._id,
    //         name: orderProduct?.name,
    //         price: `${options.map((item) => item.price)}`,
    //         value: `${options.map((item) => item.value)}`,
    //         label: `${options.map((item) => item.label)}`,
    //         // variant:
    //         //     [...options,]
    //         // ,
    //     };
    //     // console.log({ updateOrderProductTable });

    //     props.change(updateOrderProductTable);
    // };

    const newProductObjList = (_idList: string[], options: object) => {
        const updateOrderProductTable = {
            _id: orderProduct?._id,
            name: orderProduct?.name,
            variant: {
                ...options,
            },
        };

        props.change(updateOrderProductTable);
    };
    useEffect(() => {
        getOrderProductDataList();
    }, []);

    const newProductItem = orderProduct?.variants.map((item) => ({
        value: item._id,
        label: item.attributes.map(
            (item) => ` ${item.attribute.name}: ${item.value.name}`
        ),
        price: item.price,
    }));

    return (
        <section>
            <div>Product Name: {orderProduct ? orderProduct.name : ""}</div>

            <div className="my-2">
                <Select
                    mode="multiple"
                    placeholder="Search Your Best Products "
                    style={{ width: "50%" }}
                    onChange={newProductObjList}
                    options={newProductItem?.map((item) => ({
                        ...item,
                        qt: 1,
                    }))}
                />
            </div>
        </section>
    );
};
export default OrderItem;
