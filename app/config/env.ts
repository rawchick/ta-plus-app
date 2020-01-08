
/* Get constants from environment variables. 
 * Values are configured in .env (for development) and .env.production (for staging and production)
 */ 

const {
    NODE_ENV = 'development',
    TA_PLUS_API_PROTOCOL = "http",
    TA_PLUS_API_HOST = "10.6.49.20",
    TA_PLUS_API_PORT = 7008
} = process.env;

export default {
    NODE_ENV,
    TA_PLUS_API_ENDPOINT: `${TA_PLUS_API_PROTOCOL}://${TA_PLUS_API_HOST}:${TA_PLUS_API_PORT}/api/v1/`,
};
