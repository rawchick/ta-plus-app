import axios from 'axios'
import env from '../config/env';

export interface IDropdownService {
    getTripStatus: () => Promise<any[]>;
}

class DropdownService implements IDropdownService {
    async getTripStatus(): Promise<any[]> {
        try {
            const url = `${env.TA_PLUS_API_ENDPOINT}dropdown?prefix=TS`;
            const response = await axios.get(url);
            if (response.data.errors && response.data.errors.length > 0) throw response.data.errors;
            const results: any[] = response.data.data;
            return results;
        } catch (error) {
            return [];
        }
    }
}

export default new DropdownService()