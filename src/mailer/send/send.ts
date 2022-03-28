import nodemailer from "nodemailer";
import { Auth } from "googleapis";
import { Content } from "types/generated";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface Email {
  to: string;
  content: Partial<Content>;
}

export const Send = async (
  email: Email
): Promise<SMTPTransport.SentMessageInfo> => {
  const credentials = {
    clientId: process.env.MAILER_CLIENT_ID,
    clientSecret: process.env.MAILER_CLIENT_SECRET,
    refreshToken: process.env.MAILER_REFRESH_TOKEN,
    OAUTH_PLAYGROUND: "https://developers.google.com/oauthplayground",
    user: process.env.MAILER_USER,
    businessName: process.env.BUSINESS_NAME,
  };

  try {
    const oauth2Client = new Auth.OAuth2Client(
      credentials.clientId,
      credentials.clientSecret,
      credentials.OAUTH_PLAYGROUND
    );

    oauth2Client.setCredentials({
      refresh_token: credentials.refreshToken,
    });

    const accessToken = await oauth2Client.getAccessToken();

    if (!accessToken || !accessToken.token) {
      throw new Error("Access token missing.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: credentials.user,
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
        refreshToken: credentials.refreshToken,
        accessToken: accessToken.token,
      },
    });

    const info = await transporter.sendMail({
      from: `${credentials.businessName} <${credentials.user}>`,
      to: email.to,
      subject: email.content.subject,
      text: email.content.plainText,
      html: email.content.html,
    });

    return info;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
