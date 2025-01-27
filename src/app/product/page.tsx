'use client'

import Header from "@/src/components/dashboard/Header";
import { ProductInterface } from "@/src/components/dashboard/interface/ProductInterface";
import { SideMenu } from "@/src/components/dashboard/SideMenu";
import { Main } from "@/src/components/home/Main";

export default function productPage() {
  return (
      <Main>
        <Header />
        <div className="flex flex-1 w-full">
          <SideMenu selectedMenuOption={'product'}/>
          <ProductInterface />
        </div>
      </Main>
  )
}
