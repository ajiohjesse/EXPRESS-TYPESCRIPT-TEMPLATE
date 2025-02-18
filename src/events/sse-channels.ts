import { createChannel } from 'better-sse';

const ticker = createChannel();

export { ticker };
