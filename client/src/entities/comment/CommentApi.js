import { axiosInstance } from '../../shared/lib/axiosInstance';

class CommentApi {
  
  static async getComments() {
    try {
      const { data } = await axiosInstance.get('/comments');
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  
  static async getCommentById(id) {
    try {
      const { data } = await axiosInstance.get(`/comments/${id}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  
  static async createComment(newComment) {
    try {
      const { data } = await axiosInstance.post('/comments', newComment);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

 
  static async deleteCommentById(id) {
    try {
      const { data } = await axiosInstance.delete(`/comments/${id}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

 
  static async updateCommentById(id, updatedComment) {
    try {
      const { data } = await axiosInstance.put(`/comments/${id}`, updatedComment);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default CommentApi;
