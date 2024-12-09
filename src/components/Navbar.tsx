import LogoSmall from '../images/logo_small.png'
import OptionsComponent from './OptionsComponent'
import { IoSettingsOutline } from 'react-icons/io5'
import { useAuthStore } from '../store/auth'

type navbarProps = {
    showComponent: string
    setShowComponent: (name: string) => void
}

function Navbar({showComponent, setShowComponent}: navbarProps) {

    const logout = useAuthStore((State) => State.logout)

    return (
        <section className="row-span-2 my-6 relative h-screen xl:block hidden">
            <div className='flex-grow'>
                <div className="flex relative mx-6 gap-2">
                    <img src={LogoSmall} alt="Logo" className='w-10' />
                    <p className='text-gray-800 font-bold xl:text-xl -mt-1'>Catch Me</p>
                    <p className='absolute xl:block hidden right-0 text-gray-500 font-semibold'>V 1.0</p>
                </div>
    
                <OptionsComponent 
                    name={'general'} 
                    key={'general'}
                    showComponent={showComponent}
                    setShowComponent={setShowComponent}
                />
            </div>
    
            <div 
                className='rounded-md flex gap-2 cursor-pointer px-2 py-3 hover:bg-gray-200 duration-75 mx-6 mt-[24rem] font-semibold text-gray-600'
                onClick={logout}
            >
                
                <IoSettingsOutline className='w-4 h-5' />
                <p className='text-sm font-semibold'>Logout</p>
            </div>
    
        </section>
    )
    
}

export default Navbar
