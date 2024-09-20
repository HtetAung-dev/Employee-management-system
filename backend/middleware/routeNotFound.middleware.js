const routeNotFound = (req, res, next) =>{
    const error = new Error('Route Not Found');

    return res.status(404).json({
        error: error.message
    });
}

module.exports = routeNotFound;