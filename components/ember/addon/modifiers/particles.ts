import Modifier, { NamedArgs, PositionalArgs } from 'ember-modifier';
import type { Container, Engine, Options } from '@tsparticles/engine';
import { tsParticles } from '@tsparticles/engine';

import { registerDestructor } from '@ember/destroyable';

interface ParticlesModifierSignature {
  Args: {
    Positional: [];
    Named: {
      options: Options;
      url: string;
      particlesInit: (engine: Engine) => Promise<void>;
      particlesLoaded: (container: Container) => Promise<void>;
    };
  };
}

export default class ParticlesModifier extends Modifier<ParticlesModifierSignature> {
  async modify(
    element: Element,
    _: PositionalArgs<ParticlesModifierSignature>,
    {
      options,
      url,
      particlesInit,
      particlesLoaded,
    }: NamedArgs<ParticlesModifierSignature>
  ) {
    if (!element.id) {
      throw new Error('The specified element must have an id attribute.');
    }

    if (particlesInit) {
      await particlesInit(tsParticles);
    }

    let container = await tsParticles.load({
      id: element.id,
      url,
      options: options ?? {},
    });

    if (particlesLoaded && container) {
      await particlesLoaded(container);
    }

    registerDestructor(this, () => {
      container?.destroy();
      container = undefined;
    });
  }
}
