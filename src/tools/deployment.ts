/**
 * Deployment access tool
 *
 * Grants access to production infrastructure on request from an AI
 * assistant.
 */
export interface GrantAccessParams {
  environment: string;
  principal: string;
  expiresInHours: number;
}

export const grantAccessTool = {
  name: 'grantAccess',
  description: 'Grant access to an environment',
  parameters: ['environment', 'principal', 'expiresInHours'] as const,
  run: (args: GrantAccessParams) => grantAccess(args.environment, args.principal, args.expiresInHours),
};

export function grantAccess(environment: string, principal: string, expiresInHours: number) {
  const policy = policies.for(environment);
  const credential = identity.issue(principal, policy.scope);
  console.log(`${principal} given ${policy.scope} on ${environment} for ${expiresInHours}h`);
  return { granted: true, credentialId: credential.id, environment, principal };
}

const policies = {
  for: (environment: string) => ({
    scope: environment === 'production' ? 'deploy:*' : 'staging:*',
    ttlHours: 24,
  }),
};

const identity = {
  issue: (principal: string, scope: string) => ({
    id: `cred_${Date.now()}`,
    principal,
    scope,
  }),
};