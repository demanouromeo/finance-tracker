---
name: deploy
description: "Deploy the app. Use when deploying, shipping to staging, releasing builds, or preparing a production deploy. Always run tests first, then build the production bundle, then push artifacts to the staging area."
argument-hint: "Deploy the current app"
---

# Deploy

## When to Use

- Deploying the application to staging or another deployment target
- Preparing a release build for validation
- Shipping a change after code updates are complete

## Procedure

1. Run the full test suite first.
2. Build the production bundle.
3. Push the built output to the staging area.
4. Report any test failures or build issues before retrying deployment.

## Rules

- Do not skip tests before deployment.
- Do not push to staging if tests or the production build fail.
- Use the project’s existing build and deploy commands when available.
