This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- The project is deployed at https://rocketbrew.vercel.app
- I have linked a demo as well

# Things I tried

- Experimented with OpenAI calls to extract event start, end, and the event object to be sent to Google API. Though functional, it required significant fine-tuning to meet the required standards.
- Initially attempted to use Supabase auth and DB to store user's Google auth sessions. Later decided to store auth in cookies to prioritize speed and addressing core problems.
- Explored various Python packages without much success.

# Things I left out due to time constraint

- Absence of timezone checks.
- No inclusion of recurring events.
- No reminders.
- Scraped FastAPI Python backend, resorting to NextJS server functions to increase speed.

# Project Details

- Connection to Google Calendar API.
- Storing an access token in cookies.
- A text area for users to input queries.
- Depending on the returned result, you will be redirected to one of three pages: success, fail, or retry.
- Viewing of the Google Calendar invite upon success.
- Chrono Parser: An NLP for date parsing made in JS. Chose this due to promising reviews and use cases related to this problem.

# Overall Reflection

An intriguing problem which was enjoyable to work on, despite the room for future enhancements. Witnessing a real use-case made the project exciting!

# Future Improvements

Given more time, certain changes could enhance the project:

- A combination of OpenAI and Chrono to parse the desired output object.
- Dedicate time to discover other NLP date parsers and explore established solutions.
- Improve frontend UI/UX
- Use database to store user's past queries and such.
