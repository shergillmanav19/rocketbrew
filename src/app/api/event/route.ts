import * as chrono from "chrono-node";

export async function POST(request: Request) {
  const body = await request.json();
  // send this event to backend, alongisde the user access token from cookies
  // i store the token data in request cookies
  const cookies = request.headers.get("cookie");
  if (!cookies) {
    throw new Error("We're missing cookies!");
  }
  // console.log("cookies", cookies);
  const tokenData = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("tokenData="));
  if (!tokenData) {
    throw new Error("Google access token not found.");
  }

  const google_access_token = tokenData.split("tokenData=")[1];

  const res = chrono.parse(
    body.query,
    {
      instant: new Date(),
      timezone: "PST",
    },
    { forwardDate: true }
  );

  console.log("res", res);
  // start time is needed to schedule an event
  // if not start time then we can return an error
  if (!res.length || !res[0].start) {
    return new Response(
      JSON.stringify({
        redirect: "retry",
        error: "No start time found.",
        event: null,
      }),
      { status: 400 }
    );
  }
  console.log("res[0].start", res[0].start);
  console.log("res[0].end", res[0].end);
  const startTime = res[0].start.date();

  let endTime = res[0].end?.date();

  console.log("startTime", startTime);
  console.log("endTime", endTime);
  // end time is not stated, but there is a start time, so we can assume 1 hour
  if (!endTime) {
    endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
  }

  // make a http call to backend to create an event
  const googleEventResponse = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${google_access_token}`,
      },
      body: JSON.stringify({
        summary: "Event created by Rocketbrew",
        description: "Event created by Rocketbrew",
        start: {
          dateTime: startTime.toISOString(),
        },
        end: {
          dateTime: endTime.toISOString(),
        },
      }),
    }
  );

  // if google event creation fails, then we return an error
  if (!googleEventResponse.ok) {
    return new Response(
      JSON.stringify({
        redirect: "fail",
        error: "Event creation failed.",
        event: null,
      }),
      { status: 400 }
    );
  }

  // if google event creation is successful, then we create an event in our backend
  const googleEventDetails = await googleEventResponse.json();
  console.log("googleEventDetails", googleEventDetails);

  return new Response(
    JSON.stringify({
      redirect: "success",
      error: null,
      event: googleEventDetails,
    })
  );
}
