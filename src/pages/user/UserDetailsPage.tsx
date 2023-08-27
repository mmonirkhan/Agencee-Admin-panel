import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../models/user.model";
import { Card, Button, Form, Input, Image, Breadcrumb } from "antd";
import httpRequest from "../../helpers/http";

const UserDetailsPage = () => {
    const [userData, setUserData] = useState<User>();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const { userName } = params;
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);
    };

    const getData = async () => {
        const res = await httpRequest.get({
            path: `/admin/user/${userName}`,
        });
        setLoading(false);
        const data = await res.json();
        if (res.ok) {
            setUserData(data.data);
            form.setFieldsValue(data.data);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return loading ? (
        <p>loading...</p>
    ) : userData ? (
        <section>
            <Breadcrumb
                items={[
                    {
                        title: <Link to={"/"}>Dashboard</Link>,
                    },
                    {
                        title: <Link to={"/"}>User</Link>,
                    },
                    {
                        title: "UserDetails",
                    },
                ]}
            />
            <div className="grid md:grid-cols-3 gap-4">
                <Card title="User Profile">
                    <div className="flex  flex-col justify-center items-center">
                        <Image
                            width={80}
                            style={{ borderRadius: "100%" }}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                        <p className="text-lg mt-2">{`${userData.first_name} ${userData.last_name}`}</p>
                        <p className="opacity-50 ">{userData.phone_number}</p>
                    </div>
                </Card>
                <Card title="User Details" className="md:col-span-2">
                    <Form
                        form={form}
                        name="user-edit"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <div className="grid lg:grid-cols-2 gap-x-2">
                            <Form.Item
                                label="First Name"
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input placeholder="First Name" readOnly />
                            </Form.Item>
                            <Form.Item
                                name="last_name"
                                label="Last-Name"
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input placeholder="Last Name" readOnly />
                            </Form.Item>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-x-2 ">
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, whitespace: true }]}
                            >
                                <Input placeholder="Email" readOnly />
                            </Form.Item>
                            <Form.Item
                                name="phone_number"
                                label="Number"
                                rules={[{ required: true, whitespace: true }]}
                            >
                                <Input
                                    disabled
                                    placeholder="Enter your phone number"
                                />
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled>
                                Update Account
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </section>
    ) : (
        <p>User Not found</p>
    );
};
export default UserDetailsPage;
