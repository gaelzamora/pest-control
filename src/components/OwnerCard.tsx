import { useQuery } from '@tanstack/react-query'
import Avatar from '../assets/avatar.png'
import { Owner } from '../interfaces'
import { updateRequestStatus } from '../api/users'
import { BeatLoader } from 'react-spinners'

type OwnerCardProps = {
    owner: Owner
}

function OwnerCard({owner}: OwnerCardProps) {

    const {isLoading} = useQuery({
        queryKey: ["owner"],
        queryFn: () => updateRequestStatus(owner.id)
    })

    return (
    <div key={owner.id} className="flex items-center space-x-4">
        <img src={owner.owner_image ? `http://localhost:8000${owner.owner_image}` : Avatar } alt="Imagen de perfil" className="w-10 h-10 rounded-full" />
        <div>
            <p className="font-semibold tracking-tighter">{owner.owner_name}</p>
            <p className="font-semibold text-gray-500 text-xs">{owner.owner_email}</p>
        </div>
        <div className="flex flex-1" />
                              
        <div className='max-w-full px-4 py-2 rounded-lg text-gray-100 capitalize cursor-pointer max-h-full bg-blue-500'>
            {isLoading ? (
                <>
                    <BeatLoader />
                </> 
            ) : (
                <>
                    {owner.status}
                </>
            )}
        </div>
    </div>
)
}

export default OwnerCard