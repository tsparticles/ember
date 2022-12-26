import Modifier, { NamedArgs, PositionalArgs } from 'ember-modifier';
import { Engine, Options, tsParticles } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

import { registerDestructor } from '@ember/destroyable';

interface ParticlesModifierSignature {
  Args: {
    Positional: [];
    Named: {
      options: Options;
      particlesInit: (engine: Engine) => void;
    };
  };
}

export default class ParticlesModifier extends Modifier<ParticlesModifierSignature> {
  async modify(
    element: Element,
    _: PositionalArgs<ParticlesModifierSignature>,
    { options, particlesInit }: NamedArgs<ParticlesModifierSignature>
  ) {
    await loadFull(tsParticles);

    if (particlesInit) {
      await particlesInit(tsParticles);
    }

    let particlesContainer = await tsParticles.load(element.id, options);

    registerDestructor(this, () => {
      particlesContainer?.destroy();
      particlesContainer = undefined;
    });
  }
}
