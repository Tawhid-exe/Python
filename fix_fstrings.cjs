const fs = require('fs');
let code = fs.readFileSync('src/data/problems.ts', 'utf8');

// Replace all ${varname:...} and ${varname.Xf} patterns inside backtick strings
// These are Python f-string expressions that conflict with JS template literals
// Pattern: ${ followed by word chars, then either : or . (Python format spec), then content, then }
code = code.replace(/\$\{([a-zA-Z_]\w*)([:\.][^}]*)\}/g, function(match, varName, spec) {
  return '\\${' + varName + spec + '}';
});

// Also fix plain variable references like ${fee}, ${total}, ${final} with no format spec
// that might appear in Python print statements
const plainVars = ['fee', 'total', 'final', 'charge', 'bonus', 'change', 'needed', 'price', 'extra'];
for (const v of plainVars) {
  // Only replace if NOT already escaped (not preceded by \)
  const pattern = new RegExp('(?<!\\\\)\\$\\{' + v + '\\}', 'g');
  code = code.replace(pattern, '\\${' + v + '}');
}

fs.writeFileSync('src/data/problems.ts', code);

// Verify no bad patterns remain
const remaining = [];
const lines = code.split('\n');
lines.forEach((line, i) => {
  // Look for ${word:} or ${word.} patterns that aren't escaped
  if (/\$\{[a-zA-Z]\w*[:.][^}]*\}/.test(line) && !line.trim().startsWith('//')) {
    remaining.push('L' + (i+1) + ': ' + line.trim().substring(0, 100));
  }
});

if (remaining.length === 0) {
  console.log('ALL CLEAN - no unescaped template literals found!');
} else {
  console.log('Still broken at:');
  remaining.forEach(r => console.log(r));
}
