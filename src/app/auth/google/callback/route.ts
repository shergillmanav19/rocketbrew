import { googleOAuth2Client } from "@/lib/google";
import { Cookie } from "next/font/google";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";

export async function GET(request: Request) {
  console.log("request.url", request.url);
  const code = request.url.split("code=")[1];
  const codeValue = code?.split("&")[0];
  console.log("codeValue", codeValue);
  if (codeValue) {
    const { tokens, res } = await googleOAuth2Client.getToken(codeValue);
    console.log("res", res);
    console.log("tokens", tokens);
    if (!tokens) {
      throw new Error("No tokens returned from Google");
    }
    console.log("tokens", tokens);
    if (tokens.access_token && tokens.refresh_token) {
      const tokenData = {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        access_token_expires_in: tokens.expiry_date?.toString() as string,
        refresh_token_expires_in: "",
      };

      cookies().set("tokenData", tokenData.access_token, {
        httpOnly: false,
        secure: true,
        path: "/",
        expires: new Date(tokens.expiry_date as number),
      });

      return permanentRedirect("/");
    }
    return new Response("No tokens returned from Google", { status: 400 });
  }

  return new Response("No code returned from Google", { status: 400 });
}
