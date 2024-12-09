import {delay, motion} from 'framer-motion'
import { itemOpacity } from '../animations/animations'
import { useAuthStore } from '../store/auth'
import { Token } from '../interfaces'
import { jwtDecode } from 'jwt-decode'
import { generalNavbar, ownerNavbar, techniqueNavbar } from '../data/data'

type OptionsProps = {
    name: string
    showComponent: string
    setShowComponent: (name: string) => void
}


function OptionsComponent({name, showComponent, setShowComponent}: OptionsProps) {

    const token = useAuthStore.getState().access

    const tokenDecoded: Token = jwtDecode(token)

    const is_creator = tokenDecoded.is_creator
    const is_technique = tokenDecoded.is_technique

    const iterables = is_creator ? ownerNavbar : is_technique ? techniqueNavbar : generalNavbar

    return (
        <div className='mt-5 flex flex-col mx-6 gap-2'>
            <p className='text-xs font-bold text-gray-500 uppercase mt-4'>{name}</p>
            {iterables.map ((item: any, index: number) => (
                <motion.div 
                    className={`rounded-md flex gap-2 cursor-pointer px-2 py-3 ${showComponent === item.name ? 'bg-gray-200' : ''} hover:bg-gray-200 duration-75`} onClick={() => setShowComponent(item.name)}
                    key={index}
                    custom={{delay: (index) * 0.2}}
                    variants={itemOpacity}
                    initial='hidden'
                    animate='visible'
                    layoutId={item.name}

                >
                    
                    <item.icon className='w-4 h-5 text-gray-600 font-semibold' />
                    <p className='text-gray-600 text-sm xl:block hidden font-semibold'>{item.name}</p>
                </motion.div>
            ))}
        </div>
    )
}

export default OptionsComponent
