export interface EmailOptions {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string }> {
  console.log(`Sending email to ${options.to}: ${options.subject}`);
  return { success: true, messageId: `msg_${Date.now()}` };
}