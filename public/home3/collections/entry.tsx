import React from 'react';
import { createRoot } from 'react-dom/client';
import { CollectionsSection } from './CollectionsSection';
import './styles.css';

// Keep the copied HOME 1 section isolated from HOME 3 global styles.
const host = document.getElementById('collections');
if (host && !host.shadowRoot) {
  const shadow = host.attachShadow({ mode: 'open' });
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = new URL(/* @vite-ignore */ './collections.css', import.meta.url).href;
  const mount = document.createElement('div');
  shadow.append(stylesheet, mount);
  createRoot(mount).render(<CollectionsSection />);
}
