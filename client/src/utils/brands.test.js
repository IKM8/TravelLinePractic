import { describe, it, expect } from 'vitest';
import data from '../../../data/data.json';

describe('Бренды', () => {
  const brands = data.brands;

  it('массив брендов существует', () => {
    expect(Array.isArray(brands)).toBe(true);
  });

  it('содержит минимум 1 бренд', () => {
    expect(brands.length).toBeGreaterThan(0);
  });

  it('каждый бренд имеет id, name и logo', () => {
    brands.forEach(brand => {
      expect(brand).toHaveProperty('id');
      expect(brand).toHaveProperty('name');
      expect(brand).toHaveProperty('logo');
    });
  });

  it('id — число', () => {
    brands.forEach(brand => expect(typeof brand.id).toBe('number'));
  });

  it('name — непустая строка', () => {
    brands.forEach(brand => {
      expect(typeof brand.name).toBe('string');
      expect(brand.name.length).toBeGreaterThan(0);
    });
  });

  it('logo — строка, заканчивается на .svg', () => {
    brands.forEach(brand => {
      expect(typeof brand.logo).toBe('string');
      expect(brand.logo).toMatch(/\.svg$/);
    });
  });

  it('id уникальны', () => {
    const ids = brands.map(b => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
