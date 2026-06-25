import { describe, it, expect } from 'vitest';
import data from '../../../data/data.json';

describe('Bonus section data', () => {
  it('has title', () => {
    expect(data.bonus.title).toBeTruthy();
  });

  it('has items array', () => {
    expect(Array.isArray(data.bonus.items)).toBe(true);
  });

  it('each item has title and text', () => {
    data.bonus.items.forEach(item => {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('text');
    });
  });

  it('has at least one item', () => {
    expect(data.bonus.items.length).toBeGreaterThan(0);
  });
});
