import { Breadcrumb, Card } from 'antd'
import { Link } from 'react-router-dom'

//COMPONENTS
import ProductForm from '../components/product/ProductForm'

const ProductCreatePage = () => {
    return (
        <section>
            <Breadcrumb
                items={[
                    {
                        title: <Link to={"/"} >Dashboard</Link>,
                    },
                    {
                        title: <Link to={"/product"} >Products</Link>,
                    },
                    {
                        title: 'New Product',
                    },
                ]}
            />
            <div className='mt-4'>
                <Card title="Create new product">
                    <ProductForm />
                </Card>
            </div>
        </section>
    )
}

export default ProductCreatePage