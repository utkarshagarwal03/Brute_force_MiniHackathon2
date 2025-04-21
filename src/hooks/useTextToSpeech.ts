import { useCallback } from "react";

export const useTextToSpeech = () => {
  const speak = useCallback((text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.cancel(); // cancel ongoing speech
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Text-to-speech not supported in this browser.");
    }
  }, []);

  return { speak };
};
