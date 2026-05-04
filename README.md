# Threadline Context Schema

An open specification for AI agent context — structured, user-owned, and portable across models, frameworks, and products.

## The problem

Every AI agent memory implementation uses a different schema. Context built in LangChain can't move to Vercel AI SDK. Memory stored by one model can't be read by another. Developers reinvent the same extraction logic repeatedly, with no standard for what "user context" actually means.

## The solution

A single, typed schema for the seven categories of context that matter for AI agents. Model-agnostic. Framework-agnostic. User-owned by design.

## The 7 scopes

| Scope | What it captures | Example |
|---|---|---|
| `preferences` | Working style, tools, format preferences | "No code examples unless asked" |
| `goals` | Active projects, objectives | "Launching a SaaS product targeting developers" |
| `knowledge` | Tech stack, expertise, background | "5 years TypeScript, Next.js, Supabase" |
| `history` | Past session decisions and progress | "Last session: deployed to Cloudflare Workers" |
| `relationships` | Team members, clients, collaborators | "Co-founder Sarah handles design" |
| `communication_style` | Tone, verbosity, format | "Prefers concise, bullet-point answers" |
| `general` | Core identity and context | "Vidur, Delhi, pre-revenue founder" |

## Why a standard matters

- Developers can switch models without losing user context
- Frameworks can implement a shared adapter interface
- Users can export their context and take it anywhere
- Governance (grants, audit trails, deletion) becomes interoperable

## Quickstart

Install the TypeScript types:

```bash
npm install @threadline/context-schema
```

Validate a context object:

```typescript
import { ThreadlineContext, validateContext } from '@threadline/context-schema';

const context: ThreadlineContext = {
  preferences: ["No code examples unless asked", "Prefers dark mode"],
  goals: ["Launch SaaS product by Q3"],
  knowledge: ["TypeScript", "Next.js", "Supabase"],
  history: ["Deployed to Vercel on 2026-04-15"],
  relationships: ["Co-founder: Sarah (design)"],
  communication_style: ["Concise", "Bullet points preferred"],
  general: ["Based in Delhi", "Pre-revenue founder"]
};

validateContext(context); // throws if invalid
```

## Reference implementation

[Threadline](https://threadline.to) is the reference implementation of this schema — a persistent context layer for AI agents with OAuth-style scoped grants, full audit trail, and user-owned data.

## Files

- `schema.json` — JSON Schema for validation
- `types.ts` — TypeScript type definitions
- `RFC.md` — Design rationale and decisions
- `INTEGRATIONS.md` — Framework integration examples

## Contributing

This is an open specification. PRs welcome for:
- New framework integration examples
- Schema refinements with rationale
- Translation of RFC to other languages

## License

MIT — use freely, no attribution required.
