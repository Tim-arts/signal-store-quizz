import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed } from '@angular/core';
import { AnswerStatus, initialState } from './quiz.state';

export const QuizStore  = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withStorageSync('quizz'),

  withMethods((store) => ({
    answer(questionId: number, choiceId: number) {
      const question = store
      .questions()
      .find((question) => question.id === questionId);

      if (!question) {
        return;
      }

      patchState(store, (quiz) => ({
        questions: quiz.questions.map((question) => {
          if (question.id === questionId) {
            const status: AnswerStatus =
              question.answer === choiceId ? 'correct' : 'incorrect';
            return {
              ...question,
              status,
            };
          } else {
            return question;
          }
        }),
      }));
    },
  })),

  withComputed((state) => ({
    status: computed(() => {
      const status: Record<AnswerStatus, number> = {
        unanswered: 0,
        correct: 0,
        incorrect: 0,
      };

      for (const question of state.questions()) {
        status[question.status]++;
      }

      return status;
    }),
  }))
);
