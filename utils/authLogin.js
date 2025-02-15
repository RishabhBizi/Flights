import axios from "axios";

export async function authLogin() {
    try {
        const formData = new URLSearchParams();
        const url = import.meta.env.VITE_AMADEUS_BASE_URL+"/v1/security/oauth2/token"
        formData.append("grant_type","client_credentials");
        formData.append("client_id",import.meta.env.VITE_CLIENT_ID)
        formData.append("client_secret",import.meta.env.VITE_CLIENT_SECRET)
        const response = await axios.post(url, formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
      
          return response.data;
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
}