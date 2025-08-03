document.addEventListener('DOMContentLoaded', function() {
    const students = [
        { id: 1, name: 'John Doe', grade: '10', section: 'A', contact: 'john@example.com' },
        { id: 2, name: 'Jane Smith', grade: '11', section: 'B', contact: 'jane@example.com' },
        { id: 3, name: 'Michael Johnson', grade: '12', section: 'C', contact: 'michael@example.com' }
    ];

    const container = document.getElementById('student-table-container');
    
    container.innerHTML = `
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead>
                    <tr class="border-b">
                        <th class="text-left py-3 px-4">ID</th>
                        <th class="text-left py-3 px-4">Name</th>
                        <th class="text-left py-3 px-4">Grade</th>
                        <th class="text-left py-3 px-4">Section</th>
                        <th class="text-left py-3 px-4">Contact</th>
                        <th class="text-left py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${students.map(student => `
                        <tr class="border-b hover:bg-gray-50">
                            <td class="py-3 px-4">${student.id}</td>
                            <td class="py-3 px-4">${student.name}</td>
                            <td class="py-3 px-4">${student.grade}</td>
                            <td class="py-3 px-4">${student.section}</td>
                            <td class="py-3 px-4">${student.contact}</td>
                            <td class="py-3 px-4">
                                <button class="text-blue-600 hover:text-blue-800 mr-2">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="text-red-600 hover:text-red-800">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
});