import { describe, it, expect } from 'vitest';
import data from '../../../data/data.json';

describe('Блок-герой', () => {
  const hero = data.hero;

  it('заголовок — массив из 3 строк', () => {
    expect(Array.isArray(hero.title)).toBe(true);
    expect(hero.title).toHaveLength(3);
    hero.title.forEach(line => expect(typeof line).toBe('string'));
  });

  it('подзаголовок — строка', () => {
    expect(typeof hero.subtitle).toBe('string');
  });

  it('video_url — строка', () => {
    expect(typeof hero.video_url).toBe('string');
  });

  it('статистика — массив', () => {
    expect(Array.isArray(hero.stats)).toBe(true);
    expect(hero.stats.length).toBeGreaterThan(0);
  });
});
