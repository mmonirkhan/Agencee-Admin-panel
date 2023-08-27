import { Breadcrumb, Card, Table, Button } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../store/user.store";

const UserListPage = () => {
    const { user, fetchUsers } = useUserStore();

    useEffect(() => {
        if (!user.data.length) fetchUsers();
    }, []);

    return (
        <section>
            <Breadcrumb
                items={[
                    {
                        title: <Link to={"/"}>Dashboard</Link>,
                    },

                    {
                        title: "Users",
                    },
                ]}
            />
            <div className="mt-4">
                <Card
                    title="User Details"
                    extra={
                        <Button
                            onClick={fetchUsers}
                            icon={<i className="ri-refresh-line"></i>}
                            type="primary"
                        >
                            Reload
                        </Button>
                    }
                >
                    <Table
                        scroll={{ x: 600 }}
                        loading={user.loading}
                        dataSource={user.data}
                        rowKey={(item) => `user_${item.user_name}`}
                        columns={[
                            {
                                title: "Name",
                                render: (_val, rec) => (
                                    <Link to={`/user/${rec.user_name}`}>
                                        {rec.first_name} {rec.last_name}
                                    </Link>
                                ),
                            },
                            {
                                title: "Phone Number",
                                render: (_val, rec) => rec.phone_number,
                            },
                            {
                                title: "Seller",
                                render: (_val, rec) =>
                                    rec.is_seller ? "True" : "False",
                            },
                            {
                                title: "Verified",
                                render: (_val, rec) =>
                                    rec.is_verified ? "True" : "False",
                            },
                            {
                                title: "Action",
                                render: (_val, rec) => (
                                    <Link to={`/user/${rec.user_name}/edit`}>
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
export default UserListPage;
