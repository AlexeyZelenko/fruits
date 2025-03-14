import { defineNuxtPlugin } from '#app';
import mitt from 'mitt';
import type { Emitter } from 'mitt';

type Events = {
  'toggle-filters': void;
};

declare module '#app' {
  interface NuxtApp {
    $emitter: Emitter<Events>;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $emitter: Emitter<Events>;
  }
}

export default defineNuxtPlugin(() => {
  const emitter = mitt<Events>();

  return {
    provide: {
      emitter
    }
  };
});