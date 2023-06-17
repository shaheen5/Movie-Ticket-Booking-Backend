class Helper {
    /**
      * To authenticate token
      * @param {*} req (express property)
      * @param {*} res (express property)
      * @param {*} next (express property)
      * @returns HTTP status and object
      */
    authenticateToken(req, res, next) {
        const token = req.headers.authorization;
        if (token === 'myToken123') {
            next();
        } else {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized User!',
            });
        }
    }
}
module.exports = new Helper();