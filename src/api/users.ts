import {axi} from '../api/useAxios'
import { User } from '../interfaces'
import { useAuthStore } from '../store/auth'

export const loginRequest = async (email: string, password: string) => {
    try {
        const response = await axi.post("/api/users/login/", {email, password})
        return response
    } catch (err) {
        console.log(err)
    }

} 

export const createManager = async (email: string, first_name: string, last_name: string, branch: string, password: string, token: string) => {
    await axi.post("/api/users/create-manager/", {email, first_name, last_name, branch, password}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const registerTechniqueRequest = async (email: string, first_name: string, last_name: string, password: string) => {
    try {
        await axi.post("/api/users/create/", {email, first_name, last_name, password})
    } catch (err) {
        console.log(err)
    }
}

export const getManagers = async () => {
    const token = useAuthStore.getState().access

    const response = await axi.get("/api/users/get-managers/", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

export const searchManagers = async (query: string, token: string) => {
    try {
        const response = await axi.get('/api/users/search-manager/', {
            params: { query },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.managers || [];
    } catch (error) {
        return [];
    }
}
export const deleteManager = async (id: number) => {
    const token = useAuthStore.getState().access

    await axi.delete(`/api/users/delete-manager/${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getMyInformation = async (): Promise<User> => {
    const token = useAuthStore.getState().access;

    const response = await axi.get('/api/users/user-info/', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const updateInformation = async (first_name: string, last_name: string, image: File | null) => {
    const token = useAuthStore.getState().access
    
    const formData = new FormData()
    if (first_name) formData.append("first_name", first_name)
    if (last_name) formData.append("last_name", last_name)
    if (image) formData.append("image", image)
    
    await axi.patch(
        `/api/users/user-update/`,
        formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}

export const getTechnicians = async (query: string, token: string) => {

    const response = await axi.get('/api/users/get-technicians/', {
        params: { query },
        headers: {
        
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

export const sendRequest = async (pk: number) => {
    const token = useAuthStore.getState().access
    
    const response = await axi.post('/api/users/send-request/', {technician: pk}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })


    return response.data
}

export const receivedStatusTechnicians = async () => {
    const token = useAuthStore.getState().access

    const response = await axi.get('/api/users/technician-status/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

export const getWorkRequests = async () => {
    const token = useAuthStore.getState().access

    const response = await axi.get('/api/users/work-requests/get_send_requests_for_technician/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

export const updateRequestStatus = async (pk: number) => {
    const token = useAuthStore.getState().access

    return await axi.patch(`/api/users/update-request-status/${pk}/`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}