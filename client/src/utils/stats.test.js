import { describe, it, expect } from 'vitest';
import data from '../../../data/data.json';

describe('Статистика', () => {
  const stats = data.hero.stats;

  it('каждый элемент имеет value и label', () => {
    stats.forEach(stat => {
      expect(stat).toHaveProperty('value');
      expect(stat).toHaveProperty('label');
      expect(typeof stat.value).toBe('string');
      expect(typeof stat.label).toBe('string');
    });
  });

  it('хотя бы один элемент не пустой', () => {
    const filled = stats.filter(s => s.value !== '' || s.label !== '');
    expect(filled.length).toBeGreaterThan(0);
  });
});
