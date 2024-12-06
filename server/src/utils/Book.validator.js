class BookValidator {

static validate(data) {
    const { author, title, } = data; 

    
    if (!author || typeof author !== 'string' || author.trim() === '') {
      return {
        isValid: false, 
        error: 'Author is required and must be a non-empty string.', 
      };
    }
    
   
    if (!title || typeof title !== 'string' || title.trim() === '') {
      
      return {
        isValid: false, 
        error: 'Pages is required and must be a non-empty number.', 
      };
    }

   
    return {
      isValid: true, 
      error: null, 
    };
  }
}

module.exports = BookValidator;
