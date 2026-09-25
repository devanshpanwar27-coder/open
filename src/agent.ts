import { SupportAgent } from './workflows/support-agent';

async function main() {
  const agent = new SupportAgent();
  const result = await agent.invoke('refund', {
    orderId: 'ord_42',
    amount: 9900,
    reason: 'late shipment',
  });
  console.log(result);
}

main().catch(console.error);