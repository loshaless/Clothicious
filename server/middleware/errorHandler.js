function errorHandler(err, req, res, next) {
    if (err.name === 'SequelizeValidationError') {
        res.status(400).json({ message: err.errors[0].message });
    }
    else if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: err.errors[0].message });
    } 
    else if (err.name === 'unauthorized') {
        res.status(401).json({message: 'unauthorized'})
    }
    else {
        let message = err.message || 'internal server error'
        let status = err.status || 500
        res.status(status).json({ message: message })
    }
}

module.exports = errorHandler