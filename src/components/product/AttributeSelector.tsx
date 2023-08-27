import { Card, Select } from 'antd';
import useAttributeStore from '../../store/attribute.store';

type Props = {
    selectedAttributes: { [key: string]: string[] },
    onAttributeSelect: (attributeId: string) => void,
    onAttributeValueSelect: (attributeId: string, attributeValueIds: string[]) => void,
}

const AttributeSelector = (props: Props) => {
    const attributes = useAttributeStore(state => state.attributes);
    return (
        <div>
            <Select onChange={props.onAttributeSelect}>
                {attributes.data.map(item =>
                    <Select.Option key={item._id} value={item._id} >{item.name}</Select.Option>
                )}
            </Select>
            <div className='mt-4'>
                {
                    Object.keys(props.selectedAttributes).map((attributeId) => {
                        const attribute = attributes.data.find((attr) => attr._id === attributeId);
                        return !attribute ? null : (
                            <Card key={attributeId} title={attribute.name} className='mb-4'>
                                <Select mode='multiple' onChange={(value) => props.onAttributeValueSelect(attributeId, value)} value={props.selectedAttributes[attributeId]}>
                                    {attribute.value.map((value) => (
                                        <Select.Option key={value._id} value={value._id}>{value.name}</Select.Option>
                                    ))}
                                </Select>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AttributeSelector;