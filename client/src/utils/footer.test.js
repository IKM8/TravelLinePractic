import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Footer from '../components/Footer';

describe('footer', () => {
  it('renders copyright', () => {
    const html = renderToString(React.createElement(Footer));
    expect(html).toContain('ТРЭВЕЛ ЛАЙН СИСТЕМС');
  });

  it('has vk link', () => {
    const html = renderToString(React.createElement(Footer));
    expect(html).toContain('vk.com');
  });

  it('has telegram link', () => {
    const html = renderToString(React.createElement(Footer));
    expect(html).toContain('t.me');
  });
});
