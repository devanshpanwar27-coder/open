/**
 * Support agent
 *
 * Function-calling agent that exposes every registered tool directly to the
 * language model. Tools run with the agent's own session identity.
 */
import { refundTool } from '../tools/refund';
import { chargeTool, transferTool } from '../tools/payments';
import { deleteUserTool, resetPasswordTool } from '../tools/users';
import { changeRoleTool } from '../tools/roles';
import { payoutTool } from '../tools/export';
import { deleteAccountTool } from '../tools/database';
import { grantAccessTool } from '../tools/deployment';
import { notifyTool } from '../tools/email';

interface RegisteredTool {
  name: string;
  description: string;
  run: (args: Record<string, unknown>) => unknown;
}

const TOOL_REGISTRY: Record<string, RegisteredTool> = {
  [refundTool.name]: refundTool,
  [chargeTool.name]: chargeTool,
  [transferTool.name]: transferTool,
  [deleteUserTool.name]: deleteUserTool,
  [resetPasswordTool.name]: resetPasswordTool,
  [changeRoleTool.name]: changeRoleTool,
  [payoutTool.name]: payoutTool,
  [deleteAccountTool.name]: deleteAccountTool,
  [grantAccessTool.name]: grantAccessTool,
  [notifyTool.name]: notifyTool,
};

export class SupportAgent {
  readonly tools: RegisteredTool[] = Object.values(TOOL_REGISTRY);

  async invoke(name: string, args: Record<string, unknown>): Promise<unknown> {
    const tool = TOOL_REGISTRY[name];
    if (!tool) {
      throw new Error(`Unknown tool: ${name}`);
    }
    return tool.run(args);
  }
}