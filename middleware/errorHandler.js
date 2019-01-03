exports.errorHandler = (errMsg, errCode) => {
   const error = new Error(errMsg);
   error.statusCode = errCode; // Not authenticated

   return error;
};