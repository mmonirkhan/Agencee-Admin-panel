import { Select } from "antd";
import httpRequest from "../../helpers/http";
import { useEffect, useState } from "react";
import { ProductDetails } from "../../models/product.model";
// import { Options } from "use-debounce";
type Props = {
    productId: string;
    change: (
        data2: {
            value: string;
            label: string;
        }[]
    ) => void;
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

    const newProductObjList = (
        _idList: string[],
        options: { value: string; label: string }
    ) => {
        // console.log(idList, options);

        props.change(options);
    };
    useEffect(() => {
        getOrderProductDataList();
    }, []);
    // console.log(orderProduct);

    const newProductItem = orderProduct?.variants.map((item) => ({
        value: item._id,
        label: item.attributes.map(
            (item) => ` ${item.attribute.name}: ${item.value.name}`
        ),
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
                        value: `${item.value}`,
                        label: `${item.label}`,
                    }))}
                />
            </div>
        </section>
    );
};
export default OrderItem;
