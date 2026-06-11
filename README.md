# CallPilot

**CallPilot** is an AI-powered call checklist assistant that helps users prepare for unfamiliar phone calls, stay organized during the call, and review what was completed afterward.

It is designed for people who feel anxious or uncertain when making calls about appointments, applications, refunds, events, or other unfamiliar situations.

## Overview

CallPilot turns a short description of a call situation into a practical checklist. Users can edit the checklist before calling, use it during the call, and save the result as a call record.

The goal is to support **one-call completion**: helping users complete as many important tasks as possible in a single phone call.

## Features

* **AI checklist generation** using Gemini API
* **Fallback templates** when AI generation is unavailable
* **Draft editing** with add, delete, and drag-and-drop reorder
* **Ready-to-call guidance** before entering call mode
* **Live call mode** with completion tracking
* **Progress indicator** with completed item count and progress bar
* **Post-call review** for completed and unresolved items
* **Call history** for saved call records
* **Confirmation dialogs** for destructive or important actions
* **Mobile-first UI** with bottom navigation

## User Flow

```text
Describe call situation
→ Generate checklist
→ Edit draft
→ Start call mode
→ Check items during the call
→ Review completed/unresolved items
→ Save to history
```

## Tech Stack

* Vite
* React
* React Router
* Gemini API
* lucide-react
* dnd-kit
* localStorage

## Project Structure

```text
src/
├── assets/
├── components/
├── constants/
├── layouts/
├── pages/
├── services/
├── App.css
├── App.jsx
└── main.jsx
```

## Data Storage

This prototype uses `localStorage` for persistence.

Main storage keys:

```text
one-call-drafts
one-call-history
```

Drafts are used for checklists that have not been completed yet.
History records are used for saved call results.

## Environment Variables

To enable Gemini API generation, create a `.env.local` file in the project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Do not commit `.env.local` to GitHub.

You can provide a safe example file:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

This project can be deployed to Vercel.

Add the following environment variable in Vercel Project Settings:

```text
VITE_GEMINI_API_KEY
```

Note: This prototype calls Gemini directly from the frontend. This is acceptable for demos and course prototypes, but a production app should use a backend or serverless function to protect the API key.

## Current Limitations

* The app does not place phone calls directly.
* Users manually mark checklist items as completed.
* Call audio is not recorded or transcribed.
* Data is stored locally in the browser.
* Gemini API calls are currently handled on the frontend.

## Future Improvements

* Serverless Gemini API proxy
* AI fallback notice in the UI
* Optional post-call notes
* Undo for deleted drafts or records
* More checklist templates
* Accessibility testing
* Multilingual checklist generation

## About

CallPilot was built as a Human-Computer Interaction prototype exploring how AI can support users before, during, and after unfamiliar phone calls.
