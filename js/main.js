document.addEventListener('DOMContentLoaded', function() {
    // Load recent activities
    const activities = [
        { date: '2023-06-01', activity: 'New Student', user: 'John Doe', details: 'Registered for Grade 10' },
        { date: '2023-06-02', activity: 'Attendance', user: 'Sarah Smith', details: 'Marked attendance for Class 9B' }
    ];

    const container = document.getElementById('activity-container');
    
    container.innerHTML = `
        <table class="min-w-full">
            <thead>
                <tr class="border-b">
                    <th class="text-left py-3 px-4">Date</th>
                    <th class="text-left py-3 px-4">Activity</th>
                    <th class="text-left py-3 px-4">User</th>
                    <th class="text-left py-3 px-4">Details</th>
                </tr>
            </thead>
            <tbody>
                ${activities.map(activity => `
                    <tr class="border-b hover:bg-gray-50">
                        <td class="py-3 px-4">${activity.date}</td>
                        <td class="py-3 px-4">${activity.activity}</td>
                        <td class="py-3 px-4">${activity.user}</td>
                        <td class="py-3 px-4">${activity.details}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Mobile menu toggle
    const mobileMenuButton = document.createElement('div');
    mobileMenuButton.className = 'md:hidden fixed top-4 right-4 z-50 bg-blue-800 text-white p-2 rounded';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileMenuButton);
    
    mobileMenuButton.addEventListener('click', function() {
        const sidebar = document.querySelector('aside');
        sidebar.classList.toggle('hidden');
        sidebar.classList.toggle('fixed');
        sidebar.classList.toggle('inset-0');
        sidebar.classList.toggle('z-40');
    });
});