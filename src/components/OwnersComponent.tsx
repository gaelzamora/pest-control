import { useQuery } from '@tanstack/react-query'
import {motion} from 'framer-motion'
import { getWorkRequests } from '../api/users'
import Avatar from '../assets/avatar.png'
import { modalVariants } from '../animations/animations'
import { BeatLoader } from 'react-spinners'
import { useAuthStore } from '../store/auth'
import { Token } from '../interfaces'
import { jwtDecode } from 'jwt-decode'
import OwnerCard from './OwnerCard'

function OwnersComponent() {

  const token = useAuthStore.getState().access
  const tokenDecoded: Token = jwtDecode(token)
  
  const {data: owners, isLoading} = useQuery({
    queryKey: ["owners"],
    queryFn: () => getWorkRequests()
  })

  console.log(owners)

  return (
    <motion.div 
            className="shadow-lg w-full h-full border-2 rounded-lg border-gray-200 bg-white p-6"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-10 w-4/5">
              <p className="text-3xl font-bold tracking-tighter">
                My work requests.
              </p>
              <section className="mt-10">
                <p className="text-xs text-gray-500 uppercase font-bold">Owners</p>
                <div className="mt-8">
                  {isLoading ? (
                    <div className="flex justify-center items-center mt-10">
                      <BeatLoader />
                    </div>
                  ) : (
                    <>
                      {owners && owners.length > 0 ? (
                        <div className="flex flex-col gap-4">
                          {owners.map((owner: any) => (
                            <>
                              <OwnerCard
                                owner={owner}
                              />
                            </>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No owners found.</p>
                      )}
                    </>
                  )}
                </div>
              </section>
            </div>
    </motion.div>
  )
}

export default OwnersComponent