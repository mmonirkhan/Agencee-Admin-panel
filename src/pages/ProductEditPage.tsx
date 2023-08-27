import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Alert, Breadcrumb, Card, Collapse, CollapseProps, message } from 'antd';
import { getProductService } from '../services/product.service';
import type { ProductDetails, ProductVariant } from '../models/product.model';
import ProductForm from '../components/product/ProductForm';
import ProductVariantController from '../components/product/ProductVariantController';

const ProductEditPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [messageApi, messageContext] = message.useMessage();

    const [product, setProduct] = useState<ProductDetails>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const productId = params.productId;
        if (!productId) {
            setLoading(false);
            navigate('/product');
        } else {
            getProductService(productId!)
                .then(res => {
                    setLoading(false);
                    setProduct(res.data);
                })
                .catch(err => {
                    setLoading(false);
                    messageApi.error(err.message);
                });
        }
    }, [params]);

    const onVariantUpdate = (variant: ProductVariant) => {
        const newProduct = { ...product! };
        const index = newProduct.variants.findIndex(item => item._id === variant._id);
        newProduct.variants[index] = variant;
        setProduct(newProduct);
    }

    const variantCollapseItems: CollapseProps['items'] = useMemo(() => {
        if (!product) return [];
        return product.variants.map(variant => ({
            key: variant._id,
            label: variant.attributes.map(att => att.value.name).join(", ") + `${variant._id === product.default_variant ? ' - (default)' : ''}`,
            children: <ProductVariantController variant={variant} onVariantUpdate={onVariantUpdate} />
        }));
    }, [product]);

    return (
        <section>
            {messageContext}
            <Breadcrumb
                items={[
                    {
                        title: <Link to={"/"} >Dashboard</Link>,
                    },
                    {
                        title: <Link to={"/product"} >Products</Link>,
                    },
                    {
                        title: 'Edit Product',
                    },
                ]}
            />
            <div className='h-4'></div>
            {(!product && !loading) ?
                <Alert
                    message="Something wrong"
                    description="Something wrong while getting product information"
                    type="error"
                /> :
                <>
                    <div className="grid grid-cols-4 gap-4">
                        {/* left contents */}
                        <div className="col-span-3">
                            <Card title="Product Info">
                                <ProductForm initialData={product} />
                            </Card>
                            <div className='mt-4'>
                                <p className='text-base font-semibold'>Variants</p>
                                <Collapse items={variantCollapseItems} className='mt-2' />
                            </div>
                        </div>

                        {/* right contents */}
                        <div>
                            <Card title="">

                            </Card>
                        </div>
                    </div>
                </>

            }
        </section>
    )
}

export default ProductEditPage