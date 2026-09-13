import { initBotId } from 'botid/client/core';

initBotId({
  protect: [
    {
      path: '/api/on-degerlendirme',
      method: 'POST',
      advancedOptions: { checkLevel: 'basic' },
    },
  ],
});
