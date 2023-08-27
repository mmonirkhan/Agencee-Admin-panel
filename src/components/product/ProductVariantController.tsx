import { useEffect, useState } from 'react';
import { Button, Form, InputNumber, message } from 'antd';
import type { ProductVariant } from '../../models/product.model';
import { updateProductVariantService } from '../../services/product.service';

type Props = {
    variant: ProductVariant,
    onVariantUpdate: (variant: ProductVariant) => void
}

const ProductVariantController = ({ variant, onVariantUpdate }: Props) => {
    const [variantForm] = Form.useForm();
    const [messageApi, messageContext] = message.useMessage();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        variantForm.setFieldsValue({
            price: variant.price.toString(),
            stock: variant.stock.toString()
        });
    }, [variant]);

    const onVariantSave = async (values: any) => {
        const data = {
            price: values.price,
            stock: values.stock
        }
        setLoading(true);
        try {
            const { res, result } = await updateProductVariantService(variant._id, data);
            setLoading(false);
            if (!res.ok) {
                if (result.errors) {
                    variantForm.setFields(
                        Object.values(result.errors).map((item: any) => ({
                            name: `${item.path}`,
                            errors: [item.msg]
                        })))
                    throw new Error("Validation failed");

                }
                else {
                    throw new Error(result.msg);
                }
            };

            messageApi.success("Updated");
            variantForm.resetFields();
            onVariantUpdate(result.data);
        } catch (error: any) {
            setLoading(false);
            messageApi.error(error.message);
        }
    }

    return (
        <div>
            {messageContext}
            <Form layout='vertical' form={variantForm} onFinish={onVariantSave}>
                <Form.Item label="Price" name={'price'}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Stock" name={'stock'}>
                    <InputNumber />
                </Form.Item>
                <Form.Item>
                    <div className='flex justify-end'>
                        <Button type='primary' htmlType='submit' loading={loading} >Update</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ProductVariantController;