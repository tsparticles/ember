import Modifier, { NamedArgs, PositionalArgs } from 'ember-modifier';
import { Container, Engine, Options, tsParticles } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

import { registerDestructor } from '@ember/destroyable';

interface ParticlesModifierSignature {
  Args: {
    Positional: [];
    Named: {
      options: Options;
      particlesInit: (engine: Engine) => void;
      particlesLoaded: (container: Container) => void;
    };
  };
}

export default class ParticlesModifier extends Modifier<ParticlesModifierSignature> {
  async modify(
    element: Element,
    _: PositionalArgs<ParticlesModifierSignature>,
    {
      options,
      particlesInit,
      particlesLoaded,
    }: NamedArgs<ParticlesModifierSignature>
  ) {
    await loadFull(tsParticles);

    if (particlesInit) {
      await particlesInit(tsParticles);
    }

    let container = await tsParticles.load(element.id, options);

    if (particlesLoaded && container) {
      particlesLoaded(container);
    }

    registerDestructor(this, () => {
      container?.destroy();
      container = undefined;
    });
  }
}
