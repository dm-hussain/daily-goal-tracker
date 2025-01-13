const taskMsg = document.querySelector('#task-msg');
const progressBar = document.querySelector('.progress-bar-inner');
const warningMsg = document.querySelector('.warning');

const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');
const input3 = document.querySelector('#input3');

const goalSection = document.querySelector('.goal-section');

const allCheckBox = document.querySelectorAll('.checkBox');
const allInput = document.querySelectorAll('input');

let progressValue;
progressValue =
  +localStorage.getItem('progressValueLocal', progressValue) ||
  +progressBar.style.width;
localStorage.setItem('progressValueLocal', progressValue);

progressBar.style.width = progressValue + '%';

const allInpValue = JSON.parse(localStorage.getItem('allInpValueLocal')) || {};
localStorage.setItem(`allInpValueLocal`, JSON.stringify(allInpValue));

let goalCount = localStorage.getItem('goalCountLocal') || 0;
localStorage.setItem('goalCountLocal', goalCount);

let allTaskStatus = localStorage.getItem('allTaskStatusLocal') || false;
localStorage.setItem('allTaskStatusLocal', allTaskStatus);

if (allTaskStatus === true) {
  goalSection.classList.add('completed');
}

const allQuotes = [
  'Raise the bar by completing your goals!',
  ' Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals',
  'time for chill :D',
];

taskMsg.innerText = allQuotes[goalCount];

const url1 = 'blank.png';
const url2 = 'green.png';
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++

allInput.forEach((inp) => {
  if (allInpValue[inp.id]) {
    inp.value = allInpValue[inp.id].name;
  }
  inp.addEventListener('change', ()=>{
    if (inp.value === '') {
      clearCheckBox();
    }
  })

  inp.addEventListener('input', () => {
    if (inp.previousElementSibling.classList.contains('checked')) {
      inp.value = allInpValue[inp.id].name;

      return;
    }

    allInpValue[inp.id] = {
      name: inp.value,
      completed: false,
    };

    localStorage.setItem(`allInpValueLocal`, JSON.stringify(allInpValue));

    // if (inp.value === '') {
    //   clearCheckBox();
    // }
    // debugger
    if (input1.value !== '' && input2.value !== '' && input3.value !== '') {
      goalSection.classList.add('completed');
      allTaskStatus = true;
      localStorage.setItem('allTaskStatusLocal', allTaskStatus);
    } else {
      goalSection.classList.remove('completed');
      allTaskStatus = false;
      localStorage.setItem('allTaskStatusLocal', allTaskStatus);
    }

    inp.addEventListener('focus', () => {
      warningMsg.classList.add('invisible');
    });
  });

  inp.addEventListener('focus', () => {
    warningMsg.classList.add('invisible');
  });
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const progressSpan = document.querySelector('.progress-span');
progressSpan.innerHTML = `${goalCount}/3 completed`;

allCheckBox.forEach((checkBox) => {
  if (allInpValue[checkBox.nextElementSibling.id]?.completed) {
    let checkBoxStatus = allInpValue[checkBox.nextElementSibling.id].completed;
    if (checkBoxStatus) {
      checkBox.src = url2;
      checkBox.classList.add('checked');
      checkBox.parentElement.classList.add('taskCompleted');
    } else {
      checkBox.src = url1;
      checkBox.classList.remove('checked');
      checkBox.parentElement.classList.remove('taskCompleted');
    }
  }

  checkBox.addEventListener('click', () => {
    if (input1.value !== '' && input2.value !== '' && input3.value !== '') {
      goalSection.classList.add('completed');
      allTaskStatus = true;
      localStorage.setItem('allTaskStatusLocal', allTaskStatus);

      toggleImg(checkBox);
      taskMsg.innerText = allQuotes[goalCount];
      progressSpan.innerHTML = `${goalCount}/3 completed`;
    } else {
      warningMsg.classList.remove('invisible');
      clearCheckBox();
    }
  });
});

// ++++++++++++++++++++++++++++++++++++++++++++++++

function clearCheckBox() {
  goalCount = 0;
  localStorage.setItem('goalCountLocal', goalCount);
  allTaskStatus = false;
  localStorage.setItem('allTaskStatusLocal', allTaskStatus);
  progressBar.style.width = 0;
  progressValue = 0;
  localStorage.setItem('progressValueLocal', progressValue);
  allCheckBox.forEach((box) => {
    box.src = 'blank.png';
    box.parentElement.classList.remove('taskCompleted');
    box.classList.remove('checked');
    allInpValue[box.nextElementSibling.id].completed = false;
    localStorage.setItem('allInpValueLocal', JSON.stringify(allInpValue));
  });
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function toggleImg(checkBox) {
  if (checkBox.src.includes(url1)) {
    checkBox.src = url2;
    progressValue = progressValue + 33.33;
    progressBar.style.width = progressValue + '%';
    localStorage.setItem('progressValueLocal', progressValue);
    checkBox.parentElement.classList.add('taskCompleted');
    goalCount++;
    localStorage.setItem('goalCountLocal', goalCount);
    checkBox.classList.add('checked');

    allInpValue[checkBox.nextElementSibling.id].completed = true;
    localStorage.setItem('allInpValueLocal', JSON.stringify(allInpValue));
  } else {
    checkBox.src = url1;
    progressValue = progressValue - 33.33;
    progressBar.style.width = progressValue + '%';
    localStorage.setItem('progressValueLocal', progressValue);

    checkBox.parentElement.classList.remove('taskCompleted');
    goalCount--;
    localStorage.setItem('goalCountLocal', goalCount);

    allInpValue[checkBox.nextElementSibling.id].completed = false;
    localStorage.setItem('allInpValueLocal', JSON.stringify(allInpValue));
    checkBox.classList.remove('checked');
  }
}
