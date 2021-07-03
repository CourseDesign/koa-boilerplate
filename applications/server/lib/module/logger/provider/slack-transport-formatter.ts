import { SlackHookOptions } from "winston-slack-webhook-transport";

const slackTransportFormatter: SlackHookOptions["formatter"] = (info) => ({
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `${info.method} ${info.url}`,
        emoji: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "plain_text",
          text: info.message,
          emoji: true,
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `\`\`\`${info.stack}\`\`\``,
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "context",
      elements: [
        {
          type: "plain_text",
          text: `ip: ${info.ip}\nrequest id: ${info.requestId}`,
        },
      ],
    },
    {
      type: "divider",
    },
  ],
});

export default slackTransportFormatter;
