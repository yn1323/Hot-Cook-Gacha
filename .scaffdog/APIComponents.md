---
name: "API Component"
root: "./app/_components"
output: []
ignore: []
questions:
  component: "What is component name??"
  path: "What is path??(i.e. feature/Timeline)"
---

# `{{ inputs.path }}/{{ inputs.component | pascal }}/index.stories.tsx`

```tsx
{{ "APIComponent/index.stories.tsx" | read }}
```

# `{{ inputs.path }}/{{ inputs.component | pascal }}/index.tsx`

```tsx
{{ "APIComponent/index.tsx" | read }}
```
