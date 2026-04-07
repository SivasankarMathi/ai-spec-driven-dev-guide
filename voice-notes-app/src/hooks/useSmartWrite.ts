import { useState, useCallback } from 'react';
import { enhanceText } from '../services/openRouterApi';

interface SmartWriteHook {
  isEnhancing: boolean;
  enhance: (text: string) => Promise<string | null>;
  revert: () => string | null;
}

export function useSmartWrite(): SmartWriteHook {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [originalText, setOriginalText] = useState<string | null>(null);

  const enhance = useCallback(async (text: string): Promise<string | null> => {
    if (!text.trim()) return null;

    setOriginalText(text);
    setIsEnhancing(true);

    try {
      const result = await enhanceText(text);
      return result;
    } catch (error) {
      console.error('Smart Write enhancement failed:', error);
      setOriginalText(null);
      throw error;
    } finally {
      setIsEnhancing(false);
    }
  }, []);

  const revert = useCallback((): string | null => {
    const text = originalText;
    setOriginalText(null);
    return text;
  }, [originalText]);

  return { isEnhancing, enhance, revert };
}
