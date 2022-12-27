# ember-tsparticles

An Ember.js component for using [tsParticles](https://github.com/matteobruni/tsparticles). Easily create highly customizable JavaScript particles effects, confetti explosions and fireworks animations and use them as animated backgrounds for your website.


## Compatibility

* Ember.js v3.28 or above
* Ember CLI v3.28 or above
* Node.js v14 or above


## Installation

```bash
npm install ember-tsparticles
# or
yarn add ember-tsparticles
# or
pnpm install ember-tsparticles
# or
ember install ember-tsparticles
```


## Usage

For the most basic usage of the component you can pass a configuration object via the `options` argument and initialize the tsparticles features you need in the `particlesInit` callback.

By default `tsparticles` doesn't load any extensions required to render the particles. Extensions can be loaded on a granular level which has a benefit that only the required ones have to be loaded, but to start out it can be useful to load all options via the `loadFull` function of `tsparticles`.

```bash
ember install tsparticles
```

```hbs
<Particles
  @options={{this.options}}
  @particlesInit={{this.particlesInit}}
/>
```
```js
import { Component } from '@glimmer/component';
import { loadFull } from 'tsparticles';

export default class ExampleComponent extends Component {
  options = {
    particles: {
      color: {
        value: "#000",
      },
      links: {
        enable: true,
        color: "#000",
      },
      move: {
        enable: true,
      },
    },
  };

  async particlesInit() {
    await loadFull(engine);
  }
}
```


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
