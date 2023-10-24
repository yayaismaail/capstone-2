import './style.css';
import './assets/styletwo.css';
import homeContent from './module/homepagedisplayer.js';
import { getLike } from './module/likeshandler.js';

window.addEventListener('load', async () => {
  await homeContent();
  await getLike();
});