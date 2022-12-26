import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, TestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | particles', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (this: TestContext, assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Particles id="particles"/>`);

    assert.dom('#particles').hasText('');
  });
});
