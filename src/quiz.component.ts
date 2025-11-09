import { JsonPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { QuizStore } from './quiz.store';

@Component({
  selector: 'app-root',
  template: `
    <h1>NgRx Signal Store Seed</h1>
    <p>Use this as a template to file any issues with the NgRx Signal Store.</p>
    <h2>{{ quizStore.title() }}</h2>

    @for (question of quizStore.questions(); track question) {
      <div class="max-w-lg my-4">
        <h3>{{ question.question }}</h3>
          <div
            class="grid gap-4 w-full my-4"
            [ngClass]="
              question.choices.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
            "
          >
            @for (choice of question.choices; track choice) {
              <button
                (click)="quizStore.answer(question.id, choice.id)"
              >
                {{ choice.text }}
              </button>
            }
          </div>

          @if (question.status !== 'unanswered') {
            <div
              class="my-2 border-2 p-1"
              [ngClass]="
                question.status === 'correct'
                  ? 'border-green-500'
                  : 'border-red-500'
              "
            >
              @switch (question.status) {
                @case ('correct') {
                  <p class="text-green-500 font-bold">Right Answer</p>
                }
                @case ('incorrect') {
                  <p class="text-red-500 font-bold">Wrong Answer</p>
                }
              }

              <p class="italic">{{ question.explanation }}</p>
            </div>
          }
        </div>
   }

    {{ quizStore.status() | json }}
  `,
  imports: [NgClass, JsonPipe],
})
export class QuizComponent {
  protected quizStore = inject(QuizStore);
}
