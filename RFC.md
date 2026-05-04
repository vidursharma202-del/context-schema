# RFC: Threadline Context Schema v1.0

## Status
Draft — open for community feedback

## Motivation

AI agent memory implementations are fragmented. LangChain's ConversationBufferMemory,
OpenAI's native memory, Mem0, Supermemory, and dozens of custom Redis implementations
all store user context differently. A developer switching frameworks loses all user context.
A user can't take their data from one agent to another.

This RFC proposes a minimal, typed schema that any agent framework can implement,
any memory provider can store, and any user can export.

## Why 7 scopes, not more or fewer

**Why not a flat list of facts?**
Flat facts have no governance surface. You can't grant an agent access to "goals" but not
"relationships" if everything lives in one unstructured blob. Scopes make grants possible.

**Why not more granular (20+ scopes)?**
Diminishing returns. After extensive testing, facts extracted from real conversations
cluster into these 7 categories with >95% coverage. Additional scopes create implementation
complexity without meaningful precision gain.

**Why not fewer (3-4 scopes)?**
Too coarse for meaningful governance. "preferences" and "communication_style" feel similar
but serve different agent behaviours — preferences govern what the agent does,
communication_style governs how it speaks.

## Why user-owned grants are part of the spec

Memory without governance is surveillance. If users can't see what an agent knows about
them, can't revoke access by scope, and can't hard-delete their data, the memory
layer is a liability — legally (GDPR, EU AI Act) and reputationally.

Grants are part of this spec, not an optional addon.

## Why arrays of strings, not structured objects

Simplicity beats expressiveness at the schema layer. A memory system that stores
`"5 years TypeScript"` as a plain string is implementable by any language, any
database, any framework. Structured objects (with confidence scores, timestamps,
source references) belong in the implementation layer, not the schema.

## Intentional omissions

**emotional_state** was considered and rejected. Inferring emotional state from
conversation is sensitive personal data under GDPR Article 9. Storing it creates
legal risk without proportionate value. Explicitly stated urgency ("I have a deadline
today") belongs in `general` or `history` if relevant.

**timestamps per fact** were considered and rejected from the schema layer.
Implementations should track these internally, but exposing them in the schema
creates complexity for simple implementations without meaningful benefit.

## Versioning

This is v1.0. Breaking changes (removing or renaming scopes) will increment the major
version. Additive changes (new optional scopes) will increment the minor version.
Implementations should handle unknown scopes gracefully by ignoring them.

## Open questions

1. Should `history` have a maximum length recommendation? Current thinking: no —
   implementations should handle truncation based on their token budget.
2. Should grants have a standard expiry format? Current proposal: ISO 8601 optional
   `expiresAt` field.
3. Should there be a standard for cross-provider context portability (export format)?
   Likely yes — proposed for v1.1.

## Feedback

Open an issue or PR at github.com/vidursharma202-del/context-schema
