import { Button, Input, Typography } from "@material-tailwind/react";
import { FaChevronRight, FaRegKeyboard } from 'react-icons/fa6';
const SITEMAP = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Our Team", "Projects"],
  },
  {
    title: "Help Center",
    links: ["Discord", "Twitter", "GitHub", "Contact Us"],
  },
  {
    title: "Resources",
    links: ["Blog", "Newsletter", "Free Products", "Affiliate Program"],
  },


];
const media_icons = [
"/images/fbicon.webp",
"images/zalo.webp",
"images/ig.webp",
"images/youtube.webp",
"images/tiktok.webp"
]
 
const currentYear = new Date().getFullYear();
 
export function Footer() {
  return (
    <footer className="relative w-full bg-colorfooter-main ">
      <div className="mx-auto w-full max-w-7xl px-8 ">
       <div className=" w-full">
       <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {SITEMAP.map(({ title, links }, key) => (
            <div key={key} className="w-full">
              <Typography
                variant="small"
                color="white"
                className="mb-4 font-bold uppercase text-white "
              >
                {title}
              </Typography>
              <ul className="space-y-1">
                {links.map((link, key) => (
                  <Typography key={key} as="li" color="white" className="font-normal">
                    <a
                      href="/"
                      className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                    >
                      {link}
                    </a>
                  </Typography>
                ))}
              </ul>
            </div>
          ))}
<div className="">
<div className="relative ">
  <Typography className="uppercase text-white font-bold pb-[20px]">
    Đăng ký nhận tin
  </Typography>
  <div className="relative z-1">  
    <Button className="rounded-[3rem] absolute right-0">
      Đăng ký
    </Button></div>
  <Input
    label="Nhập địa chỉ Email"
    className="w-full rounded-[20px]"
  />
</div>
<div className="grid grid-cols-5 gap-4 mt-4">
{media_icons.map((path)=> {
return <Typography className="">
<img src={path} alt=""  className="h-9 w-9 "/>
</Typography>
})}

</div>
</div>
        </div>
       </div>
        <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-center">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-white md:mb-0 text-[18px] "
          >
            &copy; {currentYear} <a href="https://material-tailwind.com/">Material Tailwind</a>. All
            Rights Reserved.
          </Typography>
         
        </div>
      </div>
    </footer>
  );
}