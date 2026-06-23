import { describe, it, expect } from 'vitest';
import { updateData } from './updateData';

describe('updateData', () => {
  it('меняет значение', () => {
    const obj = { a: 1 };
    const res = updateData(obj, ['a'], 2);
    expect(res.a).toBe(2);
  });

  it('не трогает оригинал', () => {
    const obj = { a: 1 };
    updateData(obj, ['a'], 2);
    expect(obj.a).toBe(1);
  });

  it('меняет вложенное поле', () => {
    const obj = { hero: { title: 'привет' } };
    const res = updateData(obj, ['hero', 'title'], 'пока');
    expect(res.hero.title).toBe('пока');
  });

  it('меняет элемент массива', () => {
    const obj = { list: [1, 2, 3] };
    const res = updateData(obj, ['list'], [4, 5]);
    expect(res.list).toEqual([4, 5]);
  });

  it('добавляет новый объект в массив', () => {
    const obj = { items: [{ id: 1 }] };
    const newItems = [...obj.items, { id: 2 }];
    const res = updateData(obj, ['items'], newItems);
    expect(res.items).toHaveLength(2);
    expect(res.items[1].id).toBe(2);
  });
});
