import { useEffect, useState } from "react";
import { Card, Select, Breadcrumb, Table, InputNumber, Button } from "antd";
import { Link } from "react-router-dom";
import useProductsStore from "../../store/product.store";
import OrderItem from "./OrderItem";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

// type variant = {
// _id: string;
// name: string;
//     price: number;
//     value: string;
//     label: string;
// };
const NewOrder = () => {
    const { products, fetchProducts } = useProductsStore();

    useEffect(() => {
        if (!products.data.length) fetchProducts();
    }, []);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedNewItems, setSelectedNewItems] = useState<object[]>([]);
    const [newTableData, setNewTableData] = useState<object[]>([]);
    const [count, setCount] = useState(1);

    function changeWeight(e) {
        console.log(e);
    }
    const onNewProductSelect = (options: object) => {
        let matched = false;
        const newARR = selectedNewItems.length
            ? selectedNewItems.map((e) => {
                  // console.log(e);
                  //@ts-ignore
                  if (e._id == options._id) {
                      matched = true;
                      return options;
                  }
                  return e;
              })
            : [];

        if (!matched) {
            newARR.push(options);
        }

        setSelectedNewItems(newARR);
    };

    useEffect(() => {
        let tableDataMapObj: object[] = [];
        selectedNewItems?.map((e: any) => {
            // @ts-ignore
            Object.values(e?.variant)?.map((item: any) => {
                const data = {
                    ...e,
                    variant: undefined,
                    variantId: item.value,
                    variantUnitePrice: item.price,
                    variantTitle: item.label.join(" "),
                    variantQuantity: item.qt,
                    totalPrice: Number(item.price) * Number(item.qt),
                };
                tableDataMapObj.push(data);
            });
        });

        //@ts-ignore
        setNewTableData(tableDataMapObj);
    }, [selectedNewItems]);

    // useEffect(() => {
    //     const tableDataMapObj = selectedNewItems?.map((e) => {
    //         return {
    //             ...e,
    //             // @ts-ignore
    //             price: Object.values(e.variant).map((item) => item.price),
    //             // @ts-ignore
    //             value: Object.values(e.variant).map((item) => item.value),
    //             // @ts-ignore
    //             label: Object.values(e.variant).map((item) => item.label),
    //         };
    //     });
    //     setNewTableData(tableDataMapObj);
    // }, [selectedNewItems]);
    // const value = newTableData.map(
    //     // @ts-ignore
    //     (item) => Number(item.price) * Number(item.qt)
    // );
    // console.log(value);

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
                dataSource={newTableData}
                rowKey={(_item, index) => `row-key-${index}`}
                columns={[
                    {
                        title: "Name",
                        dataIndex: "name",
                    },
                    {
                        title: "PRICE",

                        dataIndex: "variantUnitePrice",
                    },
                    {
                        title: "QUANTITY",
                        render: (_val, rec) => {
                            return (
                                <>
                                    <Button
                                        onClick={() => setCount(count - 1)}
                                        icon={<MinusCircleOutlined />}
                                    />

                                    <InputNumber
                                        min={1}
                                        max={10}
                                        value={count}
                                        onChange={(e) =>
                                            // @ts-ignore
                                            console.log(e)
                                        }
                                        style={{ width: 50 }}
                                    />
                                    <Button
                                        onClick={() => setCount(count + 1)}
                                        icon={<PlusCircleOutlined />}
                                    />
                                </>
                            );
                        },
                    },
                    {
                        title: "VARIANTS",
                        dataIndex: "variantTitle",
                    },
                    {
                        title: "TOTAL PRICE",

                        dataIndex: "totalPrice",
                    },
                ]}
            />
        </section>
    );
};

export default NewOrder;
