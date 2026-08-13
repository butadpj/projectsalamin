# Project SALAMIN

Project SALAMIN helps Filipinos examine what they see online, look for evidence, and understand what shapes their beliefs.

The project can take the form of interactive challenges, social content, creator-led activities, learning materials, and community programs. Each activity builds the same habit: apply the same standard of evidence even when a claim supports your side.

## The interactive experience

This repository contains one Project SALAMIN activation: a one-minute political-post challenge. Participants react to two posts, then see how the person or group in an image may affect their judgment of the same claim.

The app uses a Facebook-inspired interface because many Filipinos encounter political news through Facebook. It does not connect to Facebook, ask for a Facebook login, or post anything to a participant's account.

### Participant flow

1. The participant enters a quick reaction check.
2. One setup question helps the app choose a relevant political pair.
3. The app shows the post that matches the participant's answer first.
4. The participant locks in a reaction.
5. The app shows the same claim using an opposing or neutral image.
6. After the second reaction, Project SALAMIN reveals the comparison.
7. The participant reflects on both answers and learns the SALAMIN Check.
8. The app asks for permission before saving the anonymous response.

We delay the full purpose of the activity until both reactions are complete. This helps us capture a gut reaction without hiding the fictional nature of the posts or taking data without permission.

### SALAMIN Check

Before believing or sharing a political claim, ask:

1. Sino ang original source?
2. Ano ang patunay?
3. May kulang bang context?
4. Pareho ba ang tanong ko kung ibang panig ang nag-post?

### Current post pairs

The app currently includes four image pairs:

- Bongbong Marcos and Leni Robredo
- Leni Robredo and Sara Duterte
- INC-aligned and non-aligned public gatherings
- Neutral and BBM-linked flood-control coverage

Each pair uses the same page name, caption, headline, engagement counts, and Facebook-style layout. The image provides the political cue. Names appear only during the reveal.

Post assets live in [`assets/posts-2-sides`](assets/posts-2-sides).

### Routing

The setup question asks which option feels closest to the participant's current political position. The answer selects a pair and decides which image appears first:

| Answer | Pair | First image |
| --- | --- | --- |
| Bongbong Marcos | BBM vs Leni | BBM |
| Leni Robredo | BBM vs Leni or Leni vs Sara | Leni |
| Sara Duterte | Leni vs Sara | Sara |
| Religious-group endorsements | INC vs neutral | INC-aligned |
| Independent | Neutral vs BBM flood control | Neutral |
| Secret muna | Random pair | Random order |

### Data and consent

The current demo has no server or database. It keeps answers in memory until the final consent screen.

If the participant agrees, the app stores this information in the browser under `salamin-responses`:

- Routing answer
- Selected post pair
- Post order
- Two reactions
- Reflection answer
- Completion time

If the participant declines, the app does not store the response. The app does not collect a name, Facebook account, email address, or device identifier.

`localStorage` is suitable for the demo. A field pilot will need a secure data endpoint, a retention policy, and a way for participants to withdraw their responses.

## Run locally

Requirements:

- Node.js 20 or newer
- pnpm

Install dependencies and start Vite:

```bash
pnpm install
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
3. Add the pair to `postPairs` with one shared caption and headline.
4. Add a routing rule for the new participant profile.
5. Check that both versions use the same crop, text, metadata, and engagement counts.
6. Keep names and political labels out of the pre-reveal caption and headline.

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
