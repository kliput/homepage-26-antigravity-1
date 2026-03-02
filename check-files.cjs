const fs = require('fs');
const path = require('path');

// Just list files to see their paths
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const docsDir = path.join(process.cwd(), 'src/content/docs');
if (fs.existsSync(docsDir)) {
  const files = walk(docsDir);
  console.log('Files in src/content/docs:');
  files.forEach(f => console.log(path.relative(docsDir, f)));
} else {
  console.log('src/content/docs does not exist');
}
