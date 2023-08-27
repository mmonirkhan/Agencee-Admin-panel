import { useEffect, useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import ReactQuill from 'react-quill';
import { useNavigate } from "react-router-dom";
//COMPONENTS
import CategorySelector from "./CategorySelector";
import AttributeSelector from "./AttributeSelector";
//STORE
import useAttributeStore from '../../store/attribute.store';
import useCategoryStore from '../../store/category.store';
import useProductStore from '../../store/product.store';
//SERVICES
import { createProductService, updateProductService } from "../../services/product.service";
//MODEL
import type { ProductDetails } from "../../models/product.model";


const ProductForm = ({ initialData }: { initialData?: ProductDetails }) => {
    const navigate = useNavigate();
    const [productForm] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const updateProduct = useProductStore(state => state.updateProduct);

    const { attributes, fetchAttributes } = useAttributeStore(state => state);
    const { categories, fetchCategories } = useCategoryStore(state => state);

    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string[] }>({});
    const [published, setPublished] = useState(false);

    //fetch categories and attributes on startup if not fetched.
    useEffect(() => {
        if (!attributes.loading && !attributes.data.length) fetchAttributes();
        if (!categories.loading && !categories.data.length) fetchCategories();
    }, []);

    useEffect(() => {
        if (initialData) {
            productForm.setFieldsValue({
                name: initialData.name,
                short_description: initialData.short_description
            });
            setDescription(initialData.description);
            setSelectedCategories(initialData.category.map(item => item.category._id));
            setPublished(initialData.published);
        }
    }, [initialData]);

    const onCreateProduct = async (values: any) => {
        const newProductData = {
            ...values,
            description,
            categories: selectedCategories,
            attributes: Object.keys(selectedAttributes).map(attr => ({
                attribute: attr,
                value: selectedAttributes[attr]
            }))
        };

        try {
            setLoading(true);
            const result = await createProductService(newProductData);
            setLoading(false);
            messageApi.success("New product created");
            navigate(`/product/${result.data._id}/edit`);
        } catch (error: any) {
            setLoading(false);
            messageApi.error(error.message);
        }
    };

    const onUpdateProduct = async (values: any) => {
        const data: any = {
            ...values,
            published
        };
        if (description && description.trim().length) data.description = description;
        try {
            setLoading(true);
            const { res, result } = await updateProductService(initialData!._id, data);
            if (!res.ok) {
                throw new Error("Product update failed");
            }
            setLoading(false);
            messageApi.success("Product updated");
            updateProduct(result.data);
        } catch (error: any) {
            setLoading(false);
            messageApi.error(error.message);
        }
    }

    const onReset = () => {
        productForm.resetFields();
        setDescription("");
        setSelectedCategories([]);
        setSelectedAttributes({});
    };

    const onDraft = () => {
        setPublished(false);
        productForm.submit();
    };
    const onPublish = () => {
        setPublished(true);
        productForm.submit();
    };

    const onAttributeSelect = (attributeId: string) => {
        if (!selectedAttributes[attributeId]) {
            setSelectedAttributes(attrs => ({
                ...attrs,
                [attributeId]: []
            }))
        }
    };

    const onAttributeValueSelect = (attributeId: string, attributeValueIds: string[]) => {
        setSelectedAttributes(attrs => ({
            ...attrs,
            [attributeId]: attributeValueIds
        }))
    };

    return (
        <Spin spinning={loading}>
            {contextHolder}
            <Form layout="vertical" className="product-create-form" form={productForm} onFinish={initialData ? onUpdateProduct : onCreateProduct}>
                <Form.Item label="Name" name={"name"} rules={[{ required: true, whitespace: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Short Description" name={"short_description"}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="Description">
                    <ReactQuill theme="snow" value={description} onChange={setDescription} />
                </Form.Item>
                <Form.Item label="Select Category">
                    <CategorySelector selectedValues={selectedCategories} onChange={setSelectedCategories} />
                </Form.Item>
                {!initialData && <Form.Item label="Select Attribute">
                    <AttributeSelector selectedAttributes={selectedAttributes} onAttributeSelect={onAttributeSelect} onAttributeValueSelect={onAttributeValueSelect} />
                </Form.Item>}
                {!initialData ?
                    <Form.Item>
                        <div className="flex justify-end items-center gap-2">
                            <Button type="primary" htmlType="reset" icon={<i className="ri-refresh-line"></i>} onClick={onReset} >Reset</Button>
                            <Button type="primary" htmlType="submit">Create</Button>
                        </div>
                    </Form.Item> :
                    <Form.Item>
                        <div className="flex justify-end items-center gap-2">
                            <Button type="primary" htmlType="button" onClick={onDraft} >Save as draft</Button>
                            <Button type="primary" htmlType="button" onClick={onPublish}>Publish</Button>
                        </div>
                    </Form.Item>
                }
            </Form>
        </Spin>
    )
}

export default ProductForm;