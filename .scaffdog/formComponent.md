---
name: "FormComponent"
root: "./components"
output: []
ignore: []
questions:
  component: "What is component name??"
  name: "What is form name ??"
  path: "What is path??(i.e. feature/Timeline)"
---

# `{{ inputs.path }}/{{ inputs.component | pascal }}/index.stories.tsx`

```tsx
{{ "FormComponent/index.stories.tsx" | read }}
```

# `{{ inputs.path }}/{{ inputs.component | pascal }}/index.tsx`

```tsx
{{ "FormComponent/index.tsx" | read }}
```
