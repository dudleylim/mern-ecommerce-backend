const User = require('../models/User');
const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || authorization === undefined) {
        return res.status(401).json({
            error: "Authorization token required"
        });
    }

    const token = authorization.split(' ')[1];

    try {
        // console.log(token);
        const { id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({ _id: id }).select('_id');
        next();
    } catch (error) {
        // console.log(token);
        res.status(401).json({ error: "Request is not authorized" })
    }
}

module.exports = requireAuth;