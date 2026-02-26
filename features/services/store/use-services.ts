import servicesAPI from '@/features/services/service/api.services';
import { Service } from '@/features/services/types/services';
import { create } from 'zustand';

interface ServicesStore {
    services: Service[];
    error: string | null;
    loading: boolean;
    getServices: () => Promise<void>;
    getServiceById: (id: string) => Promise<void>;
    createService: (service: Service) => void;
    updateService: (id: string, service: Service) => void;
    deleteService: (id: string) => void;
}

export const useServicesStore = create<ServicesStore>((set) => ({
    services: [],
    error: null,
    loading: false,
    getServices: async () => {
        set({ loading: true })
        try {
            const service = await servicesAPI.getAllServices()
            set({ services: service })
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false })
        } finally {
            set({ loading: false })
        }
    },
    getServiceById: async (id) => {
        set({ loading: true })
        try {
            const service = await servicesAPI.getServiceById(id)
            set({ services: service })
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false })
        } finally {
            set({ loading: false })
        }
    },
    createService: async (service: Service) => { 
        set({ loading: true, error: null })
        try {
            const newService = await servicesAPI.createService(service)
            set({ services: newService })
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false })
            throw error
        } finally {
            set({ loading: false })
        }
    },
    updateService: async (id, service) => { 
        set({ loading: true })
        try{
            const updatedService = await servicesAPI.updateService(id, service)
            set({ services: updatedService })
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false })
        } finally {
            set({ loading: false })
        }
    },
    deleteService: async (id) => { 
        set({ loading: true })
        try{
            const deletedService = await servicesAPI.deleteService(id)
            set({ services: deletedService })
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false })
        } finally {
            set({ loading: false })
        }
    },
}));