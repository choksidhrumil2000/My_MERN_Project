const errorHandler = (err,req,res,next)=>{
// console.log(err.stack);
// res.status(500).json({
//     message:err.message || 'Server Error!!',
// })

let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // // Handle Mongoose specific errors if necessary (e.g., validation)
    // if (err.name === 'CastError' || err.code === 11000) {
    //     // Example: Duplicate key error (11000) or bad ID format (CastError)
    //     statusCode = 400;
    //     message = `Invalid request data: ${err.message.split(':').pop().trim()}`;
    // }

    // Send the structured error response
    return res.status(statusCode).json({
        success: false,
        message: message,
        // Include stack trace only in development environment
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}

module.exports = errorHandler