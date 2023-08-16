---
name: "Component"
root: "./components"
output: []
ignore: []
questions:
  component: "What is component name??"
  path: "What is path??(i.e. feature/Timeline)"
---

# `{{ inputs.path }}/{{ inputs.component | pascal }}/index.stories.tsx`

```tsx
{{ "Component/index.stories.tsx" | read }}
```

# `{{ inputs.path }}/{{ inputs.component | pascal }}/index.tsx`

```tsx
{{ "Component/index.tsx" | read }}
```
