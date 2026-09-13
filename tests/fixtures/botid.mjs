export const botState = { mode: 'human' };
export async function checkBotId(options) {
  if (options?.advancedOptions?.checkLevel !== 'basic')
    throw new Error('Expected basic protection');
  if (botState.mode === 'error') throw new Error('Verification unavailable');
  return { isBot: botState.mode === 'bot', isHuman: botState.mode === 'human' };
}
