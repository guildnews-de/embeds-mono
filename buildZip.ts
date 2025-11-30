import JSZip from 'jszip';
import { readFile, writeFile } from 'fs/promises';
import { globSync } from 'glob';

async function createZip() {
  const zip = new JSZip();

  // Selektiv Dateien suchen
  const files = globSync('dist/embeds-wp/**/*.{php,js,css,json}');

  for (const file of files) {
    const data = await readFile(file);
    zip.file(file.replace('dist/', ''), data);
  }

  const content = await zip.generateAsync({ type: 'nodebuffer' });
  await writeFile('./dist/gw2embeds-wp.zip', content);

  console.log('ZIP wurde erstellt');
}

createZip().catch(console.error);
