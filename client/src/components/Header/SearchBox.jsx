import { Input } from '@material-tailwind/react'
import React from 'react'
import { FaSearch } from 'react-icons/fa';

export default function SearchBox() {
  return (
   <form>
<Input
        label="Tìm kiếm sản phẩm"
        className="group"
        icon={
          <FaSearch
            className="hover:text-black cursor-pointer transition-colors duration-300"
        
          />
        }
      />
   </form>
  )
}
