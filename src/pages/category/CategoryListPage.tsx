import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Card, Table } from "antd";
import useCategoryStore from "../../store/category.store";
import CategoryFormModal from "../../components/category/CategoryFormModal";

const CategoryListPage = () => {
    const categories = useCategoryStore(state => state.categories);
    const fetchCategories = useCategoryStore(state => state.fetchCategories);

    const [editCategoryId, setEditCategoryId] = useState<string>();
    const [openForm, setOpenForm] = useState(false);

    const toggleForm = () => {
        if (openForm) {
            setEditCategoryId(undefined);
        }
        setOpenForm(!openForm);
    }

    const selectCategoryForEdit = (id: string) => {
        setEditCategoryId(id);
        toggleForm();
    }

    useEffect(() => {
        if (!categories.loading && !categories.data.length) {
            fetchCategories();
        }
    }, []);

    return (
        <section>
            <CategoryFormModal categoryId={editCategoryId} isOpen={openForm} toggleForm={toggleForm} />
            <Breadcrumb
                items={[
                    {
                        title: <Link to={"/"} >Dashboard</Link>,
                    },
                    {
                        title: 'Category List',
                    },
                ]}
            />
            <div className="mt-4"></div>
            <Card title="Category List" extra={<div className="flex items-center gap-2">
                <Button icon={<i className="ri-refresh-line"></i>} type="primary" onClick={fetchCategories}>Reload</Button>
                <Button icon={<i className="ri-add-line"></i>} type="primary" onClick={toggleForm}>Add New</Button>
            </div>} >
                <Table
                    dataSource={categories.data}
                    loading={categories.loading}
                    rowKey={item => `cat_list_item_${item._id}`}
                    columns={[
                        {
                            title: "Name",
                            render: (_val, rec) => <Link to={rec._id}>{rec.name}</Link>
                        }, {
                            title: "Slug",
                            dataIndex: "slug"
                        }, {
                            title: "Action",
                            render: (_, rec) =>
                                <Button icon={<i className="ri-edit-box-line"></i>} type="primary" onClick={() => selectCategoryForEdit(rec._id)} disabled>Edit</Button>
                        }
                    ]}
                />
            </Card>
        </section>
    )
}

export default CategoryListPage