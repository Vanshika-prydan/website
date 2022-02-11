// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const pc = '131 26 131 27 131 28 131 52 131 80 131 86 131 87 131 90'.replaceAll(
  ' ',
  ''
);
let remaining = pc;
const list = [];
while (remaining.length > 0) {
  let first = remaining;
  first = first.substr(0, 5);
  remaining = remaining.substr(5);
  remaining.substr();
  list.push(first);
}

fs.writeFileSync('ps.txt', JSON.stringify(list));
