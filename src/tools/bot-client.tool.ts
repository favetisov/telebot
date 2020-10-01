const fetch = require('node-fetch');

/**
 * Native bot call
 * @param method
 * @param params
 */
export const nativeBotCall = async (botToken: string, method: string, params: Record<string, any>) => {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json' },
  });
  const resp = await response.json();
  return resp;
};
