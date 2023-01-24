import config from '../config';
import store from '../store/store';
import WebService from './WebService';

export const basicAuth = process.env.REACT_APP_BASIC_AUTH;
export const adminAuth = process.env.REACT_APP_ADMIN_AUTH;

export default class APIService {
  static apiLoginOpenId = () =>
    `${process.env.REACT_APP_KEYCLOAK_URL}/realms/meveo/protocol/openid-connect/token`;

  static apiGetTokenList = () =>
    `${APIService.routeMeveoAPI()}/rest/unikbase-token`;

  static routeMeveoAPI = () => `${process.env.REACT_APP_SERVER_ADDRESS}/meveo`;

  static apiGetToken = (tokenId) =>
    `${APIService.routeMeveoAPI()}/rest/unikbase-token/${tokenId}`;

  static apiGetWalletInfoByKeyCloak = () =>
    `${APIService.routeMeveoAPI()}/rest/user-wallet-info`;

  static loginKeyCloak(username, password, callback) {
    const data = {
      client_id: config.CLIENT_ID,
      username,
      password,
      grant_type: 'password',
      client_secret: config.CLIENT_SECRET,
    };
    WebService.sendPostDirect(
      this.apiLoginOpenId(),
      { wwwForm: data },
      callback
    );
  }

  static async renewAccessToken(callback) {
    const data = {
      client_id: config.CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: store.getState()?.auth.refreshToken,
      client_secret: config.CLIENT_SECRET,
    };
    WebService.sendPostDirect(
      this.apiLoginOpenId(),
      { wwwForm: data },
      callback
    );
  }

  static getTokenList(callback) {
    WebService.sendGetDirect(this.apiGetTokenList(), {}, callback);
  }

  static getToken(tokenId, callback) {
    WebService.sendGetDirect(this.apiGetToken(tokenId), {}, callback);
  }

  static getWalletInfoByKeyCloak(callback) {
    WebService.sendGetDirect(this.apiGetWalletInfoByKeyCloak(), {}, callback);
  }
}
