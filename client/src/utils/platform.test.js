import { describe, it, expect } from 'vitest';
import data from '../../../data/data.json';

const VALID_COLORS = ['#507bce','#227bdd','#a456c3','#48af45','#eb4836','#6667d4','#20a781','#b9d950','#00a2bc','#d86ab3'];
const KNOWN_ICONS = ['founding','extranet','booking-engine','pms','analytics','channel-manager','rate-shopper','webpms','reputation','express','mobile-extranet','price-optimizer','crm-integration','lk-guest','order-management','loyalty','reactor','billing','gms','partner-api'];

describe('Платформа: структура', () => {
  it('платформа — массив', () => {
    expect(Array.isArray(data.platform)).toBe(true);
  });

  it('каждый год имеет поля year и entries', () => {
    data.platform.forEach((group, i) => {
      expect(group).toHaveProperty('year');
      expect(group).toHaveProperty('entries');
      expect(Array.isArray(group.entries)).toBe(true);
    });
  });

  it('каждый продукт имеет обязательные поля', () => {
    data.platform.forEach(group => {
      group.entries.forEach((entry, j) => {
        expect(entry).toHaveProperty('title');
        expect(entry).toHaveProperty('icon');
        expect(entry).toHaveProperty('iconColor');
        expect(typeof entry.title).toBe('string');
        expect(typeof entry.icon).toBe('string');
        expect(typeof entry.iconColor).toBe('string');
      });
    });
  });
});

describe('Платформа: год', () => {
  it('год должен быть строкой из 4 цифр', () => {
    data.platform.forEach(group => {
      expect(group.year).toMatch(/^\d{4}$/);
    });
  });

  it('год должен быть в разумном диапазоне (2000–2050)', () => {
    data.platform.forEach(group => {
      const y = Number(group.year);
      expect(y).toBeGreaterThanOrEqual(2000);
      expect(y).toBeLessThanOrEqual(2050);
    });
  });

  it('годы не должны повторяться', () => {
    const years = data.platform.map(g => g.year);
    const unique = new Set(years);
    expect(unique.size).toBe(years.length);
  });

  it('годы должны быть отсортированы по возрастанию', () => {
    const years = data.platform.map(g => Number(g.year)).filter(y => !isNaN(y));
    for (let i = 1; i < years.length; i++) {
      expect(years[i]).toBeGreaterThan(years[i - 1]);
    }
  });
});

describe('Платформа: продукты', () => {
  it('название продукта не должно быть пустым', () => {
    data.platform.forEach(group => {
      group.entries.forEach(entry => {
        expect(entry.title.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('иконка должна быть из списка известных', () => {
    data.platform.forEach(group => {
      group.entries.forEach(entry => {
        expect(KNOWN_ICONS).toContain(entry.icon);
      });
    });
  });

  it('цвет должен быть из палитры', () => {
    data.platform.forEach(group => {
      group.entries.forEach(entry => {
        expect(VALID_COLORS).toContain(entry.iconColor);
      });
    });
  });

  it('ни один год не должен превышать 10 продуктов', () => {
    data.platform.forEach(group => {
      expect(group.entries.length).toBeLessThanOrEqual(10);
    });
  });

  it('все продукты в рамках одного года имеют заполненный title', () => {
    data.platform.forEach(group => {
      group.entries.forEach(entry => {
        if (entry.title) {
          expect(typeof entry.title).toBe('string');
        }
      });
    });
  });
});
