import { describe, it, expect } from 'vitest';
import data from '../../../data/data.json';

describe('Направления', () => {
  const directions = data.directions;

  it('объект directions существует', () => {
    expect(directions).toBeTruthy();
    expect(typeof directions).toBe('object');
  });

  it('title — непустая строка', () => {
    expect(typeof directions.title).toBe('string');
    expect(directions.title.length).toBeGreaterThan(0);
  });

  it('items — массив', () => {
    expect(Array.isArray(directions.items)).toBe(true);
  });

  it('содержит минимум 1 направление', () => {
    expect(directions.items.length).toBeGreaterThan(0);
  });

  it('каждый item имеет title, techs, content', () => {
    directions.items.forEach(item => {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('techs');
      expect(item).toHaveProperty('content');
    });
  });

  it('title каждого item — непустая строка', () => {
    directions.items.forEach(item => {
      expect(typeof item.title).toBe('string');
      expect(item.title.length).toBeGreaterThan(0);
    });
  });

  it('techs — массив объектов {name, icon}', () => {
    directions.items.forEach(item => {
      expect(Array.isArray(item.techs)).toBe(true);
      item.techs.forEach(tech => {
        expect(typeof tech).toBe('object');
        expect(tech).toHaveProperty('name');
        expect(tech).toHaveProperty('icon');
        expect(typeof tech.name).toBe('string');
        expect(typeof tech.icon).toBe('string');
      });
    });
  });

  it('content — строка (HTML)', () => {
    directions.items.forEach(item => {
      expect(typeof item.content).toBe('string');
    });
  });
});
