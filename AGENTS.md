# Expense Tracker — Agent Instructions

Starter project for the [Claude Code course by Mosh](https://codewithmosh.com/p/claude-code).  
A React expense tracker intentionally shipped with a bug, poor UI, and messy code — fixed progressively through the course.

## Stack

- **React 19** with functional components and hooks (`useState`)
- **Vite 7** as the dev/build tool
- **Plain CSS** — no component library, no Tailwind, no CSS-in-JS
- No TypeScript — all files are `.jsx` / `.js`

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server → http://localhost:5173
npm run build      # production build
npm run lint       # ESLint
```

## Project Structure

```
src/
  App.jsx     # single monolithic component — all state and UI lives here
  App.css     # all styles
  main.jsx    # React root mount
```

## Key Conventions

- All application logic and state is in `src/App.jsx` (no sub-components yet — decomposing it is part of the course)
- Categories are a fixed array: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`
- Transaction shape: `{ id, description, amount, type: "income"|"expense", category, date: "YYYY-MM-DD" }`
- CSS class names follow BEM-like naming (`.summary-card`, `.income-amount`, etc.)

## Known Intentional Issues

- **Bug**: `amount` is stored as a string, so `reduce((sum, t) => sum + t.amount, 0)` concatenates instead of summing — balance/totals are wrong
- **UI**: minimal unstyled layout — improving it is part of the course
- **Code quality**: no component decomposition, mixed concerns in `App.jsx`

Do not silently fix the intentional bug unless explicitly asked — it is a course teaching moment.
