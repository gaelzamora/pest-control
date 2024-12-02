
type OptionsProps = {
    name: string
    iterables: any
}

function OptionsComponent({name, iterables}: OptionsProps) {

    return (
        <div className='mt-5 flex flex-col mx-6 gap-2'>
            <p className='text-xs font-bold text-gray-500 uppercase mt-4'>{name}</p>
            {iterables.map ((item: any) => (
                <div className='rounded-md flex gap-2 cursor-pointer px-2 py-3 hover:bg-gray-200 duration-75'>
                    <item.icon className='w-6 h-6 text-gray-600 font-semibold' />
                    <p className='text-gray-600 xl:block hidden font-semibold'>{item.name}</p>
                </div>
            ))}
        </div>
    )
}

export default OptionsComponent
