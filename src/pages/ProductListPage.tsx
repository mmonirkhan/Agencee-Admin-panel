import { useEffect } from "react";
import { Breadcrumb, Button, Card, Table } from "antd";
import { Link } from "react-router-dom";
import useProductStore from "../store/product.store";

const ProductListPage = () => {
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    const products = useProductStore((state) => state.products);

    useEffect(() => {
        if (!products.data.length) fetchProducts();
    }, []);

    return (
        <section>
            <Breadcrumb
                items={[
                    {
                        title: <Link to={"/"}>Dashboard</Link>,
                    },
                    {
                        title: "Product List",
                    },
                ]}
            />
            <div className="mt-4">
                <Card
                    title="Product list"
                    loading={products.loading}
                    extra={
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={fetchProducts}
                                icon={<i className="ri-refresh-line"></i>}
                                type="primary"
                            >
                                Reload
                            </Button>
                            <Link to={"new"}>
                                <Button
                                    icon={<i className="ri-add-line"></i>}
                                    type="primary"
                                >
                                    Create
                                </Button>
                            </Link>
                        </div>
                    }
                >
                    <Table
                        scroll={{ x: 600 }}
                        dataSource={products.data}
                        rowKey={(item) => `product_${item._id}`}
                        columns={[
                            {
                                title: "Name",
                                render: (_val, rec) => (
                                    <Link to={`/product/${rec._id}`}>
                                        {rec.name}
                                    </Link>
                                ),
                            },
                            {
                                title: "Published",
                                render: (_val, rec) =>
                                    rec.published ? "True" : "False",
                            },
                            {
                                title: "Action",
                                render: (_val, rec) => (
                                    <Link to={`/product/${rec._id}/edit`}>
                                        <Button
                                            icon={
                                                <i className="ri-edit-box-line"></i>
                                            }
                                            type="primary"
                                        >
                                            Edit
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

export default ProductListPage;
