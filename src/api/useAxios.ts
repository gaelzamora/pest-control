import { useAuthStore } from "../store/auth";
import axios from "axios";

export default function logout() {
    useAuthStore.getState().logout()
}

export const baseURL = 'http://localhost:8000'

export const axi = axios.create({
    baseURL
})

export const authAxios = axios.create({
    baseURL,
    withCredentials: true
})