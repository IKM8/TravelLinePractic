import { describe, it, expect } from 'vitest';
import data from '../../../data/data.json';

describe('Вакансии', () => {
  const vacancies = data.vacancies;

  it('объект vacancies существует', () => {
    expect(vacancies).toBeTruthy();
    expect(typeof vacancies).toBe('object');
  });

  it('title — непустая строка', () => {
    expect(typeof vacancies.title).toBe('string');
    expect(vacancies.title.length).toBeGreaterThan(0);
  });

  it('subtitle — непустая строка', () => {
    expect(typeof vacancies.subtitle).toBe('string');
    expect(vacancies.subtitle.length).toBeGreaterThan(0);
  });

  it('listTitle — непустая строка', () => {
    expect(typeof vacancies.listTitle).toBe('string');
    expect(vacancies.listTitle.length).toBeGreaterThan(0);
  });

  it('moreText — непустая строка', () => {
    expect(typeof vacancies.moreText).toBe('string');
    expect(vacancies.moreText.length).toBeGreaterThan(0);
  });

  it('moreLink — строка, начинается с http', () => {
    expect(typeof vacancies.moreLink).toBe('string');
    expect(vacancies.moreLink).toMatch(/^https?:\/\//);
  });

  it('items — массив', () => {
    expect(Array.isArray(vacancies.items)).toBe(true);
  });

  it('содержит минимум 1 вакансию', () => {
    expect(vacancies.items.length).toBeGreaterThan(0);
  });

  it('каждый item имеет title, location и link', () => {
    vacancies.items.forEach(item => {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('location');
      expect(item).toHaveProperty('link');
      expect(typeof item.title).toBe('string');
      expect(typeof item.location).toBe('string');
      expect(typeof item.link).toBe('string');
    });
  });

  it('у всех title непустые', () => {
    vacancies.items.forEach(item => {
      expect(item.title.length).toBeGreaterThan(0);
    });
  });
});
