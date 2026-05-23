const { exec } = require('child_process');
const fs = require('fs');

const child = exec('npm run build');

child.stdout.on('data', (data) => {
  fs.appendFileSync('build_log.txt', data);
});

child.stderr.on('data', (data) => {
  fs.appendFileSync('build_log.txt', data);
});

child.on('close', (code) => {
  fs.appendFileSync('build_log.txt', `\nProcess exited with code ${code}`);
});
