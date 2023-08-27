import { Select } from 'antd';
import useCategoryStore from '../../store/category.store';

type Props = {
  selectedValues: string[],
  onChange: (value: string[]) => void
}

const CategorySelector = (props: Props) => {
  const categories = useCategoryStore(state => state.categories);
  return (
    <Select title='Product category' placeholder="(Optional) Select category" mode='multiple' onChange={(value) => props.onChange(value)} value={props.selectedValues}>
      {categories.data.map((category) => (
        <Select.Option key={category._id} value={category._id}>{category.name}</Select.Option>
      ))}
    </Select>
  )
}

export default CategorySelector