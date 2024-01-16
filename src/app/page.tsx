import SkillForm from '@/components/SkillForm'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 items-center gap-10 p-24">
   
   <div className=' flex flex-col gap-3 items-center  '>
    <p className='font-bold text-md text-slate-600 opacity-90  '> Zepto assignment Medhashis Maiti </p>
   <p className='font-bold text-2xl text-slate-50'> 
    These are the only items that are present.
   </p>
    </div>
   <div className = " flex  md:96 w-80 flex-wrap gap-4">
   <Button variant={"default"} className=' rounded-full'> Typescript</Button>
   <Button variant={"default"} className=' rounded-full'> redux</Button>
   <Button variant={"default"} className=' rounded-full'>JavaScript</Button>
   <Button variant={"default"} className=' rounded-full'> Penguin</Button>
   <Button variant={"default"} className=' rounded-full'> Lion</Button>
   <Button variant={"default"} className=' rounded-full'> giraffe</Button>
   <Button variant={"default"} className=' rounded-full'> elephant</Button>
   <Button variant={"default"} className=' rounded-full'> Kangaroo</Button>
   <Button variant={"default"} className=' rounded-full'> readme</Button>
   <Button variant={"default"} className=' rounded-full'> react</Button>
   </div>

     <SkillForm/>
    </div>
  )
}
