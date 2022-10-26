import { $, $$, addGlobalEventListener, elaspedTime, workCompleted } from './utility.js';


// project options
$('[data-project-options-icon]').addEventListener('click', e => {
  e.target.blur();
  if(!$('[data-project-options-dropdown]').classList.contains('open')) {
    $('[data-project-options-dropdown]').classList.add('open');
    $('[data-project-options-backdrop]').setAttribute('aria-hidden', 'false');
    document.body.style.overflowY = 'hidden';
    return;
  } 

  $('[data-project-options-dropdown]').classList.remove('open');
  $('[data-project-options-backdrop]').setAttribute('aria-hidden', 'true');
  document.body.style.overflowY = 'auto';
  
})
// project-options-dropdown-backdrop
addGlobalEventListener('click', '[data-project-options-backdrop]', 
e => {
  e.target.setAttribute('aria-hidden', 'true');
  $('[data-project-options-dropdown]').classList.remove('open');
  document.body.style.overflowY = 'auto';
})
// data-project-options toggle
addGlobalEventListener('click', '[data-project-options]', 
e => {
  $('[data-project-options-dropdown]').classList.remove('open');
  $('[data-project-options-backdrop]').setAttribute('aria-hidden', 'true');
  document.body.style.overflowY = 'auto';
})



addGlobalEventListener('click', '[data-overview-edit-btn]', async e => {
  const inputField = e.target.parentElement.previousElementSibling.lastElementChild;
  for(const item of $$('[data-overview-field]')) {
    item.setAttribute('readonly', '');
  }
  inputField.removeAttribute('readonly');
  inputField.focus();

  for(const item of $$('.overview__change-btn')) {
    item.classList.remove('edit');
  }
  const parentEl = e.target.parentElement;
  parentEl.classList.add('edit');
})

addGlobalEventListener('click', '[data-overview-cancel-btn]', e => {

  const inputField = e.target.parentElement.previousElementSibling.lastElementChild;
  inputField.setAttribute('readonly', '');
  inputField.blur();

  const parentEl = e.target.parentElement;
  parentEl.classList.remove('edit');
})

// different project options
addGlobalEventListener('click', '[data-project-section-options]',
e => {
  const option = e.target.dataset.projectSectionOptions;

  for(const item of $$('[data-project-section-options]')) {
    item.classList.remove('selected');
  }
  e.target.classList.add('selected');

  
})





window.addEventListener('load', () => {

  // Time Elasped
  const eT = elaspedTime(
    $('[data-overview-end-date]').value,
    $('[data-overview-start-date]').value
  );
  $('[data-time-progress-value]').innerText = eT.time;
  $('.circleThumb--time').style.setProperty('--value', eT.time);
  $('[data-time-progress-daysLeft]').innerText = eT.days;


  // Work Completed: complete-45 total-70
  const wC = workCompleted(45, 70);
  $('[data-work-progress-value]').innerText = wC.work;
  $('.circleThumb--work').style.setProperty('--value', wC.work);
  $('[data-work-progress-daysLeft]').innerText = wC.tasks;

})





// ------------------------------------------------
