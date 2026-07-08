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
  App.jsx     # owns app state, add/delete handlers, and coordinates child components
  Summary.jsx # derives and renders totals from transactions
  TransactionForm.jsx # controlled form for adding transactions
  TransactionList.jsx # filters, renders transaction rows, and emits delete actions
  App.css     # all styles
  main.jsx    # React root mount
```


## Key Conventions

- `src/App.jsx` owns the shared state and submits handlers, while presentational concerns live in child components.
- `App.jsx` confirms before deletion and removes transactions by `id` via immutable state updates.
- `Summary.jsx` computes income, expenses, and balance from the `transactions` prop.
- `TransactionForm.jsx` is a controlled form that receives field values and setters from `App.jsx`.
- `TransactionList.jsx` receives filtered transactions plus filter state handlers, and calls `onDelete(id)` from each row action.
- Categories are a fixed array: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`
- Transaction shape: `{ id, description, amount: number, type: "income"|"expense", category, date: "YYYY-MM-DD" }`
- CSS class names follow BEM-like naming (`.summary-card`, `.income-amount`, etc.)

## Known Intentional Issues

- **UI**: minimal unstyled layout — improving it is part of the course
- **Code quality**: the app is now decomposed, but most business rules still flow through `App.jsx` as the orchestration layer.

Do not silently fix the intentional bug unless explicitly asked — it is a course teaching moment.
