import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { QuizComponent } from './quiz.component';

bootstrapApplication(QuizComponent, {
  providers: [
    provideZonelessChangeDetection()
  ]
});
