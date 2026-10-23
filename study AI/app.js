const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const date = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
$('#today-label').textContent = date.format(new Date());

function updateTaskSummary() {
  const rows = $$('.task-row');
  const checked = rows.filter(row => $('input', row).checked).length;
  $('#task-count').textContent = checked;
  $('#task-progress').style.width = `${rows.length ? checked / rows.length * 100 : 0}%`;
}
$('#plan-list').addEventListener('change', e => { if (e.target.matches('input[type=checkbox]')) updateTaskSummary(); });

const toast = (message) => {
  const el = $('#toast'); el.textContent = message; el.classList.add('show');
  clearTimeout(toast.timeout); toast.timeout = setTimeout(() => el.classList.remove('show'), 2400);
};

$('#add-task-form').addEventListener('submit', e => {
  e.preventDefault(); const field = $('#new-task'); const title = field.value.trim();
  if (!title) return;
  const row = document.createElement('label'); row.className = 'task-row';
  const checkbox = document.createElement('input'); checkbox.type = 'checkbox';
  const mark = document.createElement('span'); mark.className = 'checkmark';
  const copy = document.createElement('span'); copy.className = 'task-copy';
  const name = document.createElement('b'); name.textContent = title;
  const detail = document.createElement('small'); detail.textContent = 'Added just now';
  copy.append(name, detail); row.append(checkbox, mark, copy);
  $('#plan-list').append(row); field.value = ''; updateTaskSummary(); toast('Added to your study plan');
});

const plans = [
  { title: 'Review biology notes', detail: 'Chapter 4 · 25 min', tag: 'BIO', color: 'biology' },
  { title: 'Practice algebra problems', detail: 'Equations · 30 min', tag: 'MATH', color: 'math' },
  { title: 'Read history chapter', detail: 'Industrial Revolution · 20 min', tag: 'HIST', color: 'history' },
  { title: 'Take a well-earned break', detail: 'Stretch, hydrate, breathe · 10 min', tag: 'RESET', color: 'break' }
];
$('#generate-plan').addEventListener('click', () => {
  const list = $('#plan-list'); list.replaceChildren();
  plans.forEach((plan, i) => {
    const row = document.createElement('label'); row.className = 'task-row';
    const box = document.createElement('input'); box.type = 'checkbox'; box.checked = i === 0;
    const mark = document.createElement('span'); mark.className = 'checkmark';
    const copy = document.createElement('span'); copy.className = 'task-copy';
    const title = document.createElement('b'); title.textContent = plan.title;
    const detail = document.createElement('small'); detail.textContent = plan.detail;
    copy.append(title, detail); const tag = document.createElement('span'); tag.className = `task-tag ${plan.color}`; tag.textContent = plan.tag;
    row.append(box, mark, copy, tag); list.append(row);
  });
  updateTaskSummary(); toast('A balanced study plan is ready ✨');
});

const messages = {
  plan: 'Try one short review session, one practice task, and a proper little break. You can check off each step as you go.',
  motivate: 'You don’t need to finish everything right now. Just pick one small task and give it ten focused minutes. Starting counts!',
  break: 'Try standing up, stretching your shoulders, and having a sip of water. A few calm minutes can help you come back refreshed.'
};
$$('.suggestion-chips button').forEach(button => button.addEventListener('click', () => {
  $('#assistant-message').textContent = messages[button.dataset.prompt];
}));
$('#speak-button').addEventListener('click', () => {
  const text = $('#assistant-message').textContent;
  if (!('speechSynthesis' in window)) { toast('Voice readout is not available in this browser'); return; }
  speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.rate = .96; speechSynthesis.speak(utterance);
});

const questions = [
  { topic: 'BIOLOGY · THE CELL', text: 'What is the powerhouse of the cell?', choices: ['Nucleus', 'Mitochondrion', 'Ribosome'], answer: 1, explain: 'Mitochondria help produce the energy cells use.' },
  { topic: 'MATH · ALGEBRA', text: 'If x + 5 = 12, what is x?', choices: ['5', '7', '17'], answer: 1, explain: 'Subtract 5 from both sides: x = 7.' },
  { topic: 'HISTORY · INDUSTRY', text: 'Which energy source powered many early steam engines?', choices: ['Coal', 'Solar power', 'Wind'], answer: 0, explain: 'Coal was widely used to heat water for steam engines.' }
];
let questionIndex = 0;
function renderQuestion() {
  const q = questions[questionIndex];
  $('#quiz-count').textContent = `${questionIndex + 1} / ${questions.length}`;
  $('.quiz-topic').textContent = q.topic; $('#quiz-question').textContent = q.text;
  $('#quiz-feedback').textContent = ''; $('#quiz-feedback').className = 'quiz-feedback'; $('#next-question').hidden = true;
  const answers = $('#answer-list'); answers.replaceChildren();
  q.choices.forEach((choice, index) => {
    const button = document.createElement('button'); button.className = 'answer-button'; button.textContent = choice;
    button.addEventListener('click', () => {
      $$('.answer-button', answers).forEach((item, i) => { item.disabled = true; if (i === q.answer) item.classList.add('correct'); });
      const feedback = $('#quiz-feedback');
      if (index === q.answer) feedback.textContent = `That’s right! ${q.explain}`;
      else { button.classList.add('incorrect'); feedback.textContent = `Not quite. ${q.explain}`; feedback.classList.add('wrong'); }
      $('#next-question').hidden = false;
      $('#next-question').textContent = questionIndex === questions.length - 1 ? 'Start over ↻' : 'Next question →';
    });
    answers.append(button);
  });
}
$('#next-question').addEventListener('click', () => { questionIndex = (questionIndex + 1) % questions.length; renderQuestion(); });
renderQuestion();

const duration = 25 * 60; let remaining = duration; let interval = null;
function showTimer() {
  const mins = Math.floor(remaining / 60), secs = remaining % 60;
  $('#timer-display').textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  $('#timer-ring').style.strokeDashoffset = `${320.44 * (1 - remaining / duration)}`;
}
$('#timer-toggle').addEventListener('click', () => {
  if (interval) { clearInterval(interval); interval = null; $('#timer-toggle').innerHTML = 'Resume focus session <span>→</span>'; $('#timer-state').textContent = 'PAUSED'; return; }
  if (!remaining) remaining = duration;
  $('#timer-toggle').innerHTML = 'Pause session <span>Ⅱ</span>'; $('#timer-state').textContent = 'YOU’RE IN THE FLOW';
  interval = setInterval(() => {
    remaining--; showTimer();
    if (remaining <= 0) { clearInterval(interval); interval = null; $('#timer-toggle').innerHTML = 'Start another session <span>→</span>'; $('#timer-state').textContent = 'SESSION COMPLETE'; toast('Lovely work. You completed a focus session!'); }
  }, 1000);
});
$('#timer-reset').addEventListener('click', () => { clearInterval(interval); interval = null; remaining = duration; showTimer(); $('#timer-state').textContent = 'READY WHEN YOU ARE'; $('#timer-toggle').innerHTML = 'Start a focus session <span>→</span>'; });

$$('.nav-link').forEach(link => link.addEventListener('click', () => {
  $$('.nav-link').forEach(item => item.classList.remove('active')); link.classList.add('active');
}));
