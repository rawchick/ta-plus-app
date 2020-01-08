import axios from 'axios'
import env from '../config/env';

export interface IPlaceService {
    searchPlace: (keyword: string, offset: number, limit: number) => Promise<any[]>;
}

class PlaceService implements IPlaceService {
    async searchPlace(keyword: string = "", offset: number = 0, limit: number = 10): Promise<any[]> {
        try {
            const url = `${env.TA_PLUS_API_ENDPOINT}places/search?keyword=${keyword}&offset=${offset}&limit=${limit}`;
            const response = await axios.get(url);
            if (response.data.errors && response.data.errors.length > 0) throw response.data.errors;
            const results: any[] = response.data.data;
            return results;
        } catch (error) {
            return [];
        }
    }
}

export default new PlaceService()