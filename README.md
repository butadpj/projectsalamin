# Project SALAMIN

Project SALAMIN helps Filipinos examine what they see online, look for evidence, and understand what shapes their beliefs.

The project can take the form of interactive challenges, social content, creator-led activities, learning materials, and community programs. Each activity builds the same habit: apply the same standard of evidence even when a claim supports your side.

## The interactive experience

This repository contains one Project SALAMIN activation: a short political-post challenge. Participants react to four posts across two issues, then compare how they judged each political side.

The app uses a Facebook-inspired interface because many Filipinos encounter political news through Facebook. It does not connect to Facebook, ask for a Facebook login, or post anything to a participant's account.

### Participant flow

1. The participant enters a quick reaction check.
2. The participant chooses whether Leni Robredo or Sara Duterte is closer to their current view.
3. The app shows the presidential and flood-control posts aligned with that side first.
4. The participant locks in a reaction to each post.
5. The app shows the presidential and flood-control posts aligned with the opposing side.
6. Project SALAMIN reveals the two comparisons after the fourth reaction.
7. On that same screen, the participant reflects on all four answers.
8. Inside the mock Facebook feed, the participant completes three SALAMIN CHECK actions directly on the aligned post. Each action shows a finding and locks after completion.
9. The app asks for permission before saving the anonymous response.

We delay the full purpose of the activity until all four reactions are complete. This helps us capture a gut reaction without hiding the fictional nature of the posts or taking data without permission.

### SALAMIN Check

Before believing or sharing a political claim, the participant practices these checks:

1. Tingnan ang profile.
2. Basahin ang comments.
3. Hanapin ang link o dokumento.

The exercise also reminds participants not to rely on one post. They should search for the claim and compare it with other trustworthy sources.

### Current post pairs

The app currently combines two issue pairs:

- Leni Robredo and Sara Duterte using the same presidential-candidacy claim
- Marcos administration blamed for continuing flood-control failures
- Duterte-allied senators blamed for continuing flood-control failures

Every version uses the same page name, engagement counts, and Facebook-style layout. Each issue keeps its own comparison controlled.

Post assets live in [`assets/posts-2-sides`](assets/posts-2-sides).

### Routing

The setup asks which side feels closer to the participant's current political position. The app shows both posts aligned with that side before both opposing posts:

| Answer | Posts 1-2 | Posts 3-4 |
| --- | --- | --- |
| Leni Robredo | Leni candidacy, Duterte-allied senators blamed | Sara candidacy, Marcos administration blamed |
| Sara Duterte | Sara candidacy, Marcos administration blamed | Leni candidacy, Duterte-allied senators blamed |

### Data and consent

The app keeps answers in memory until the final consent screen. Consented responses are sent to the standalone `api-projectsalamin` service and stored in Supabase Postgres.

If the participant agrees, the app stores:

- Selected side
- Four structured reactions, including the post variant and display position
- Reflection answer
- Completion duration
- Experiment version and server creation time

If the participant declines, the app does not store the response. The app does not collect a name, Facebook account, email address, or device identifier.

The frontend never receives Supabase credentials. The API validates the controlled post order, makes retries idempotent, and is the only service allowed to write to Postgres. Before the field pilot, define a retention period and withdrawal process.

## Run locally

Requirements:

- Node.js 20 or newer
- pnpm

Install dependencies and start Vite:

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Create a production build:

```bash
pnpm build
```

Run the linter:

```bash
pnpm lint
```

Preview the production build:

```bash
pnpm preview
```

## Project structure

```text
src/
  App.tsx       Experience flow, routing, post pairs, and response state
  App.css       Facebook-inspired UI and SALAMIN reveal screens
  index.css     Global styles
assets/
  posts-2-sides/  Political image pairs
interview-script.md
pitch-script.md
brainstorm.md
```

## Adding another post pair

1. Add two images under `assets/posts-2-sides/<pair-name>/`.
2. Import both images in `src/App.tsx`.
3. Add the pair to `postPairs` with one shared issue caption and two blame frames.
4. Add a routing rule for the new participant profile.
5. Keep the page, caption, metadata, and engagement counts consistent across both frames.
6. Change only the blame target, headline, and image needed for the comparison.

Use documented or fictional claims. Do not attach a fabricated factual claim to a real person in a public post. Screenshots can leave the app and circulate without the reveal.

## Tech stack

- React 19
- TypeScript
- Vite
- Phosphor Icons
- CSS

## Project documents

- [`interview-script.md`](interview-script.md) contains the original interview flow.
- [`docs/pitch-script.md`](docs/pitch-script.md) contains the hackathon pitch narrative.
- [`docs/archive/brainstorm.md`](docs/archive/brainstorm.md) contains the early project concept.
- [`docs/project-salamin-team-brief.md`](docs/project-salamin-team-brief.md) contains the current project brief.
- [`docs/project-salamin-execution.md`](docs/project-salamin-execution.md) contains the execution plan.
