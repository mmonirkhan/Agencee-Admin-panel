import React from 'react'
import type { AttributeValue } from '../../models/attribute.model'
import { Button, Input } from 'antd'

type Props = {
    value: AttributeValue
}

const AttributeValueItem = (props: Props) => {
    return (
        <div className='py-1 flex items-center gap-8 group'>
            <Input value={props.value.name} readOnly bordered={false} className='w-fit group-hover:bg-slate-200' />
            <div className='flex gap-2 opacity-0 group-hover:opacity-100'>
                <Button icon={<i className="ri-edit-box-line"></i>} type='primary' shape='circle'></Button>
                {/* <Button icon={<i className="ri-delete-bin-7-line"></i>} danger type='primary' shape='circle'></Button> */}
            </div>
        </div>
    )
}

export default AttributeValueItem