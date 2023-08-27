import { useState } from 'react'
import { Form, Input, Modal, message } from 'antd'
import { createAttributeValueService } from '../../services/attribute.service';
import useAttributeStore from '../../store/attribute.store';

type Props = {
    isOpenNewValue: boolean,
    onClose: () => void,
    attrId: string
}

const AttributeValueForm = (props: Props) => {
    const [attrValueForm] = Form.useForm();
    const updateAttribute = useAttributeStore(state => state.updateAttribute);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const onCancel = () => {
        attrValueForm.resetFields();
        props.onClose();
    };

    const onSubmit = (values: any) => {
        setLoading(true);
        createAttributeValueService(values, props.attrId).then(result => {
            messageApi.success("Created")
            setLoading(false);
            updateAttribute(result.data);
            onCancel();
        }).catch(err => {
            setLoading(false);
            messageApi.error(err.message);
        })
    }

    return (
        <Modal open={props.isOpenNewValue} onCancel={onCancel} confirmLoading={loading} onOk={() => attrValueForm.submit()}>
            {contextHolder}
            <p className='mb-4'>New attribute value</p>
            <Form form={attrValueForm} onFinish={onSubmit}>
                <Form.Item rules={[{ required: true, whitespace: true }]} name={"name"}>
                    <Input placeholder='Enter new value' />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AttributeValueForm