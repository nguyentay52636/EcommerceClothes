import React from 'react'
import ItemProduct from '../../../../components/ItemProduct'
const list_clothes = [
 {
color1: "https://product.hstatic.net/1000378223/product/2_6128279176a5468d92540a8943987f27_large.jpg",
color2 : "https://product.hstatic.net/1000378223/product/2_6128279176a5468d92540a8943987f27_large.jpg",
color3 : "https://product.hstatic.net/1000378223/product/xanh_8e19ba709dbb40da99f1f6c984eb4fdb_1024x1024.jpg"
 },

]
export default function ProductList() {
  return (
    <div className="grid lg:grid-cols-5 gap-4 mx-2">
    <ItemProduct/>
    <ItemProduct/>
    <ItemProduct/>
    <ItemProduct/>
    <ItemProduct/>
    <ItemProduct/>
    <ItemProduct/>
    <ItemProduct/>
    <ItemProduct/>
    <ItemProduct/>
  
    
    </div>
  )
}
