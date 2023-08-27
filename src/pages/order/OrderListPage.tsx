import { Breadcrumb, Card, Table, Button } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useOrderStore from "../../store/order.store";

const OderListPage = () => {
    const { order, fetchOrder } = useOrderStore();

    useEffect(() => {
        if (!order.data.length) fetchOrder();
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
                        title: "OrderList",
                    },
                ]}
            />
            <div className="mt-4">
                <Card
                    title="Order List"
                    extra={
                        <Button
                            onClick={fetchOrder}
                            icon={<i className="ri-refresh-line"></i>}
                            type="primary"
                        >
                            Reload
                        </Button>
                    }
                >
                    <Table
                        scroll={{ x: 600 }}
                        loading={order.loading}
                        dataSource={order.data}
                        rowKey={(item) => `order_${item._id}`}
                        columns={[
                            {
                                title: "Name",
                                render: (_val, rec) => (
                                    <Link to={`/user/${rec.user.user_name}`}>
                                        {rec.user.first_name}{" "}
                                        {rec.user.last_name}
                                    </Link>
                                ),
                            },
                            {
                                title: "Total Price",
                                render: (_val, rec) => rec.total_price,
                            },
                            {
                                title: "Order Status ",
                                render: (_val, rec) =>
                                    rec.order_status ? "True" : "False",
                            },

                            {
                                title: "Action",
                                render: (_val, rec) => (
                                    <Link to={`/order/${rec._id}`}>
                                        <Button
                                            icon={
                                                <i className="ri-edit-box-line"></i>
                                            }
                                            type="primary"
                                        >
                                            Details
                                        </Button>
                                    </Link>
                                ),
                            },
                        ]}
                    />
                </Card>
            </div>
        </section>
    );
};
export default OderListPage;
