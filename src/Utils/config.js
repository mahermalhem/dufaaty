import Config from "react-native-config";

const API_CONFIG = {
  token: Config.TOKEN,
  TOKEN_KEY: "@token_Key",
  //apiTimeout: 1000,
  v2_url: Config.V2_URL,
  defaultApiUrl: Config.DEFAULT_ROOT_URL_DEV,
  // defaultApiUrl:Config.NEW_STAGING_URL,
  contantApiUrl: Config.CONTENT,
  contantV2ApiUrl: Config.CONTENT_V2,
  uploaderApiUrl: Config.UPLOADER_URL,
  uploaderSecret: Config.UPLOADER_SECRET,
};

export { API_CONFIG };