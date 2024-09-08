// Function to simulate checking condition
function checkCondition() {
    alert("Your condition is being checked. Stay tuned for results!");
  }
  
  // Function to simulate a video call
  function videoCall() {
    alert("Starting video call with Dr. Emilia Winson...");
  }
  
  // Simulating updating the progress
  document.addEventListener("DOMContentLoaded", function() {
    const progress = document.getElementById('progress');
    let progressValue = 80;
    
    function updateProgress() {
      if (progressValue < 100) {
        progressValue += 1;
        progress.innerHTML = progressValue + "%";
      }
    }
  
    setInterval(updateProgress, 2000); // Updates every 2 seconds
  });
  



  // Function to set active button and change sidebar content
function setActive(button, type) {
  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.segmented-control button');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Add active class to the clicked button
  button.classList.add('active');

  // Get sidebar and replace content based on button clicked
  const sidebar = document.getElementById('sidebar');
  
  if (type === 'prescriptions') {
    sidebar.innerHTML = `
      <div class="avatar-container">
        <img class="avatar" src="avatar.png" alt="avatar">
        <span class="avatar-label">Prescriptions</span>
      </div>
      <div class="prescription-card">
        <img src="avatar1.jpg" alt="Olivia Wild">
        <div class="prescription-details">
          <p class="prescription-name">Olivia Wild</p>
          <p class="prescription-time">12:00 - 12:45</p>
        </div>
        <span class="prescription-icon">👤</span>
      </div>
      <div class="prescription-card">
        <img src="avatar2.jpg" alt="Osip Mandelstam">
        <div class="prescription-details">
          <p class="prescription-name">Osip Mandelstam</p>
          <p class="prescription-time">14:00 - 14:45</p>
        </div>
        <span class="prescription-icon">👤</span>
      </div>
      <div class="prescription-card">
        <img src="avatar3.jpg" alt="Jennifer Parkins">
        <div class="prescription-details">
          <p class="prescription-name">Jennifer Parkins</p>
          <p class="prescription-time">15:00 - 15:45</p>
        </div>
        <span class="prescription-icon">👤</span>
      </div>
    `;
  } else if (type === 'reports') {
    sidebar.innerHTML = `
      <div class="avatar-container">
        <img class="avatar" src="avatar.png" alt="avatar">
        <span class="avatar-label">Reports</span>
      </div>
      <p>Reports content goes here...</p>
    `;
  }
}

function videoCall() {
  alert("Starting video call...");
}


document.addEventListener("DOMContentLoaded", function() {
  // Function to set active button and display content
  function setActive(button, type) {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.segmented-control button');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Add active class to the clicked button
    button.classList.add('active');

    // Get sidebar content containers
    const contentContainers = document.querySelectorAll('.sidebar-content');
    
    // Hide all content containers initially
    contentContainers.forEach(container => container.classList.remove('active'));
    
    // Show the appropriate content container based on button clicked
    const contentToShow = document.getElementById(type);
    if (contentToShow) {
      contentToShow.classList.add('active');
    }

    // Remove background image from sidebar
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.backgroundImage = 'none';
  }

  // Event listeners for buttons
  const buttons = document.querySelectorAll('.segmented-control button');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      setActive(this, this.getAttribute('data-type'));
    });
  });
});





const calendar = document.getElementById('calendarGrid');
const monthYear = document.getElementById('monthYear');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

let currentDate = new Date();

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

const renderCalendar = () => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();

    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);

    const daysArray = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);
    
    // Display current month and year
    monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentYear}`;

    // Clear the grid
    calendar.innerHTML = '';
    
    // Weekday headers
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    weekdays.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('weekday');
        dayDiv.textContent = day;
        calendar.appendChild(dayDiv);
    });

    // Add empty slots for days of the previous month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty');
        calendar.appendChild(emptyDiv);
    }

    // Add days of the current month
    daysArray.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        if (day === currentDay && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
            dayDiv.classList.add('current');
        }
        dayDiv.textContent = day;
        calendar.appendChild(dayDiv);
    });
};

// Event listeners for previous and next month buttons
prevMonthButton.addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    renderCalendar();
});

// Initial render
renderCalendar();
