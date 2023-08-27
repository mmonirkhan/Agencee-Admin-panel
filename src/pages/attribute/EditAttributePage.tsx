import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Attribute } from "../../models/attribute.model";
import useAttributeStore from "../../store/attribute.store";
import { Breadcrumb, Button, Card, Form, Input, Modal } from "antd";
import AttributeValueItem from "./AttributeValueItem";
import AttributeValueForm from "./AttributeValueForm";

const EditAttributePage = () => {
    const params = useParams();
    const fetchAttributes = useAttributeStore(state => state.fetchAttributes);
    const attributes = useAttributeStore(state => state.attributes);
    const [attr, setAttr] = useState<Attribute>();
    const [isOpenNewValue, setIsOpenNewValue] = useState(false);

    useEffect(() => {
        const selectedAttr = attributes.data.find(attrItem => attrItem._id === params.attributeId);
        setAttr(selectedAttr);
        if (!attributes.loading && !attributes.data.length) {
            fetchAttributes();
        }
    }, [params, attributes]);

    const toggleNewValueModal = () => setIsOpenNewValue(isOpen => !isOpen);

    return !attr ? <></> : (
        <section>
            <AttributeValueForm isOpenNewValue={isOpenNewValue} onClose={toggleNewValueModal} attrId={attr._id} />
            <Breadcrumb
                items={[
                    {
                        title: <Link to={"/"} >Dashboard</Link>,
                    },
                    {
                        title: <Link to={"/attribute"} >Attributes</Link>,
                    },
                    {
                        title: "Edit Attribute",
                    },
                ]}
            />
            <div className="mt-4"></div>
            <Card title={`Edit - "${attr.name}"`} >
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-2">
                        <Card title="Attribute">
                            <Form>
                                <Form.Item>
                                    <Input defaultValue={attr.name} />
                                </Form.Item>
                                <Form.Item>
                                    <div className="flex justify-end"><Button type="primary">Update</Button></div>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                    <div className="col-span-3">
                        <Card title="Values" extra={<Button onClick={toggleNewValueModal}>Add New</Button>}>
                            {
                                attr.value.map((value) => (
                                    <AttributeValueItem
                                        key={`attr_value_${value._id}`}
                                        value={value}
                                    />
                                ))
                            }
                        </Card>
                    </div>
                </div>
            </Card>
        </section>
    )
}

export default EditAttributePage