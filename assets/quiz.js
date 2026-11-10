"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const questions = window.quizData;
  const form = document.getElementById("quiz-form");
  const result = document.getElementById("quiz-result");
  if (!form || !result || !Array.isArray(questions) || questions.length !== 8) return;

  const letters = ["A", "B", "C", "D"];
  questions.forEach((item, index) => {
    if (!Array.isArray(item.options) || item.options.length !== 4 || !Number.isInteger(item.answer) || item.answer < 0 || item.answer > 3) return;
    const fieldset = document.createElement("fieldset");
    fieldset.className = "question";
    const legend = document.createElement("legend");
    const number = document.createElement("span");
    number.className = "question-number";
    number.textContent = `Câu ${index + 1}/8`;
    legend.append(number, document.createTextNode(item.question));
    fieldset.append(legend);

    item.options.forEach((option, choice) => {
      const label = document.createElement("label");
      label.className = "option";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${index}`;
      radio.value = String(choice);
      const letter = document.createElement("span");
      letter.className = "option-letter";
      letter.textContent = `${letters[choice]}.`;
      const caption = document.createElement("span");
      caption.textContent = option;
      label.append(radio, letter, caption);
      fieldset.append(label);
    });
    const feedback = document.createElement("p");
    feedback.className = "feedback";
    feedback.hidden = true;
    fieldset.append(feedback);
    form.insertBefore(fieldset, form.querySelector(".actions"));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let score = 0;
    const fields = form.querySelectorAll(".question");
    questions.forEach((item, index) => {
      const field = fields[index];
      const chosen = field.querySelector("input:checked");
      const selected = chosen ? Number(chosen.value) : -1;
      const correct = selected === item.answer;
      if (correct) score++;
      field.querySelectorAll(".option").forEach((label, choice) => {
        label.classList.toggle("correct", choice === item.answer);
        label.classList.toggle("incorrect", choice === selected && !correct);
      });
      const feedback = field.querySelector(".feedback");
      feedback.className = `feedback ${correct ? "right" : "wrong"}`;
      feedback.textContent = `${correct ? "Đúng" : selected === -1 ? "Chưa trả lời" : "Sai"}. Đáp án: ${letters[item.answer]}. ${item.explanation}`;
      feedback.hidden = false;
    });
    result.textContent = `Bạn trả lời đúng ${score}/8 câu.`;
    result.focus();
  });
});
