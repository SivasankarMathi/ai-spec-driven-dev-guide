export async function enhanceText(text: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const model = import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-4.1';

  if (!apiKey) {
    throw new Error('API key not configured. Please set VITE_OPENROUTER_API_KEY in your .env file.');
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content: 'Rewrite and enhance the following note. Improve clarity, grammar, and structure while preserving the original meaning.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const enhanced = data?.choices?.[0]?.message?.content;

  if (!enhanced) {
    throw new Error('No content returned from OpenRouter API');
  }

  return enhanced.trim();
}
