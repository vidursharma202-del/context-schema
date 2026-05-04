# Integration Examples

How to implement the Threadline Context Schema in popular AI frameworks.

## Node.js / TypeScript (vanilla)

```typescript
import { Threadline } from 'threadline-sdk';

const tl = new Threadline({ apiKey: process.env.THREADLINE_API_KEY });

const { injectedPrompt } = await tl.inject(userId, agentId, userMessage);
// injectedPrompt contains the user's context mapped to the schema
// Pass as system prompt to any LLM

await tl.update({ userId, userMessage, agentResponse });
// Extracts new facts and stores them across the 7 scopes
```

## LangChain (TypeScript)

```typescript
import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { Threadline } from 'threadline-sdk';

const tl = new Threadline({ apiKey: process.env.THREADLINE_API_KEY });
const llm = new ChatOpenAI({ model: 'gpt-4o' });

const { injectedPrompt } = await tl.inject(userId, agentId, userMessage);

const response = await llm.invoke([
  new SystemMessage(injectedPrompt),
  new HumanMessage(userMessage)
]);

await tl.update({ userId, userMessage, agentResponse: response.content });
```

## Vercel AI SDK

```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { Threadline } from 'threadline-sdk';

const tl = new Threadline({ apiKey: process.env.THREADLINE_API_KEY });

const { injectedPrompt } = await tl.inject(userId, agentId, userMessage);

const result = await streamText({
  model: openai('gpt-4o'),
  system: injectedPrompt,
  messages,
  onFinish: async ({ text }) => {
    await tl.update({ userId, userMessage, agentResponse: text });
  }
});
```

## OpenAI SDK (Python)

```python
import openai
import requests

THREADLINE_API_KEY = "your_key"
HEADERS = {"Authorization": f"Bearer {THREADLINE_API_KEY}"}

# Inject
res = requests.post("https://api.threadline.to/api/inject", headers=HEADERS, json={
    "userId": user_id,
    "agentId": agent_id,
    "userMessage": user_message
})
injected_prompt = res.json()["injectedPrompt"]

# LLM call
client = openai.OpenAI()
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": injected_prompt},
        {"role": "user", "content": user_message}
    ]
)
agent_response = response.choices[0].message.content

# Update
requests.post("https://api.threadline.to/api/update", headers=HEADERS, json={
    "userId": user_id,
    "userMessage": user_message,
    "agentResponse": agent_response
})
```

## Anthropic SDK (TypeScript)

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { Threadline } from 'threadline-sdk';

const anthropic = new Anthropic();
const tl = new Threadline({ apiKey: process.env.THREADLINE_API_KEY });

const { injectedPrompt } = await tl.inject(userId, agentId, userMessage);

const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  system: injectedPrompt,
  messages: [{ role: 'user', content: userMessage }]
});

await tl.update({
  userId,
  userMessage,
  agentResponse: response.content[0].text
});
```

## REST API (any language)

```bash
# 1. Inject — get enriched system prompt
curl -X POST https://api.threadline.to/api/inject \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"userId": "user_123", "agentId": "agent_abc", "userMessage": "Hello"}'

# 2. Update — store new facts after response
curl -X POST https://api.threadline.to/api/update \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"userId": "user_123", "userMessage": "...", "agentResponse": "..."}'
```

## Reference implementation

[Threadline](https://threadline.to) is the canonical implementation — managed cloud,
OAuth-style grants, audit trail, user dashboard, free tier.

Docs: [threadline.to/docs](https://threadline.to/docs)
