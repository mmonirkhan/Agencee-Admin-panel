import { useEffect, useState } from "react";
import { Card, Select, Breadcrumb, Table } from "antd";
import { Link } from "react-router-dom";
import useProductsStore from "../../store/product.store";
import OrderItem from "./OrderItem";

const NewOrder = () => {
    const { products, fetchProducts } = useProductsStore();

    useEffect(() => {
        if (!products.data.length) fetchProducts();
    }, []);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedNewItems, setSelectedNewItems] = useState<object[]>([]);

    type optionsType = {
        value: string;
        label: string;
    };

    const onNewProductSelect = (options: optionsType[]) => {
        console.log({ options });

        const margeArr = [...selectedNewItems, ...options];

        const emptyArr: object[] = [];
        const filterSelectedItem = margeArr.filter((item: any) => {
            const newArr = emptyArr.includes(item.value);
            if (!newArr) {
                emptyArr.push(item.value);
                return true;
            } else {
                return false;
            }
        });

        setSelectedNewItems(filterSelectedItem);
    };
    console.log(selectedNewItems);

    return (
        <section>
            <Breadcrumb
                items={[
                    {
                        title: <Link to={"/"}>Dashboard</Link>,
                    },
                    {
                        title: <Link to={"/"}>Order</Link>,
                    },
                    {
                        title: "New Order",
                    },
                ]}
            />
            <div className="my-4"></div>
            <Card title="Select Product">
                <div className="text-lg mb-1">
                    <label>Product</label>
                </div>
                <Select
                    mode="multiple"
                    placeholder="Search Your Best Products "
                    onChange={setSelectedItems}
                    style={{ width: "90%" }}
                    options={products.data.map((item) => ({
                        value: item._id,
                        label: item.name,
                    }))}
                />
                <div className="my-2">
                    <div className="flex gap-1 my-2">
                        <span>Product Variant</span>
                        <div className="w-[63vw] h-[2px] bg-slate-400 my-3"></div>
                    </div>
                    {selectedItems.map((item) => (
                        <OrderItem
                            key={item}
                            productId={item}
                            change={(options) => onNewProductSelect(options)}
                        />
                    ))}
                </div>
            </Card>
            <Table
                scroll={{ x: 600 }}
                // loading={order.loading}
                // dataSource={products.data}
                rowKey={(item) => `order_${item._id}`}
                columns={[
                    {
                        title: "PRODUCT",
                        render: (_val, rec) => rec.product.name,
                    },
                    {
                        title: "PRICE",
                        render: (_val, rec) => rec.variant.price,
                    },
                    {
                        title: "QUANTITY",
                        render: (_val, rec) => rec.quantity,
                    },
                    {
                        title: "VARIANTS",
                        render: (_val, rec) => rec,
                    },
                    {
                        title: "TOTAL PRICE",
                        render: (_val, rec) => rec.unit_price * rec.quantity,
                    },
                ]}
            />
        </section>
    );
};

export default NewOrder;
