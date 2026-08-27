import { useState } from 'react';
import { sound } from '../services/audioService';

export function useAudio() {
  const [soundFxEnabled, setSoundFxEnabled] = useState<boolean>(sound.isSoundFxEnabled());
  const [ambientEnabled, setAmbientEnabled] = useState<boolean>(sound.isAmbientEnabled());

  const handleToggleSoundFx = () => {
    const next = sound.toggleSoundFx();
    setSoundFxEnabled(next);
    if (next) sound.playClick();
  };

  const handleToggleAmbient = () => {
    const next = sound.toggleAmbient();
    setAmbientEnabled(next);
    if (soundFxEnabled) sound.playClick();
  };

  return {
    soundFxEnabled,
    ambientEnabled,
    toggleSoundFx: handleToggleSoundFx,
    toggleAmbient: handleToggleAmbient
  };
}
