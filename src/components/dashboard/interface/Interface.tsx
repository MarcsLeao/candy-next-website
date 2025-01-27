'use client'

import { InterfaceMenu } from "../menu/InterfaceMenu";
import OrderList from "../ui/OrderList";
import CreateOrder from "../ui/CreateOrder";
import { useState } from "react";

export function Interface() {
    const [selectedPage, setSelectedPage] = useState<string>('list')

    return (
    <section className="flex-1 max-h-[90vh] overflow-y-auto">
      <InterfaceMenu selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
      <div className="flex flex-col gap-4 p-4">
        <div className="overflow-x-auto rounded-lg">
            {selectedPage === 'list' ? <OrderList /> : <CreateOrder />}
        </div>
      </div>
    </section>
  )
}
