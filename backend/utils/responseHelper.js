// File: backend/utils/responseHelper.js

/**
 * Sends a success response.
 * @param {object} res - Express response object.
 * @param {number} statusCode - HTTP status code.
 * @param {string} message - Success message.
 * @param {object} [data] - Optional data to include in the response.
 */
export const sendSuccessResponse = (res, statusCode, message, data = null) => {
    const response = {
      success: true,
      message,
      data,
    };
    res.status(statusCode).json(response);
  };
  
  /**
   * Sends an error response.
   * @param {object} res - Express response object.
   * @param {number} statusCode - HTTP status code.
   * @param {string} message - Error message.
   * @param {object} [error] - Optional error details to include in the response.
   */
  export const sendErrorResponse = (res, statusCode, message, error = null) => {
    const response = {
      success: false,
      message,
      error,
    };
    res.status(statusCode).json(response);
  };
  
  