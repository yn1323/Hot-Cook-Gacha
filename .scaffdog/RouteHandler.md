---
name: "RouteHandler"
root: "./app"
output: []
ignore: []
questions:
  component: "What is Route name(or mainly controls)??"
  path: "What is path begins after app ??(i.e. (auth)/Users/[userId])"
---


# `{{ inputs.path }}/route.ts`

```tsx
{{ "RouteHandler/route.tsx" | read }}
```
