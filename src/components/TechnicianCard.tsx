import { Technician } from "../interfaces"
import Avatar from '../assets/avatar.png'
import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sendRequest } from "../api/users"
import { BeatLoader } from "react-spinners"

type TechnicianCardProps = {
    technician: Technician
    status?: string
}

function TechnicianCard({technician, status}: TechnicianCardProps) {
  const [requestStatus, setRequestStatus] = useState("Send")
  
  const queryClient = useQueryClient()

  const { mutate: sendRequestMutate, isPending } = useMutation({
    mutationFn: sendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['send_requests'] })
    },
    onError: (error) => {
      console.error(error)
    }
  })

  useEffect(() => {
    if (status) {
      setRequestStatus(status)
    }
  }, [status])

  return (
    <div key={technician.id} className="flex items-center space-x-4">
        <img src={technician.image ? `http://localhost:8000${technician.image}` : Avatar } alt="Imagen de perfil" className="w-10 h-10 rounded-full" />
        <div>
            <p className="font-semibold tracking-tighter">{technician.first_name} {technician.last_name}</p>
            <p className="font-semibold text-gray-500 text-xs">{technician.email}</p>
        </div>
        <div className="flex flex-1" />
        <p 
          className="px-4 py-2 max-w-full max-h-full bg-blue-400 hover:bg-blue-500 capitalize transition-all delay-75 text-gray-100 cursor-pointer rounded-xl"
          onClick={() => sendRequestMutate(technician.id)}
        >
          {isPending ? (
            <>
              <BeatLoader />
            </>
          ) : (
            <>
              {requestStatus}
            </>
          )}
        </p>                       
    </div>
  )
}

export default TechnicianCard