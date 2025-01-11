import React from 'react'
import { Header } from '../../../components/Header/Header'
import { Footer } from '../../../components/Footer'
import { CarouselCustomArrows, } from '../../../components/Banner/CarouselCustomArrows'
import Products from '../../ListProduct/pages/Products'

export default function MainLayout() {
  return (
    <div>
    <div className="w-full fixel">  <Header/></div>
  <div className="mt-14">  <CarouselCustomArrows/></div>
  <Products/>
     <Footer/>
    </div>
  )
}
