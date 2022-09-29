import jwt from 'jsonwebtoken'

const jwtFetchUser = (req, res, next) => {
    const token = req.header('authToken');
    if (!token) {
        return res.status(401).json({ error: " Please authenticate using valid token" });
    }
    try {
        const data = jwt.verify(token, process.env.SECTRE_KEY)
        req.user = data
        next()
    } catch (error) {
        res.status(500).send("Internal Server Problem")
    }

}

export default jwtFetchUser