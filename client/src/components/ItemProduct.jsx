import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";
export default function ItemProduct() {
  return (
 <div className="mx-4 cursor-pointer">
     <Card className="w-50 my-4 shadow-lg">
=
      <CardHeader color="blue-gray" className=" h-50">
        <img
          src="https://product.hstatic.net/1000378223/product/3_b12e829920ee47d48ed4b277e2055286_large.jpg"
          alt="Apple AirPods"
          className="h-[200px] w-full object-cover"
        />
      </CardHeader>

      {/* Body */}
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography variant="h7" color="blue-gray" className="font-body font-medium">
          <a href="/">Áo Thun - AT - TT - R1510 BD450</a>
          </Typography>
          <Typography variant="h5" color="red" className=""> 
            <HeartIcon className="h-5 w-5 text-dark cursor-pointer"/>
          </Typography>
        </div>
        <Typography variant="h5" color="gray" className="font-bold">
         149,000₫
        </Typography>
       <div className="flex items-center gap-6">
       <Typography variant="paragraph" color="gray" className="text-[18px] line-through">
         139,000₫
        </Typography>
        <div className=" border-2 rounded-[40%] h-10 w-12 bg-red-500 ">
        <Typography variant="paragraph" color="white" className="text-[22px] text-white text-center ">
         <span className="text-[16px] font-medium"> -34%</span>
        </Typography>
        </div>
       </div>
       <div className="">
        <Typography variant="h6" color="gray" className="font-bold">
          Màu sắc:
          </Typography>
          <div className="flex gap-2">
          <img
            src="https://product.hstatic.net/1000378223/product/2_6128279176a5468d92540a8943987f27_large.jpg"
            alt="Apple AirPods"
            className="h-[40px] w-[40px] object-cover rounded-full"
          />
          <img
            src="https://product.hstatic.net/1000378223/product/2_6128279176a5468d92540a8943987f27_large.jpg"
            alt="Apple AirPods"
            className="h-[40px] w-[40px] object-cover rounded-full"
          />
          <img
            src="https://product.hstatic.net/1000378223/product/xanh_8e19ba709dbb40da99f1f6c984eb4fdb_1024x1024.jpg"
            alt="Apple AirPods"
            className="h-[40px] w-[40px] object-cover rounded-full"
          />
          </div>
       </div>
      </CardBody>

      {/* Footer */}
      <CardFooter className="pt-0">
        <Button
          color="cyan"
          fullWidth
          className="shadow-md hover:shadow-lg focus:shadow-none active:shadow-none"
        >
      Thêm vào giỏ hàng
        </Button>
      </CardFooter>
    </Card>
 </div>
  );
}
