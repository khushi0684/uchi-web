import fs from 'fs';
import path from 'path';

const clientDir = path.join(process.cwd(), 'dist', 'client');
const distDir = path.join(process.cwd(), 'dist');

try {
  if (fs.existsSync(path.join(clientDir, 'index.html'))) {
    fs.copyFileSync(path.join(clientDir, 'index.html'), path.join(clientDir, '404.html'));
  }
  
  if (fs.existsSync(clientDir)) {
    const items = fs.readdirSync(clientDir);
    for (const item of items) {
      fs.cpSync(path.join(clientDir, item), path.join(distDir, item), { recursive: true });
    }
  }
  console.log("Postbuild completed successfully.");
} catch (e) {
  console.error("Postbuild error:", e);
}
