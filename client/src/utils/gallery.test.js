import { describe, it, expect } from 'vitest';
import data from '../../../data/data.json';

describe('Галерея', () => {
  const gallery = data.gallery;

  it('объект gallery существует', () => {
    expect(gallery).toBeTruthy();
    expect(typeof gallery).toBe('object');
  });

  it('items — массив', () => {
    expect(Array.isArray(gallery.items)).toBe(true);
  });

  it('содержит 12 элементов', () => {
    expect(gallery.items.length).toBe(12);
  });

  it('каждый item имеет src и text — непустые строки', () => {
    gallery.items.forEach(item => {
      expect(item).toHaveProperty('src');
      expect(item).toHaveProperty('text');
      expect(typeof item.src).toBe('string');
      expect(item.src.length).toBeGreaterThan(0);
      expect(typeof item.text).toBe('string');
      expect(item.text.length).toBeGreaterThan(0);
    });
  });
});
