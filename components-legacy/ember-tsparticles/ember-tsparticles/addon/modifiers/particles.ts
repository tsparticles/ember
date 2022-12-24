import Modifier, { NamedArgs, PositionalArgs } from 'ember-modifier';
import { Options, tsParticles } from 'tsparticles-engine';

import { registerDestructor } from '@ember/destroyable';

interface ParticlesModifierSignature {
  Args: {
    Positional: [];
    Named: {
      options: Options;
    };
  };
}

export default class ParticlesModifier extends Modifier<ParticlesModifierSignature> {
  async modify(
    element: Element,
    _: PositionalArgs<ParticlesModifierSignature>,
    { options }: NamedArgs<ParticlesModifierSignature>
  ) {
    // const { tsParticles } = await import('tsparticles-engine');

    tsParticles.init();
    let particlesCanvas = await tsParticles.load(element.id, options);

    registerDestructor(this, () => {
      particlesCanvas?.destroy();
      particlesCanvas = undefined;
    });
  }
}
