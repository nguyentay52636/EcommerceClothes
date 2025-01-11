import { Typography ,Select, Option} from '@material-tailwind/react'
import React from 'react'
import ProductList from '../components/CoursePagination/ProductList'

export default function Products() {
  return (
    <div className="mt-10">
<div className="flex place-content-between mx-16">
    <Typography color="black" variant="h2" className="font-medium text-left">End Of Season Sale</Typography>
    <div className="flex items-center justify-between">
    <Typography color="black" className="ml-4">Sap xep</Typography>
    <div className="w-72 p-2">
    <Select label="Select Version">
        <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option>
        
      </Select>
    </div>
    </div>
</div>
<div className="mx-10">
    <ProductList/>
</div>
    </div>
  )
}
