/**
 * Initializes the quiz when the DOM content is fully loaded. It sets up the quiz container and the submit button functionality.
 */

document.addEventListener('DOMContentLoaded', function() {
  const quizContainer = document.getElementById('quiz-container');
  renderQuiz(quizData, quizContainer);

  // Create and append the result display element
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.addEventListener('click', submitQuiz);
});

/**
 * Renders the quiz questions and options within the given container.
 * @param {Object[]} quizData - The array of quiz question objects.
 * @param {HTMLElement} container - The DOM element where the quiz will be rendered.
 */

function renderQuiz(quizData, container) {
  const ol = document.createElement("ol");

  quizData.forEach((q, i) => {
    const li = document.createElement("li");
    li.classList.add("question", q.type);

    const prompt = document.createElement("p");
    prompt.textContent = q.question;
    li.appendChild(prompt);

    if (q.type === "single-answer") {
      q.options.forEach(opt => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question${i}`;
        input.value = opt;
        input.setAttribute("data-correct", opt === q.answer);
        label.appendChild(input);
        label.append(` ${opt}`);
        li.appendChild(label);
        li.appendChild(document.createElement("br"));
      });
    }

if (q.type === "multiple-answer") {
  q.options.forEach(opt => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = `question${i}`;
    input.value = opt;


    const isCorrect = q.answer.includes(opt);
    input.setAttribute("data-correct", isCorrect ? "true" : "false");

    label.appendChild(input);
    label.append(` ${opt}`);
    li.appendChild(label);
    li.appendChild(document.createElement("br"));
  });
}

    if (q.type === "free-form") {
      const input = document.createElement("input");
      input.type = "text";
      input.name = `question${i}`;
      input.setAttribute("data-correct-answers", q.answer.map(ans => ans.toLowerCase()).join(","));
      li.appendChild(input);
    }

    ol.appendChild(li);
  });

  container.appendChild(ol);
}

// Append the generated ordered list of questions to the container
/**
 * Checks if all quiz questions have been answered.
 * @return {Boolean} True if all questions are answered, false otherwise.
 */

function areAllQuestionsAnswered() {
  const questions = document.querySelectorAll(".question");

  for (const question of questions) {
    if (question.classList.contains("single-answer")) {
      const answered = question.querySelector("input[type='radio']:checked");
      if (!answered) return false;
    } else if (question.classList.contains("multiple-answer")) {
      const checkboxes = question.querySelectorAll("input[type='checkbox']");
      const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
      if (!anyChecked) return false;
    } else if (question.classList.contains("free-form")) {
      const input = question.querySelector("input[type='text']");
      if (!input || input.value.trim() === "") return false;
    }
  }

  return true;
}

/**
 * Checks if the answer provided for a single-answer question is correct.
 * @param {HTMLElement} question - The DOM element representing the question.
 * @return {Boolean} True if the answer is correct, false otherwise.
 */

// Utility function to evaluate single answers
function isSingleAnswerCorrect(question) {
  const selected = question.querySelector("input[type='radio']:checked");
  if (!selected) return false;

  return selected.getAttribute("data-correct") === "true";
}

/**
 * Checks if the answers provided for a multiple-answer question are correct.
 * @param {HTMLElement} question - The DOM element representing the question.
 * @return {Boolean} True if all correct answers are selected, false otherwise.
 */

// Utility function to evaluate multiple answers
function isMultipleAnswerCorrect(questionEl) {
  const checkboxes = questionEl.querySelectorAll('input[type="checkbox"]');

  for (const box of checkboxes) {
    const isCorrect = box.getAttribute('data-correct') === 'true';
    if (box.checked !== isCorrect) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if the answer provided for a free-form question is correct.
 * @param {HTMLElement} question - The DOM element representing the question.
 * @return {Boolean} True if the free-form answer is correct, false otherwise.
 */

// Utility function to evaluate free-form answers
function isFreeFormAnswerCorrect(question) {
  const input = question.querySelector("input[type='text']");
  if (!input) return false;

  const userAnswer = input.value.trim().toLowerCase();
  const correctAnswers = input
    .getAttribute("data-correct-answers")
    .split(",")
    .map(ans => ans.trim().toLowerCase());

  return correctAnswers.includes(userAnswer);
}

/**
 * Submits the quiz, checks all answers, calculates the score, and displays it.
 * Alerts the user if not all questions have been answered.
 */
function submitQuiz() {
  if (!areAllQuestionsAnswered()) {
    alert("Please answer all questions before submitting.");
    return;
  }

// First, verify all questions are answered
  const questions = document.querySelectorAll(".question");
  let total = questions.length;
  let score = 0;

// Then, loop through each question and increment score if correct
for (const question of questions) {
  let isCorrect = false;

  if (question.classList.contains("single-answer")) {
    isCorrect = isSingleAnswerCorrect(question);
  } else if (question.classList.contains("multiple-answer")) {
    isCorrect = isMultipleAnswerCorrect(question);
  } else if (question.classList.contains("free-form")) {
    isCorrect = isFreeFormAnswerCorrect(question);
  }

  if (isCorrect) {
    score++;
    question.classList.remove('incorrect');
    question.classList.add('correct');
  } else {
    question.classList.remove('correct');
    question.classList.add('incorrect');
  }
}

// Finally, display the result in the result container
const result = document.querySelector(".score-display");
result.textContent = `You scored ${score} out of ${total}.`;
}

/**
 * Creates and returns a new result display element or reuses the existing one.
 * @return {HTMLElement} The created or existing result display element.
 */
function createScoreDisplay(score, total) {
  const div = document.createElement("div");
  div.classList.add("score-display");
  div.textContent = `You scored ${score} out of ${total}.`;
  return div;
}

