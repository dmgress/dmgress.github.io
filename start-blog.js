import { writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Haal de titel op van de argumenten
const title = process.argv[2];
if (!title) {
    console.error("Gebruik: npm run start-blog \"Titel van de blog\"");
    process.exit(1);
}
const today = new Date().toISOString().split('T')[0]; // Vandaag's datum in YYYY-MM-DD formaat

// Genereer de bestandsnaam gebaseerd op de titel
const fileName = title.toLowerCase().replace(/\s+/g, '-') + '.md';
const filePath = join('content', 'blog', `${today}-${fileName}`);

// Genereer de inhoud van het bestand
const content = `---
title: "${title}"
description:
date: ${today}
tags:
draft: true
---

# ${title}
`;

try {
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, content);
    console.log(`Blogpost aangemaakt: ${filePath}`);
} catch (error) {
    console.error("Er is een fout opgetreden bij het maken van het bestand:", error);
}
