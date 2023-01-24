if (
  !process.env.REACT_APP_ADMIN_AUTH ||
  !process.env.REACT_APP_BASIC_AUTH ||
  !process.env.REACT_APP_KEYCLOAK_URL ||
  !process.env.REACT_APP_SERVER_ADDRESS ||
  !process.env.REACT_APP_CLIENT_ID ||
  !process.env.REACT_APP_CLIENT_SECRET
) {
  throw new Error('Please provide all required environment variables');
}

const config = {
  ADMIN_AUTH: process.env.REACT_APP_ADMIN_AUTH,
  BASIC_AUTH: process.env.REACT_APP_BASIC_AUTH,
  JSONRPC_ADDRESS: process.env.REACT_APP_JSONRPC_ADDRESS,
  KEYCLOAK_URL: process.env.REACT_APP_KEYCLOAK_URL,
  REST_ADDRESS: process.env.REACT_APP_REST_ADDRESS,
  SERVER_ADDRESS: process.env.REACT_APP_SERVER_ADDRESS,
  WALLET_ADDRESS: process.env.REACT_APP_WALLET_ADDRESS,
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
  CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET,
};

export default config;
