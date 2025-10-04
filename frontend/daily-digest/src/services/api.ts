const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

//only inclusive of get methods...
class ApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    // private means only this class can see the URL (keeps it safe)
    async request(endpoint: string, options: RequestInit = {}) {
        const url = `${this.baseUrl}${endpoint}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();

        } catch (error) {
            console.error(`API request failed for ${endpoint}:`, error);
            throw error;
        }
    } //end of method
}

export const APIService = new ApiService();