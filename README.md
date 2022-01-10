### Description

Code challenge done for [home](https://www.home.ht/en) ! Guideline can be found [here](https://www.notion.so/homeht/Frontend-Challenge-bea9e123187f405e9c58db8c9e5f0320).

Check [here](https://application-form-two.vercel.app/) to see the latest preview!

### Improvements and left todos:

- [ ] answer format verification: use `verifyEmailFormat` and `verifyNumberFormat` function for email and number inputs. For all question, answer should not be empty (check empty string for answer). Two ways we could handle the verification:

  - Check on `onChange` -> Next button status is disabled until the answer meets the correct format . When the answer has correct format button status is set to enabled.
  - Check on `onGoNext` -> Next button always enabled but if answer has not the correct format, textInput is focused with a hint message saying error format.

- [ ] save answer of radioButton question type

- animation (for fun):
  - [ ] fade in the QuestionField render.
  - [ ] Buttons -> hover background-color transition from side to side
  - [ ] start and finished screen text apparition
