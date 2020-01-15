import axios from 'axios'
import env from '../config/env';

export interface IMyTripService {
    searchTrip: (keyword: string, status: string, offset: number, limit: number) => Promise<any[]>;
    createTrip: (trip: any) => Promise<any>;
}

class MyTripService implements IMyTripService {
    async searchTrip(keyword: string, status: string, offset: number = 0, limit: number = 5): Promise<any[]> {
        try {
            const url = `${env.TA_PLUS_API_ENDPOINT}trip/search?travelerId=300139&offset=${offset}&limit=${limit}&status=300`;
            const response = await axios.get(url);
            if (response.data.errors && response.data.errors.length > 0) throw response.data.errors;
            const results: any[] = response.data.data;
            return results;
        } catch (error) {
            return [];
        }
    }

    async createTrip(trip: any): Promise<any> {
        try {
            const response = await axios.post(`${env.TA_PLUS_API_ENDPOINT}trip`, trip);
            if (response.data.errors.length > 0) throw response.data.errors;
            const results: any = response.data.data;
            return results;
        } catch (error) {
            throw error;
        }
    }
}

export default new MyTripService()