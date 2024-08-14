document.addEventListener('DOMContentLoaded', function() {
    const businessID = new URLSearchParams(window.location.search).get('id');

    if (businessID) {
        // Fetching the business data based on the ID
        fetch(`/BusinessWithLogs/${businessID}`)
            .then(response => response.json())
            .then(data => {
                if (data.business) {
                    document.getElementById('business-name').textContent = data.business.businessName;
                    document.getElementById('contact-type').textContent = data.business.contactType;
                    document.getElementById('contact-date').textContent = data.business.contactDate;
                    document.getElementById('business-notes').textContent = data.business.notes;

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
                    alert('Business not found!');
                }
            })
            .catch(error => console.error('Error fetching business history:', error));
    } else {
        alert('No business ID provided!');
    }
});
