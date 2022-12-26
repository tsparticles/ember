import Controller from '@ember/controller';
import { Engine } from 'tsparticles-engine';
import { loadSnowPreset } from 'tsparticles-preset-snow';
import { tracked } from '@glimmer/tracking';
import { CONFETTI_OPTIONS, LINK_OPTIONS } from '../utils/options';

export default class ApplicationController extends Controller {
  @tracked isConfettiVisible = false;

  options = LINK_OPTIONS;

  confetti = CONFETTI_OPTIONS;

  async loadSnowPreset(engine: Engine) {
    await loadSnowPreset(engine);
  }

  loadedCallback(engine: Engine) {
    console.log(
      'A callback function can be passed which triggers when the particles are loaded',
      engine
    );
  }
}
