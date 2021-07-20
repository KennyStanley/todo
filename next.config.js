require('dotenv').config()
module.exports = {
    reactStrictMode: true,
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        DB_NAME: process.env.DB_NAME,
        BASE_URI: process.env.BASE_URI,
        JWT_SECRET: process.env.JWT_SECRET,
    },
}
