import { IoIosArrowRoundBack, IoMdClose } from "react-icons/io";

export function ReturnButton({buttonFn} : {buttonFn: () => void}) {
  return (
    <button onClick={buttonFn} className="flex gap-1 items-center justify-center group">
        <div className="group-hover:text-white group-hover:bg-black rounded-lg transition-all">
            <IoIosArrowRoundBack className="text-3xl" />
        </div>
        <p>Back</p>
    </button>
  )
}

export function CloseButton({buttonFn} : {buttonFn: () => void}) {
  return (
    <button onClick={buttonFn} className="flex gap-1 items-center justify-center group">
      <IoMdClose onClick={buttonFn} className="text-3xl border hover:bg-red-600 hover:border-red-600 rounded-lg p-1 transition-colors cursor-pointer"/>
    </button>
  )
}