This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Introduction 

Welcome to our Google Calendar Event Creator project. This software is an innovative tool designed to help users easily schedule events by just typing text input. It circumvents the need to manually input event details by interfacing directly with Google Calendar and creating events based on user-specified parameters.

## How it works

The core functionality of this application is to intelligently parse user text inputs that specify a time and date for a planned event. For example, if a user inputs, "Let's meet at 4 in 5 days", the software is capable of understanding this, and will automatically schedule an event in your Google Calendar for 4 PM, 5 days from the current date.

The software leverages natural language processing to make sense of the user's desired event date and time. This parsing works with a variety of formats and phrases, providing a flexible and user-friendly experience.

## Getting Started

- The project is deployed at https://rocketbrew.vercel.app

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
