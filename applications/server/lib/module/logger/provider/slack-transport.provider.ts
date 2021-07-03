import { Provider } from "cheeket";
import winston from "winston";
import SlackHook from "winston-slack-webhook-transport";

function slackTransportProvider(
  options: SlackHook.SlackHookOptions
): Provider<winston.transport> {
  return () => new SlackHook(options);
}

export default slackTransportProvider;
