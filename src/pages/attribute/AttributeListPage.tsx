import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Breadcrumb,
    Button,
    Card,
    Form,
    Input,
    Modal,
    Table,
    message,
} from "antd";
import useAttributeStore from "../../store/attribute.store";
import { createAttributeService } from "../../services/attribute.service";
import { Attribute } from "../../models/attribute.model";

const AttributeListPage = () => {
    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();

    const fetchAttributes = useAttributeStore((state) => state.fetchAttributes);
    const addNewAttribute = useAttributeStore((state) => state.addNewAttribute);
    const attributes = useAttributeStore((state) => state.attributes);

    const [openForm, setOpenForm] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const toggleForm = () => setOpenForm((isOpen) => !isOpen);

    useEffect(() => {
        if (!attributes.data.length) {
            fetchAttributes();
        }
    }, []);

    const onNewAttributeSubmit = (values: any) => {
        setNewItemLoading(true);
        createAttributeService(values)
            .then((result) => {
                const newAttribute: Attribute = {
                    _id: result.data._id,
                    name: result.data.name,
                    value: [],
                };
                addNewAttribute(newAttribute);
                toggleForm();
                form.resetFields();
                messageApi.success("Created");
            })
            .catch((err: any) => {
                messageApi.error(err.message);
            })
            .finally(() => setNewItemLoading(false));
    };

    return (
        <>
            {contextHolder}
            <Modal
                open={openForm}
                onCancel={toggleForm}
                onOk={() => form.submit()}
                confirmLoading={newItemLoading}
            >
                <p className="font-semibold text-base mb-4">Create Attribute</p>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onNewAttributeSubmit}
                >
                    <Form.Item
                        label="Name"
                        name={"name"}
                        rules={[{ required: true, whitespace: true }]}
                    >
                        <Input placeholder="Enter attribute name" />
                    </Form.Item>
                </Form>
            </Modal>

            <section>
                <Breadcrumb
                    items={[
                        {
                            title: <Link to={"/"}>Dashboard</Link>,
                        },
                        {
                            title: "Attribute List",
                        },
                    ]}
                />

                <div className="mt-4"></div>
                <Card
                    title="Attributes"
                    extra={
                        <div className="flex gap-1">
                            <Button
                                type="primary"
                                icon={<i className="ri-refresh-line"></i>}
                                onClick={fetchAttributes}
                                loading={attributes.loading}
                            >
                                Reload
                            </Button>
                            <Button type="primary" onClick={toggleForm}>
                                Add New
                            </Button>
                        </div>
                    }
                >
                    <Table
                        rowKey={(item) => `attr_table_item_${item._id}`}
                        loading={attributes.loading}
                        dataSource={attributes.data}
                        columns={[
                            {
                                title: "Name",
                                dataIndex: "name",
                            },
                            {
                                title: "Values",
                                render: (_val, rec) =>
                                    `${rec.value
                                        .slice(0, 4)
                                        .map((item) => item.name)
                                        .join(", ")} ${
                                        rec.value.length > 4 ? "..." : ""
                                    }`,
                            },
                            {
                                title: "Action",
                                render: (_val, rec) => (
                                    <Link to={`/attribute/${rec._id}/edit`}>
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
            </section>
        </>
    );
};

export default AttributeListPage;
