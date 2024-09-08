document.addEventListener("DOMContentLoaded", function() {
    // Placeholder for any future interactive features
    console.log("Dashboard is ready!");
    
    // Example: Add functionality to dynamically update revenue
    const revenueElement = document.querySelector('.revenue-graph h3');
    const updateRevenue = () => {
        // Simulate fetching new revenue data
        const newRevenue = (Math.random() * 500).toFixed(2);
        revenueElement.textContent = `$${newRevenue}`;
    };

    // Update revenue every 10 seconds (for demonstration)
    setInterval(updateRevenue, 10000);
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



    document.addEventListener("DOMContentLoaded", function() {
        const ratings = document.querySelectorAll('.rating');

        ratings.forEach(rating => {
            const ratingValue = parseInt(rating.getAttribute('data-rating'));

            for (let i = 0; i < 5; i++) {
                if (i < ratingValue) {
                    rating.children[i].classList.remove('far'); // Remove empty star class
                    rating.children[i].classList.add('fas'); // Add filled star class
                }
            }
        });
    });

