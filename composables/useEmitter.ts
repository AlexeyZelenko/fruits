import type { Emitter } from 'mitt';

type Events = {
  'toggle-filters': void;
};

export const useEmitter = (): Emitter<Events> => {
  const { $emitter } = useNuxtApp();
  if (!$emitter) {
    throw new Error('Emitter is not initialized');
  }
  return $emitter;
};