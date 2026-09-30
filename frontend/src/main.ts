import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((error: unknown) => {
  console.error('Task Planner failed to start:', error);
  const root = document.querySelector('app-root');
  if (root) {
    root.innerHTML = '<main style="padding:2rem;font-family:system-ui"><h1>Task Planner could not start</h1><p>Please check the browser console for details.</p></main>';
  }
});
