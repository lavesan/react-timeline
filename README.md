# Timeline Application

A React timeline component that displays and manages timeline items with various features. [Live Demo](https://react-timeline-nu.vercel.app/)

## Features

- Display timeline items with start and end dates
- Automatic lane assignment to prevent overlapping
- Inline name editing (press Enter to save)
- Zoom in/out functionality clicking buttons
- Long-press zoom support
- Items appear in front when hovered or being edited
- Adaptive width for small items during edit

## Installation

```bash
# Install dependencies
yarn
# or
npm i

# Run development server
yarn dev
# or
npm run dev
```

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS

## Project Structure

- `src/database/timelineItems.ts` - Timeline items data
- `src/utils/assignLanes.ts` - Lane assignment logic
- `src/utils/timelineScale.ts` - Timeline scale calculations
- `src/components/` - React components

## What I Did

- Implemented timeline based on data from timelineItems.ts
- Created lane assignment algorithm to prevent overlapping
- Added scale configuration for proper item positioning
- Implemented inline editing with Enter key to save
- Added zoom functionality with long-press support
- Enhanced item visibility during hover/edit states
- Improved input UX by increasing width for small items during edit

## What Could Be Improved

- Use Zustand for state management of timeline items
- Add localStorage or API integration for persistence
- Add zoom in/out with Ctrl + and Ctrl - keyboard buttons
- Consider using an established timeline library for better maintainability (if custom features aren't critical)
- Added the possibility of drag and drop

## How you made your design decisions?

I remembered the Gantt Chart and I created something similar to it, after looking at some images of it at google. I also saw some examples at dribble.

References:

- https://www.google.com/search?sca_esv=84a972cf9bb6250a&sxsrf=AE3TifO4POeuS1WepuMpzq03K8Po6iIP6w:1754585437844&udm=2&fbs=AIIjpHxX5k-tONtMCu8aDeA7E5WMdDwGSuc8eBkl8hX51y2q6-r6qOmgvFs8yhx59bJgnXQRW0CpTUrikAvoMvruBQ5EXrmF0QvB2iHTMAEISsCypY3En_C-6ZXkAOKKYe1VM_dhXYnf8ya_hyfPabPc6QP327DGQLWV8TjlunmFtRazebMKy76TnZ_B5R8iXM68ki5rILWz_k6Lm6YdiHzlDvB-2pOLDQ&q=timeline+applications&sa=X&ved=2ahUKEwiiwYCOlPmOAxUoDbkGHQAIMVcQtKgLegQIFxAB&biw=1821&bih=798&dpr=0.75
- https://dribbble.com/tags/timeline

## How you would test this if you had more time?

Since I'm using Vite, I would use Vitest + @testing-library/react for the unit and component testing and playwright for the e2e testing, just as I used at a template I built other day with these configurations for vite: https://github.com/lavesan/vite-testing-template

## What you like about your implementatio?

I liked my code, that's clean and easy to understand (at least I always try to make it so).
I loved that it worked without bugs (apparently) and is being displayed in a way that I can see the user using my application, understanding how it works and don't having many problems with it. I can see it solving his problem.

## Requirements

- Node.js
- Yarn
