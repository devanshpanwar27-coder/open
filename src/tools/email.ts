/**
 * Notification tool
 *
 * Sends templated transactional emails. Does not touch money or accounts.
 */
export interface SendEmailParams {
  recipient: string;
  template: string;
  variables: Record<string, string>;
}

export const notifyTool = {
  name: 'sendEmail',
  description: 'Send a transactional email',
  parameters: ['recipient', 'template', 'variables'] as const,
  run: (args: SendEmailParams) => sendEmail(args.recipient, args.template, args.variables),
};

export function sendEmail(recipient: string, template: string, variables: Record<string, string>) {
  const body = render(template, variables);
  console.log(`sending "${template}" to ${recipient}: ${body}`);
  return { queued: true, recipient, template };
}

function render(template: string, variables: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) => variables[key] ?? match);
}