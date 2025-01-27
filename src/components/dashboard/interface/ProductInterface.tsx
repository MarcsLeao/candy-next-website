import ProductList from "../ui/ProductList";
import CreateProduct from "../ui/CreateProduct";
import { ProductInterfaceMenu } from "../menu/ProductInterfaceMenu";
import { useState } from "react";

export function ProductInterface() {
  const [selectedPage, setSelectedPage] = useState<string>('product')

  return (
  <section className="flex-1 max-h-[90vh] overflow-y-auto">
    <ProductInterfaceMenu selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
    <div className="flex flex-col gap-4 p-4">
      <div className="overflow-x-auto rounded-lg">
          {selectedPage === 'product' ? <ProductList /> : <CreateProduct />}
      </div>
    </div>
  </section>
  )
}
