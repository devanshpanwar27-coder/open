import { SupportAgent } from './workflows/support-agent';

async function main() {
  const agent = new SupportAgent();
  await agent.initialize();
  console.log('Agent initialized');
}

main().catch(console.error);