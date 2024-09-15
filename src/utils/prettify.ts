export default function prettify(value: string): string {
  const withoutIndents = value
    .replace(/(?!\b\s+\b)\s+/g, '')
    .replace(/\s/g, '\n')
    .replace(/{/g, '{\n')
    .replace(/}/g, '\n}')
    .replace(/(?<=\S){/g, ' {')
    .replace(/}(?=[A-Za-z])/g, '}\n');
  const lines = withoutIndents.split('\n');
  const withIndents = [];
  let indentationLevel = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('}')) {
      indentationLevel--;
    }

    withIndents[i] = '  '.repeat(indentationLevel) + lines[i];

    if (lines[i].includes('{')) {
      indentationLevel++;
    }
  }
  return withIndents.join('\n');
}
