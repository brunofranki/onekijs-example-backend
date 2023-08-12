export type Idp = {
  clientId: string;
  clientSecret: string;
  tokenEndpoint: string;
  userinfoEndpoint: string;
  access_token?: string;
}