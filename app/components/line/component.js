import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  relativeNumber: computed('cursorPosition', 'number', function() {
    return Math.abs(this.cursorPosition - this.number);
  }),

  cursorIsHere: computed('cursorPosition', 'number', function() {
    return this.cursorPosition === this.number;
  }),

  wordIsHere: computed('wordIndex', 'number', function() {
    return this.wordIndex === this.number;
  })
});
