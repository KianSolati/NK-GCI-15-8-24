document.addEventListener('DOMContentLoaded', function() {
    const userID = new URLSearchParams(window.location.search).get('id');

    if (userID) {
        // Fetching the user data based on the ID
        fetch(`/UserWithLogs/${userID}`)
            .then(response => response.json())
            .then(data => {
                if (data.user) {
                    document.getElementById('user-name').textContent = `${data.user.firstName} ${data.user.lastName}`;
                    document.getElementById('user-email').textContent = data.user.email;
                    document.getElementById('user-phone').textContent = data.user.phone;
                    document.getElementById('business-name').textContent = data.user.businessName || 'N/A';

                    const logsTableBody = document.getElementById('logs-table-body');
                    logsTableBody.innerHTML = '';  // Clear existing logs

                    data.logs.forEach(log => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${log.logDate}</td>
                            <td>${log.logType}</td>
                            <td>${log.notes}</td>
                        `;
                        logsTableBody.appendChild(row);
                    });
                } else {
                    alert('User not found!');
                }
            })
            .catch(error => console.error('Error fetching user history:', error));
    } else {
        alert('No user ID provided!');
    }
});
