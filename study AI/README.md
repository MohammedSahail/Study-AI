# StudyMate AI — hackathon prototype

A small, responsive study dashboard built with plain HTML, CSS and JavaScript. No build step, account, API key, or install is needed.

## Run it

Open `index.html` in a modern browser, or serve this folder locally:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## What works

- Create a suggested daily plan and check off tasks.
- Add your own tasks for the current visit.
- Start, pause, resume, and reset a 25-minute focus timer.
- Answer a three-question sample quiz with explanations.
- Pick a study-buddy prompt and hear its sample response using the browser's speech feature when available.
- Responsive layout for desktop and mobile.

The study-buddy replies and plan are predefined demo content. Task changes are held in the page and are not saved after refresh. Speech playback uses browser text-to-speech. **This prototype does not connect to Alexa+, Alexa devices, or an AI service.** Do not describe those integrations as implemented in the submission.

## Deploy free as a static site

### Netlify Drop (quickest)

1. Open [Netlify Drop](https://app.netlify.com/drop) and sign in.
2. Drag the `studymate-ai` folder onto the page.
3. Wait for the upload to finish, then open the generated `https://…netlify.app` URL and check the planner, quiz, and timer.
4. Keep that public URL for the Devpost **Try it out** link.

### GitHub Pages

1. Create a public GitHub repository (for example, `studymate-ai`).
2. Upload the contents of this folder to the repository root and commit them to `main`.
3. In the repository, choose **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
4. After GitHub Pages publishes the site, use the displayed `https://<username>.github.io/<repository>/` URL as the demo link.

No compilation or server-side configuration is required. Google Fonts are loaded from their hosted stylesheet when online; system fonts are used if they cannot be reached.

## Devpost submission checklist

Based on the provided screenshots, the project is titled **StudyMate AI: Your Intelligent Student Assistant** and is being entered in **Build Ship Shape — Amazon Developer Hackathon**.

- **Try it out links:** add the deployed public demo URL. Add a public source repository URL as a second link if you upload the code to GitHub.
- **Built with:** `HTML, CSS, JavaScript, Netlify` (or `GitHub Pages`, depending on where you deploy). Only add Amazon Alexa/Alexa+ if you later build and verify an actual integration.
- **Project media:** add 2–4 screenshots: the full dashboard, the generated plan / checked tasks, the quiz feedback, and the focus timer running. Capture the deployed site at desktop size and optionally one mobile view. Crop out browser tabs, account details, and unrelated desktop content.
- **Demo video:** optional, but a 30–60 second screen recording showing those interactions helps reviewers. Host it somewhere reviewers can open without requesting access, then link it in the media/video field if available.
- **Try each interaction once on the public deployment** before submitting. Make sure the demo URL opens in a private/incognito window.

The reference screenshots show the Devpost fields for the project name, a 200-character elevator pitch, project description, built-with tags, try-it-out links, and project media. The exact final form may include additional fields.

### Optional elevator pitch (under 200 characters)

> A calm study dashboard that turns a busy day into small wins with a flexible study plan, focus timer, quick quiz, and browser voice readout.

### Suggested project description

> StudyMate AI is a student-focused study dashboard prototype designed to make it easier to get started. Students can shape a simple daily plan, track completed tasks, focus with a 25-minute timer, and reinforce learning with a short quiz. A friendly study-buddy panel offers sample encouragement and planning prompts, with an optional browser-based voice readout.
>
> We built this responsive prototype with HTML, CSS, and JavaScript so it can be tried without an account or API key. The plan suggestions and study-buddy replies are predefined demo content, and task changes last only for the current visit. Voice readout uses browser speech synthesis where supported. Alexa+ and Alexa devices are not integrated in this version.

## Files

- `index.html` — page structure and content
- `styles.css` — responsive visual design
- `app.js` — interactions and sample study content
