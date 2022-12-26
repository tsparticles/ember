import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, TestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

interface Context extends TestContext {
  id: string;
}

const SELECTORS = {
  PARTICLES: '[data-test-id="particles"]',
};

module('Integration | Component | particles', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(function () {
    sinon.restore();
  });

  test('generates a unique id', async function (this: Context, assert) {
    await render(hbs`<Particles />`);

    assert.dom(SELECTORS.PARTICLES).hasAttribute('id');
  });

  test('can be assigned a custom id', async function (this: Context, assert) {
    this.id = 'custom-id';
    await render(hbs`<Particles id={{this.id}}/>`);

    assert.dom(SELECTORS.PARTICLES).hasAttribute('id', this.id);
  });
});
