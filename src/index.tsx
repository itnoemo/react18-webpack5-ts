/*
 * @Description: root
 * @Author: yincece
 */

import { createRoot } from 'react-dom/client';
import App from './App/UI';

console.log("process.env", process.env);

const root = document.querySelector('#app');
root && createRoot(root).render(<App />)
