import { describe, it, expect } from 'vitest';
import data from '../../../data/data.json';

describe('contact', () => {
  it('has title', () => {
    expect(data.contact.title).toBeTruthy();
  });

  it('has description', () => {
    expect(data.contact.description).toBeTruthy();
  });

  it('has video_url', () => {
    expect(data.contact.video_url).toBeTruthy();
  });

  it('title is a string', () => {
    expect(typeof data.contact.title).toBe('string');
  });

  it('description contains newline', () => {
    expect(data.contact.description).toContain('\n');
  });

  it('has button_text', () => {
    expect(data.contact.button_text).toBeTruthy();
  });
});
