if (
  !process.env.REACT_APP_ADMIN_AUTH ||
  !process.env.REACT_APP_APP_NAME ||
  !process.env.REACT_APP_BASIC_AUTH ||
  !process.env.REACT_APP_KEYCLOAK_URL ||
  !process.env.REACT_APP_SERVER_ADDRESS ||
  !process.env.REACT_APP_UNIVERSAL_LINK
) {
  throw new Error('Please provide all required environment variables');
}
const config = {
  ADMIN_AUTH: process.env.REACT_APP_ADMIN_AUTH,
  APP_NAME: process.env.REACT_APP_APP_NAME,
  BASIC_AUTH: process.env.REACT_APP_BASIC_AUTH,
  JSONRPC_ADDRESS: process.env.REACT_APP_JSONRPC_ADDRESS,
  KEYCLOAK_URL: process.env.REACT_APP_KEYCLOAK_URL,
  REST_ADDRESS: process.env.REACT_APP_REST_ADDRESS,
  SERVER_ADDRESS: process.env.REACT_APP_SERVER_ADDRESS,
  UNIVERSAL_LINK: process.env.REACT_APP_UNIVERSAL_LINK,
  WALLET_ADDRESS: process.env.REACT_APP_WALLET_ADDRESS
};

export default config;
