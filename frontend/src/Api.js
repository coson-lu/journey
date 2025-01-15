import { getAuth } from 'firebase/auth';

const baseUrl = 'https://journey-backend.vercel.app'

class ApiService {
  static async getAuthHeader(isFormData = false) {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('No user logged in');
    }
    
    const token = await user.getIdToken();
    
    return isFormData ? {
      'Authorization': `Bearer ${token}`
    } : {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  static async getCurrentData() {
    const headers = await this.getAuthHeader();
    const response = await fetch(`${baseUrl}/current`, {
      headers
    });
    return response.json();
  }

  static async updateData(activity, duration) {
    const headers = await this.getAuthHeader(true);
    const formData = new FormData();
    formData.append('activity', activity);
    formData.append('duration', duration);

    const response = await fetch(`${baseUrl}/update`, {
      method: 'POST',
      headers,
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update data');
    }
    
    return response.json();
  }

  static async getAllData() {
    const headers = await this.getAuthHeader();
    const response = await fetch(`${baseUrl}/all`, {
      headers
    });
    return response.json();
  }
}

export default ApiService;