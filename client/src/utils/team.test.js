import { describe, it, expect } from 'vitest';
import data from '../../../data/data.json';

describe('Команда', () => {
  const team = data.team;

  it('массив из 13 человек', () => {
    expect(Array.isArray(team)).toBe(true);
    expect(team).toHaveLength(13);
  });

  it('у каждого есть id, name, position, photo_url, links', () => {
    team.forEach(member => {
      expect(typeof member.id).toBe('number');
      expect(typeof member.name).toBe('string');
      expect(typeof member.position).toBe('string');
      expect(typeof member.photo_url).toBe('string');
      expect(Array.isArray(member.links)).toBe(true);
    });
  });

  it('у всех имена непустые', () => {
    team.forEach(m => expect(m.name.length).toBeGreaterThan(0));
  });
});
