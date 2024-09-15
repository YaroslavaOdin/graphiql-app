import { describe, it, expect } from 'vitest';
import prettify from '../utils/prettify';
import { prettifyJSON } from '../utils/prettifyJSON';

describe('prettify', () => {
  it('should prettify', () => {
    const input = '{characters(page:2,filter: {name:"rick"}) {info {count}results {name}}}';
    const expectedOutput = `
{
  characters(page:2,filter: {
    name:"rick"
  }) {
    info {
      count
    }
    results {
      name
    }
  }
}`.trim();

    expect(prettify(input)).toBe(expectedOutput);
  });

  it('should handle empty input', () => {
    const input = '';
    const expectedOutput = '';

    expect(prettify(input)).toBe(expectedOutput);
  });
});

describe('prettifyJSON', () => {
  it('should prettify JSON', () => {
    const input = '{"name": "John", "age": 30, "city": "New York"}';
    const expectedOutput = `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`.trim();

    expect(prettifyJSON(input)).toBe(expectedOutput);
  });

  it('should throw error', () => {
    const input = '"name": "John", "age": 30, "city": "New York"}';

    expect(() => prettifyJSON(input)).toThrowError('Invalid json');
  });

  it('should handle empty input', () => {
    const input = '';
    const expectedOutput = '';

    expect(prettifyJSON(input)).toBe(expectedOutput);
  });
});
