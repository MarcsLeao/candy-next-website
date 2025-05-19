import Image from "next/image";

export function UserInfo() {

    return (
    <div className='flex justify-center items-center gap-3'>
        <div className='flex flex-col justify-center items-end'>
          <p className='text-zinc-900 text-base'>Username</p>
          <p className='font-thin text-sm'>Admin</p>
        </div>
        <Image src="/images/user.png" width={25} height={25} alt="profile image" className='w-[40px] h-[40px] bg-gray-100 rounded-full object-cover'/>
    </div>
  )
}
