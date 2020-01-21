
/* Get constants from environment variables. 
 * Values are configured in .env (for development) and .env.production (for staging and production)
 */

const {
    NODE_ENV = 'development',
    TA_PLUS_API_PROTOCOL = "http",
    TA_PLUS_API_HOST = "10.6.49.20",
    TA_PLUS_API_PORT = 7008
} = process.env;
const TA_PLUS_API_ENDPOINT = `http://10.6.49.20:7008/api/v1/`

export default {
    NODE_ENV,
    TA_PLUS_API_ENDPOINT
};
