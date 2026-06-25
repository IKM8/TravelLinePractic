import { describe, it, expect } from 'vitest';
import data from '../../../data/data.json';

describe('Работай как удобно', () => {
  const work = data.work;

  it('объект work существует', () => {
    expect(work).toBeTruthy();
    expect(typeof work).toBe('object');
  });

  it('title — непустая строка', () => {
    expect(work).toHaveProperty('title');
    expect(typeof work.title).toBe('string');
    expect(work.title.length).toBeGreaterThan(0);
  });

  it('slogan — непустая строка', () => {
    expect(work).toHaveProperty('slogan');
    expect(typeof work.slogan).toBe('string');
    expect(work.slogan.length).toBeGreaterThan(0);
  });

  it('items — массив из 6 элементов', () => {
    expect(Array.isArray(work.items)).toBe(true);
    expect(work.items.length).toBe(6);
  });

  it('первые 5 элементов — image с src, последний — text', () => {
    work.items.forEach((item, i) => {
      expect(item).toHaveProperty('type');
      if (i < 5) {
        expect(item.type).toBe('image');
        expect(item).toHaveProperty('src');
        expect(typeof item.src).toBe('string');
        expect(item.src.length).toBeGreaterThan(0);
      } else {
        expect(item.type).toBe('text');
        expect(item).toHaveProperty('text');
        expect(typeof item.text).toBe('string');
        expect(item.text.length).toBeGreaterThan(0);
      }
    });
  });
});
