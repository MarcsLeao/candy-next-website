'use client'

import Header from "@/src/components/dashboard/Header";
import { Interface } from "@/src/components/dashboard/interface/Interface";
import { SideMenu } from "@/src/components/dashboard/SideMenu";
import { Main } from "@/src/components/home/Main";
import { OrderProvider } from "@/src/contexts/OrderContext";

export default function DashboardPage() {
  return (
      <OrderProvider>
        <Main>
          <Header />
          <div className="flex flex-1 w-full">
            <SideMenu selectedMenuOption={'dashboard'}/>
            <Interface />
          </div>
        </Main>
      </OrderProvider>
  )
}