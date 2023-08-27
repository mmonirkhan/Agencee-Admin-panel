import { useState } from 'react';
import { Form, Input, Modal, message } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import slugMaker from '../../utils/slugMaker';
import { createCategoryService } from '../../services/category.service';
import useCategoryStore from '../../store/category.store';

type Props = {
    isOpen: boolean,
    toggleForm: () => void,
    categoryId?: string
}

const CategoryFormModal = (props: Props) => {
    const [categoryForm] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const addCategory = useCategoryStore(state => state.addCategory);
    const [loading, setLoading] = useState(false);

    const onCancel = () => {
        categoryForm.resetFields();
        props.toggleForm();
    };

    const onFormSubmit = async (values: any) => {
        const data = {
            name: values["category-name"].trim(),
            slug: values["category-slug"].trim(),
        }
        setLoading(true);
        try {
            const { res, result } = await createCategoryService(data);
            setLoading(false);
            if (!res.ok) {
                if (result.errors) {
                    categoryForm.setFields(
                        Object.values(result.errors).map((item: any) => ({
                            name: `category-${item.path}`,
                            errors: [item.msg]
                        })))
                    return;
                }
                else {
                    throw new Error(result.msg);
                }
            };
            addCategory(result.data);
            messageApi.success("Success");
            props.toggleForm();
        } catch (error: any) {
            setLoading(false);
            messageApi.error(error.message);
        }
    }

    const setSlug = useDebouncedCallback(
        (value) => {
            value = value.trim();
            let slug = "";
            if (value.length) {
                slug = slugMaker(value);
            }
            categoryForm.setFieldsValue({
                "category-slug": slug
            });
        },
        1000
    );

    return (
        <>
            {contextHolder}

            <Modal open={props.isOpen} onCancel={onCancel} confirmLoading={loading} onOk={() => categoryForm.submit()}>
                <p className='text-lg font-semibold'>{"Create new category"}</p>
                <div className='mt-4'>
                    <Form layout='vertical' form={categoryForm} onFinish={onFormSubmit} >
                        <Form.Item label="Name" name={"category-name"} rules={[{ required: true, whitespace: true }]}>
                            <Input placeholder='Enter category name' onChange={(e) => setSlug(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Slug" name={"category-slug"} rules={[{ required: true, whitespace: true }]}>
                            <Input placeholder='Enter slug' />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default CategoryFormModal