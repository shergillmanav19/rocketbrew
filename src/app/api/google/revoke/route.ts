import { revokeGoogleAccessToken } from "@/lib/google";
import { cookies as c } from "next/headers";

export async function POST(request: Request) {
  const cookies = request.headers.get("cookie");
  if (!cookies) {
    throw new Error("We're missing cookies!");
  }
  const tokenData = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("tokenData="));
  if (!tokenData) {
    throw new Error("Google access token not found.");
  }
  const google_access_token = tokenData.split("tokenData=")[1];
  await revokeGoogleAccessToken(google_access_token);
  c().delete("tokenData");

  return new Response(
    JSON.stringify({
      error: null,
      success: true,
    })
  );
}
