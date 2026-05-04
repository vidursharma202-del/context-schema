/**
 * Threadline Context Schema — TypeScript types
 * Open specification for AI agent user context
 * https://github.com/vidursharma202-del/context-schema
 */

export type Scope =
  | 'preferences'
  | 'goals'
  | 'knowledge'
  | 'history'
  | 'relationships'
  | 'communication_style'
  | 'general';

export const SCOPES: Scope[] = [
  'preferences',
  'goals',
  'knowledge',
  'history',
  'relationships',
  'communication_style',
  'general',
];

export type ThreadlineContext = {
  [K in Scope]?: string[];
};

export type ScopedGrant = {
  agentId: string;
  userId: string;
  scopes: Scope[];
  grantedAt: string; // ISO 8601
  expiresAt?: string; // ISO 8601, optional
};

export type AuditEntry = {
  userId: string;
  agentId: string;
  action: 'inject' | 'update' | 'delete' | 'grant' | 'revoke';
  scopes: Scope[];
  timestamp: string; // ISO 8601
};

/**
 * Validates a context object against the schema.
 * Throws if any scope contains non-string values.
 */
export function validateContext(context: ThreadlineContext): void {
  for (const scope of SCOPES) {
    const value = context[scope];
    if (value === undefined) continue;
    if (!Array.isArray(value)) {
      throw new Error(`Scope "${scope}" must be an array of strings`);
    }
    for (const item of value) {
      if (typeof item !== 'string') {
        throw new Error(`Scope "${scope}" must contain only strings`);
      }
    }
  }
}

/**
 * Returns an empty context object with all scopes initialised.
 */
export function emptyContext(): Required<ThreadlineContext> {
  return {
    preferences: [],
    goals: [],
    knowledge: [],
    history: [],
    relationships: [],
    communication_style: [],
    general: [],
  };
}
