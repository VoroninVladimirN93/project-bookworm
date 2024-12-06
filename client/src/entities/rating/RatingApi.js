import { axiosInstance } from '../../shared/lib/axiosInstance';

class RatingApi {
  
  static async getRatings() {
    try {
      const { data } = await axiosInstance.get('/ratings');
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getRatingById(id) {
    try {
      const { data } = await axiosInstance.get(`/ratings/${id}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async createRating(newRating) {
    try {
      const { data } = await axiosInstance.post('/ratings', newRating);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async deleteRatingById(id) {
    try {
      const { data } = await axiosInstance.delete(`/ratings/${id}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async updateRatingById(id, updatedRating) {
    try {
      const { data } = await axiosInstance.put(`/ratings/${id}`, updatedRating);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default RatingApi;