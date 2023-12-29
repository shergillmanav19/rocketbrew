import { google } from "googleapis";

export const googleOAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

export const revokeGoogleAccessToken = async function (token: string) {
  return await googleOAuth2Client.revokeToken(token);
};
