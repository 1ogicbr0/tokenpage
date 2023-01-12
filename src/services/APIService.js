import store from "../store/store";
import WebService from "./WebService";

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

  static loginKeyCloak(username, password, callback) {
    const data = {
      client_id: "meveo-web",
      username,
      password,
      grant_type: "password",
      client_secret: "afe07e5a-68cb-4fb0-8b75-5b6053b07dc3",
    };
    WebService.sendPostDirect(
      this.apiLoginOpenId(),
      { wwwForm: data },
      callback
    );
  }

  static async renewAccessToken(callback) {
    const data = {
      client_id: "meveo-web",
      grant_type: "refresh_token",
      refresh_token: store.getState()?.auth.refreshToken,
      client_secret: "afe07e5a-68cb-4fb0-8b75-5b6053b07dc3",
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
}
