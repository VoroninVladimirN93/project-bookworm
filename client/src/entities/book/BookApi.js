import { axiosInstance } from '../../shared/lib/axiosInstance';

class BookApi {
  
  static async getBooks() {
    try {
      const { data } = await axiosInstance.get('/books');
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  
  static async getBookById(id) {
    try {
      const { data } = await axiosInstance.get(`/books/${id}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  
  static async createBook(newBook) {
    try {
      const { data } = await axiosInstance.post('/books', newBook);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

 
  static async deleteBookById(id) {
    try {
      const { data } = await axiosInstance.delete(`/books/${id}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

 
  static async updateBookById(id, updatedBook) {
    try {
      const { data } = await axiosInstance.put(`/books/${id}`, updatedBook);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default BookApi;
