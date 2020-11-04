import Component from '@ember/component';
import { set, computed } from '@ember/object';

export default Component.extend({
  init() {
    this._super(...arguments);
    this.boundOnKeyPress = this.onKeyPress.bind(this);

    set(this, 'lines', new Array(30));

    set(this, 'deleteAction', ['d', 'd']);

    this.resetGame();
  },

  didInsertElement() {
    window.addEventListener('keypress', this.boundOnKeyPress);
  },

  willDestroy() {
    window.removeEventListener('keypress', this.boundOnKeyPress);
  },

  resetGame() {
    const cursorPosition = Math.floor(Math.random() * 30);
    set(this, 'cursorPosition', cursorPosition);

    const wordIndex = Math.floor(Math.random() * 30);
    set(this, 'wordIndex', wordIndex);

    const solutionIndex = Math.abs(cursorPosition - wordIndex);
    const solutionChar = cursorPosition < wordIndex ? 'j' : 'k';

    const solution = [
      ...`${solutionIndex}`.split(""),
      solutionChar
    ];

    set(this, 'solution', solution);
    set(this, 'userAnswer', []);
    set(this, 'userAction', []);
  },

  onKeyPress(event) {
    const value = event.key;

    const isSolution = this.solution.includes(value);
    if (this.cursorPosition === this.wordIndex) {
      if (value === 'd') {
        this.userAction.push(value);
      } else {
        set(this, 'userAction', []);
      }

      if (JSON.stringify(this.userAction) == JSON.stringify(this.deleteAction) &&
      JSON.stringify(this.solution) == JSON.stringify(this.userAnswer)) {
        this.resetGame();
        return
      }
    }

    if (this.userAnswer.length < this.solution.length) {
      this.userAnswer.push(value);
    }

    const currentAnswer = this.currentAnswerIsCorrect(this.userAnswer, this.solution);

    if (this.userAnswer.length === this.solution.length) {
      if (currentAnswer) {
        set(this, 'cursorPosition', this.wordIndex);
      } else {
        set(this, 'userAnswer', []);
      }
    } else {
      if (currentAnswer) {
      } else {
        set(this, 'userAnswer', []);
      }
    }
  },

  currentAnswerIsCorrect(answer, solution) {
    const partialSolution = solution.slice(0, answer.length);

    return JSON.stringify(partialSolution ) == JSON.stringify(answer);
  }
});
