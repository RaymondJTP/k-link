const authorization = async (req,res,next) => {
    try {
        if(req.user.role !== 'admin'){
            throw({name : 'unauthorized', message : 'Only admin can access this feature'})
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authorization
