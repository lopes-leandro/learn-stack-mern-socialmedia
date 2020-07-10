const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3200,
    jwtSecret: process.env.JWT_SECRET || 'gotham sistemas',
    mongoUri: process.env.MONGODB_URI || 
        process.env.MONGODB_HOST || 'mongodb://' +
        (process.env.IP || 'localhost') +
        ':' +
        (process.env.MONGO_PORT || '27017') +
        '/heroes'
}

export default config;