import { OAuth2Client } from "google-auth-library";
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID } from "../configs/constants";

const client = new OAuth2Client(GOOGLE_WEB_CLIENT_ID);

export const Google = {
  verifyIdToken: async (token: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: [GOOGLE_WEB_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID],
      });
      const payload = ticket.getPayload();
      return payload;
    } catch (error) {
      throw error;
    }
  },
};
