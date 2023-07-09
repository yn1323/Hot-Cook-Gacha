---
name: "Page"
root: "./app"
output: []
ignore: []
questions:
  component: "What is Page name??"
  path: "What is path??(i.e. feature/Timeline)"
---


# `{{ inputs.path }}/{{ inputs.component | camel }}/page.tsx`

```tsx
{{ "Page/page.tsx" | read }}
```
