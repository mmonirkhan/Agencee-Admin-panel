import { Card, Breadcrumb, Divider } from "antd";
import httpRequest from "../../helpers/http";

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Table, Image, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SelectCommonPlacement } from "antd/es/_util/motion";
import { Order, OrderProduct } from "../../models/order.model";

const columns: ColumnsType<OrderProduct> = [
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
    // {
    //     title: "VARIANTS",
    //     render: (_val, rec) => rec,
    // },
    {
        title: "TOTAL PRICE",
        render: (_val, rec) => rec.unit_price * rec.quantity,
    },
];

const OrderDetailsPage = () => {
    const [orderData, setOrderData] = useState<Order>();
    const params = useParams();
    const { orderId } = params;

    // const [loading, setLoading] = useState(true);

    const [placement] = useState<SelectCommonPlacement>("topLeft");

    const getOrderDataList = async () => {
        const res = await httpRequest.get({
            path: `/admin/order/${orderId}`,
        });

        // setLoading(false);
        const orderApiData = await res.json();

        setOrderData(orderApiData.data);
    };

    useEffect(() => {
        getOrderDataList();
    }, []);

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
                        title: "OrderDetails",
                    },
                ]}
            />

            <div className="grid md:grid-cols-3 gap-4 mt-3">
                <div className=" grid md:col-span-2">
                    <Card>
                        <Table
                            columns={columns}
                            dataSource={orderData ? orderData.products : []}
                            size="middle"
                            pagination={false}
                        />
                    </Card>
                    <div>
                        <div className="grid md:grid-cols-2 gap-4 my-4">
                            <Card title="Shipping">
                                <div className="flex justify-around my-2">
                                    <div>
                                        <p className="text-base font-bold">
                                            Fedex
                                        </p>
                                        <p className="text-base opacity-50 my-2">
                                            Delivery in 1 ~ 3 days
                                        </p>
                                    </div>
                                    <p className="text-lg opacity-75 pt-4">
                                        $1500
                                    </p>
                                </div>
                            </Card>
                            <Card title="Payment Summary">
                                <div className="flex justify-between ">
                                    <p className="text-base opacity-50">
                                        Subtotal
                                    </p>
                                    <p className="text-lg opacity-75 ">
                                        {orderData?.sub_total_price}
                                    </p>
                                </div>
                                <div className="flex justify-between ">
                                    <p className="text-base opacity-50">
                                        Delivery fee
                                    </p>
                                    <p className="text-lg opacity-75 ">
                                        {orderData?.delivery_charge}
                                    </p>
                                </div>
                                <div className="flex justify-between ">
                                    <p className="text-base opacity-50">
                                        Discount
                                    </p>
                                    <p className="text-lg opacity-75">
                                        {orderData?.discount.amount}
                                    </p>
                                </div>
                                <Divider />
                                <div className="flex justify-between ">
                                    <p className="text-base opacity-50">
                                        Total
                                    </p>
                                    <p className="text-lg opacity-75">
                                        {parseFloat(
                                            `${orderData?.sub_total_price}`
                                        ) +
                                            parseFloat(
                                                `${orderData?.delivery_charge}`
                                            ) -
                                            parseFloat(
                                                `${orderData?.discount.amount}`
                                            )}
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="mb-4">
                        <Card title="Shipping Address">
                            <div className=" my-2">
                                <p className="text-lg opacity-75 pt-4">
                                    {orderData?.shipping_address.name}
                                </p>
                                <p className="text-lg opacity-75 pt-4">
                                    {orderData?.shipping_address.street}
                                </p>
                                <p className="text-lg opacity-75 pt-4">
                                    {orderData?.shipping_address.state}
                                </p>
                                <p className="text-lg opacity-75 pt-4">
                                    {orderData?.shipping_address.country}
                                </p>
                            </div>
                        </Card>
                    </div>
                    <div className="">
                        <Card title="Activity">
                            <p className="text-base font-bold opacity-25">
                                SUNDAY, 06 MARCH
                            </p>
                            <div className="flex gap-5 py-2">
                                <div className="mt-[7]">
                                    <div className="h-[15px] w-[15px] bg-teal-400 rounded-full"></div>
                                    <div className="h-[80px] w-1 bg-cyan-500 rounded ms-[5px] opacity-25"></div>
                                </div>
                                <div>
                                    <p className="text-lg  text-primary">
                                        Parcel has been delivered
                                    </p>
                                    <p className="text-md opacity-25">
                                        Recipient: Lloyd Obrien
                                    </p>
                                    <p className="text-md opacity-25">
                                        02:13 PM
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5 py-2">
                                <div className="mt-[7px]">
                                    <div className="h-[15px] w-[15px] bg-teal-400 rounded-full"></div>
                                    <div className="h-[50px] w-1 bg-cyan-500 rounded ms-[5px] opacity-25"></div>
                                </div>
                                <div>
                                    <p className="text-lg  text-primary">
                                        Parcel has been delivered
                                    </p>
                                    <p className="text-md opacity-25">
                                        Recipient: Lloyd Obrien
                                    </p>
                                    <p className="text-md opacity-25">
                                        02:13 PM
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div>
                    <Card title="User Profile">
                        <div className="flex  flex-col justify-center items-center">
                            <Image
                                width={80}
                                style={{ borderRadius: "100%" }}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                            <p className="text-lg mt-2">
                                {`${orderData?.user.first_name} ${orderData?.user.last_name}`}
                            </p>
                            <p className="opacity-50 ">
                                {orderData?.user.phone_number}
                            </p>
                        </div>
                    </Card>
                    <div className="my-4">
                        <Card title="Status">
                            <div className="flex justify-between gap-1 my-4">
                                <p className="mt-[5px]">Payment Status:</p>
                                <Select
                                    value={orderData?.payment_status}
                                    style={{ width: 120 }}
                                    placement={placement}
                                    options={[
                                        {
                                            value: "pending",
                                            label: "Pending",
                                        },
                                        {
                                            value: "paid",
                                            label: "Paid",
                                        },
                                        {
                                            value: "failed",
                                            label: "Failed",
                                        },
                                        {
                                            value: "refunded",
                                            label: "Refunded",
                                        },
                                    ]}
                                />
                            </div>
                            <div className="flex justify-between gap-1">
                                <p className="mt-[5px]">Delivery Status:</p>
                                <Select
                                    value={orderData?.delivery_status}
                                    style={{ width: 120 }}
                                    placement={placement}
                                    options={[
                                        {
                                            value: "Pending",
                                            label: "Pending",
                                        },
                                        {
                                            value: "delivered",
                                            label: "Delivered",
                                        },
                                        {
                                            value: "returned",
                                            label: "Returned",
                                        },
                                        {
                                            value: "Cancelled",
                                            label: "Cancelled",
                                        },
                                    ]}
                                />
                            </div>
                            <div className="flex justify-between gap-1 my-4">
                                <p className="mt-[5px]">Order Status:</p>
                                <Select
                                    value={orderData?.order_status}
                                    style={{ width: 120 }}
                                    placement={placement}
                                    options={[
                                        {
                                            value: "pending",
                                            label: "Pending",
                                        },
                                        {
                                            value: "processing",
                                            label: "Processing",
                                        },
                                        {
                                            value: "completed",
                                            label: "Completed",
                                        },
                                        {
                                            value: "cancelled",
                                            label: "Cancelled",
                                        },
                                    ]}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default OrderDetailsPage;
