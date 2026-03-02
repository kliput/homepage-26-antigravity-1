import { getCollection } from 'astro:content';

async function debug() {
  try {
    const docsEntries = await getCollection('docs');
    console.log('Docs Slugs:', docsEntries.map(e => ({ id: e.id, slug: e.slug })));
  } catch (e) {
    console.error(e);
  }
}

debug();
