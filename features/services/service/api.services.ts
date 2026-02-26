import { Service } from "@/features/services/types/services";
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/services`;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

const servicesAPI = {
    getAllServices: async ()=>{
        const response = await api.get("/");
        return response.data;
    },
    getServiceById: async (id: string)=>{
        const response = await api.get(`/${id}`);
        return response.data;
    },
    createService: async (service: Service)=>{
        const response = await api.post("/", service);
        return response.data;
    },
    updateService: async (id: string, service: Service)=>{
        const response = await api.put(`/${id}`, service);
        return response.data;
    },
    deleteService: async (id: string)=>{
        const response = await api.delete(`/${id}`);
        return response.data;
    }
}

export default servicesAPI;