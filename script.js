document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Wattrix app...');

    let currentUser = null;

    // Fetch content from JSON
    fetch('content.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load content.json');
            return response.json();
        })
        .then(data => {
            console.log('Content loaded successfully');
            const featuresContainer = document.getElementById('features-container');
            data.features.forEach(feature => {
                const card = document.createElement('div');
                card.className = 'card bg-gray-100 p-6 rounded-lg shadow-md';
                card.innerHTML = `
                    <h3 class="text-xl font-semibold mb-2">${feature.title}</h3>
                    <p>${feature.description}</p>
                `;
                card.addEventListener('click', () => showModal(feature.title, feature.overview));
                featuresContainer.appendChild(card);
            });

            const technicalContainer = document.getElementById('technical-container');
            data.technical.forEach(tech => {
                const card = document.createElement('div');
                card.className = 'card bg-gray-100 p-6 rounded-lg shadow-md';
                card.innerHTML = `
                    <h3 class="text-xl font-semibold mb-2">${tech.title}</h3>
                    <p>${tech.description}</p>
                `;
                card.addEventListener('click', () => showModal(tech.title, tech.overview));
                technicalContainer.appendChild(card);
            });

            const usesContainer = document.getElementById('uses-container');
            data.useCases.forEach(use => {
                const card = document.createElement('div');
                card.className = 'card bg-gray-100 p-6 rounded-lg shadow-md';
                card.innerHTML = `
                    <h3 class="text-xl font-semibold mb-2">${use.title}</h3>
                    <p>${use.description}</p>
                `;
                card.addEventListener('click', () => showModal(use.title, use.overview));
                usesContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading content:', error));

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hamburger menu toggle for main nav
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.textContent = '☰';
        console.log('Main nav toggled:', navLinks.classList.contains('active') ? 'open' : 'closed');
    });

    // Contact modal
    const contactBtn = document.getElementById('contact-btn');
    const contactModal = document.getElementById('contact-modal');
    const contactCancel = document.getElementById('contact-cancel');
    const contactSubmit = document.getElementById('contact-submit');
    const formWarning = document.getElementById('form-warning');

    contactBtn.addEventListener('click', () => {
        contactModal.classList.remove('hidden');
        formWarning.classList.add('hidden');
    });

    contactCancel.addEventListener('click', () => {
        contactModal.classList.add('hidden');
        formWarning.classList.add('hidden');
    });

    contactSubmit.addEventListener('click', () => {
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;

        if (name && email && message) {
            formWarning.classList.add('hidden');
            const subject = encodeURIComponent(`Wattrix Contact Form Submission from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
            window.location.href = `mailto:info@wattrix.com?subject=${subject}&body=${body}`;
            contactModal.classList.add('hidden');
        } else {
            formWarning.classList.remove('hidden');
            setTimeout(() => formWarning.classList.add('hidden'), 3000);
        }
    });

    ['contact-name', 'contact-email', 'contact-message'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            formWarning.classList.add('hidden');
        });
    });

    // Feature/Use Case modal
    const detailModal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalClose = document.getElementById('modal-close');

    function showModal(title, description) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        detailModal.classList.remove('hidden');
    }

    modalClose.addEventListener('click', () => {
        detailModal.classList.add('hidden');
    });

    // Simulation modal
    const simulationBtn = document.getElementById('simulation-btn');
    const simulationModal = document.getElementById('simulation-modal');
    const simulationClose = document.getElementById('simulation-close');
    const simulationData = document.getElementById('simulation-data');
    const simulationHistory = document.getElementById('simulation-history');
    const simulationOutput = document.getElementById('simulation-output');
    const efficiencyTip = document.getElementById('efficiency-tip');
    const userSelectReceipt = document.getElementById('user-select-receipt');
    const userSelectAlerts = document.getElementById('user-select-alerts');
    const userSelectDetails = document.getElementById('user-select-details');
    const deviceSelectDetails = document.getElementById('device-select-details');
    const userSelectDevice = document.getElementById('user-select-device');
    const deviceSelectStatus = document.getElementById('device-select-status');
    const simulationSignin = document.getElementById('simulation-signin');
    const simulationApp = document.getElementById('simulation-app');
    const signinBtn = document.getElementById('signin-btn');
    const signinUsername = document.getElementById('signin-username');
    const signinPassword = document.getElementById('signin-password');
    const signinError = document.getElementById('signin-error');
    const signinLoading = document.getElementById('signin-loading');
    const simHamburger = document.getElementById('sim-hamburger');
    const simSidebar = document.getElementById('sim-sidebar');
    const profileIcon = document.getElementById('profile-icon');
    const profileMenu = document.getElementById('profile-menu');
    const logoutBtn = document.getElementById('logout-btn');
    const dashboardEnergy = document.getElementById('dashboard-energy');
    const dashboardCost = document.getElementById('dashboard-cost');
    const profileDetails = document.getElementById('profile-details');

    // Fetch users for sign-in
    let users = [];
    fetch('users.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load users.json');
            return response.json();
        })
        .then(data => {
            users = data.users;
            console.log('Users loaded successfully:', users);
        })
        .catch(error => console.error('Error loading users:', error));

    // Sign-in logic
    signinBtn.addEventListener('click', () => {
        const username = signinUsername.value;
        const password = signinPassword.value;
        signinError.classList.add('hidden');
        signinLoading.classList.remove('hidden');
        setTimeout(() => {
            const user = users.find(u => u.username === username && u.password === password);
            signinLoading.classList.add('hidden');
            if (user) {
                currentUser = user;
                simulationSignin.classList.add('hidden');
                simulationApp.classList.remove('hidden');
                simSidebar.classList.remove('hidden');
                simHamburger.classList.remove('hidden');
                switchView('dashboard');
                updateSimulationContent();
                updateSelectOptions();
                updateProfileDetails();
                console.log('User signed in:', username);
            } else {
                signinError.classList.remove('hidden');
                setTimeout(() => signinError.classList.add('hidden'), 3000);
            }
        }, 1000);
    });

    // Simulation hamburger menu (mobile only)
    simHamburger.addEventListener('click', () => {
        simSidebar.classList.toggle('active');
        simHamburger.textContent = '☰';
        if (simSidebar.classList.contains('active')) {
            simSidebar.classList.add('animate-slide-in');
            console.log('Sidebar opened: active class added');
        } else {
            simSidebar.classList.remove('animate-slide-in');
            console.log('Sidebar closed: active class removed');
        }
    });

    // Sidebar menu event delegation
    simSidebar.addEventListener('click', (e) => {
        console.log('Sidebar clicked, target:', e.target, 'classList:', e.target.classList);
        const tabBtn = e.target.closest('.tab-btn');
        if (tabBtn) {
            const viewId = tabBtn.id.replace('tab-', '');
            console.log('Sidebar button clicked, navigating to:', viewId);
            switchView(viewId);
            simSidebar.classList.remove('active');
            simSidebar.classList.remove('animate-slide-in');
            simHamburger.textContent = '☰';
            console.log('Sidebar closed after navigation to:', viewId);
        } else {
            console.log('Sidebar click ignored: not a tab button');
        }
    });

    simSidebar.addEventListener('touchstart', (e) => {
        console.log('Sidebar touched, target:', e.target, 'classList:', e.target.classList);
        const tabBtn = e.target.closest('.tab-btn');
        if (tabBtn) {
            e.preventDefault(); // Prevent default touch behavior
            const viewId = tabBtn.id.replace('tab-', '');
            console.log('Sidebar button touched, navigating to:', viewId);
            switchView(viewId);
            simSidebar.classList.remove('active');
            simSidebar.classList.remove('animate-slide-in');
            simHamburger.textContent = '☰';
            console.log('Sidebar closed after touch navigation to:', viewId);
        } else {
            console.log('Sidebar touch ignored: not a tab button');
        }
    });

    // Profile menu toggle
    profileIcon.addEventListener('click', () => {
        profileMenu.classList.toggle('active');
        console.log('Profile menu toggled:', profileMenu.classList.contains('active') ? 'open' : 'closed');
    });

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        simulationApp.classList.add('hidden');
        simulationSignin.classList.remove('hidden');
        profileMenu.classList.remove('active');
        simSidebar.classList.remove('active');
        simSidebar.classList.add('hidden');
        simHamburger.classList.add('hidden');
        simHamburger.textContent = '☰';
        signinUsername.value = '';
        signinPassword.value = '';
        simulationOutput.innerHTML = '';
        console.log('User logged out');
    });

    simulationBtn.addEventListener('click', () => {
        simulationModal.classList.remove('hidden');
        simulationSignin.classList.remove('hidden');
        simulationApp.classList.add('hidden');
        simSidebar.classList.add('hidden');
        simHamburger.classList.add('hidden');
        signinUsername.value = '';
        signinPassword.value = '';
        currentUser = null;
        simSidebar.classList.remove('active');
        simHamburger.textContent = '☰';
        console.log('Simulation modal opened');
    });

    simulationClose.addEventListener('click', () => {
        simulationModal.classList.add('hidden');
        simulationOutput.innerHTML = '';
        simSidebar.classList.remove('active');
        simSidebar.classList.add('hidden');
        simHamburger.classList.add('hidden');
        simHamburger.textContent = '☰';
        console.log('Simulation modal closed');
    });

    // Real-time code snippet generation and chart data
    const codeSnippet = document.getElementById('code-snippet');
    const chartDataPoints = [];
    const maxChartPoints = 10;
    let userTimeZone = 'UTC';
    let deviceStates = {};
    let alertStates = {};
    let lastPower = {};

    try {
        if (!document.querySelector("#power-chart")) {
            throw new Error('Power chart container not found');
        }
        const chart = new ApexCharts(document.querySelector("#power-chart"), {
            chart: {
                type: 'line',
                height: 300,
                animations: { enabled: false }
            },
            series: [{
                name: 'Power Usage (W)',
                data: []
            }],
            xaxis: {
                categories: [],
                title: { text: 'Time (HH:mm)' },
                type: 'datetime',
                labels: {
                    format: 'HH:mm',
                    datetimeUTC: false,
                    datetimeFormatter: {
                        hour: 'HH:mm'
                    }
                }
            },
            yaxis: {
                title: { text: 'Power (W)' }
            },
            title: {
                text: 'Wattrix Real-Time Power Usage',
                align: 'center'
            },
            tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex }) {
                    const data = chartDataPoints[chartDataPoints.length - maxChartPoints + dataPointIndex] || chartDataPoints[dataPointIndex];
                    if (!data) return '<div>No data</div>';
                    const localTime = new Date(data.timestamp).toLocaleString('en-US', { timeZone: userTimeZone, hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    return `
                        <div class="p-2 bg-white text-black rounded shadow">
                            <div><strong>User ID:</strong> ${data.userId}</div>
                            <div><strong>Device ID:</strong> ${data.deviceId}</div>
                            <div><strong>Power:</strong> ${data.power} W</div>
                            <div><strong>Voltage:</strong> ${data.voltage} V</div>
                            <div><strong>Current:</strong> ${data.current} A</div>
                            <div><strong>Timestamp:</strong> ${localTime}</div>
                        </div>
                    `;
                }
            },
            colors: ['#1e40af'],
            stroke: { curve: 'smooth' },
            dataPointSelection: function (event, chartContext, { dataPointIndex }) {
                const data = chartDataPoints[chartDataPoints.length - maxChartPoints + dataPointIndex] || chartDataPoints[dataPointIndex];
                if (!data) return;
                const localTime = new Date(data.timestamp).toLocaleString('en-US', { timeZone: userTimeZone, hour: '2-digit', minute: '2-digit', second: '2-digit' });
                alert(`User: ${data.userId}\nDevice: ${data.deviceId}\nPower: ${data.power} W\nVoltage: ${data.voltage} V\nCurrent: ${data.current} A\nTimestamp: ${localTime}`);
            },
            responsive: [{
                breakpoint: 768,
                options: {
                    chart: { height: 250 },
                    title: { text: '' },
                    yaxis: { title: { text: '' } },
                    xaxis: { labels: { style: { fontSize: '10px' } } },
                    tooltip: { style: { fontSize: '10px' } }
                }
            }, {
                breakpoint: 640,
                options: {
                    chart: { height: 200 },
                    xaxis: { labels: { style: { fontSize: '8px' } } }
                }
            }]
        });
        chart.render().catch(error => console.error('Error rendering power chart:', error));

        if (!document.querySelector("#simulation-chart")) {
            throw new Error('Simulation chart container not found');
        }
        const simulationChart = new ApexCharts(document.querySelector("#simulation-chart"), {
            chart: {
                type: 'line',
                height: 200,
                animations: { enabled: false }
            },
            series: [{
                name: 'Power Usage (W)',
                data: []
            }],
            xaxis: {
                categories: [],
                title: { text: 'Time (HH:mm)' },
                type: 'datetime',
                labels: {
                    format: 'HH:mm',
                    datetimeUTC: false,
                    datetimeFormatter: {
                        hour: 'HH:mm'
                    }
                }
            },
            yaxis: {
                title: { text: 'Power (W)' }
            },
            colors: ['#1e40af'],
            stroke: { curve: 'smooth' },
            responsive: [{
                breakpoint: 768,
                options: {
                    chart: { height: 150 },
                    title: { text: '' },
                    yaxis: { title: { text: '' } },
                    xaxis: { labels: { style: { fontSize: '8px' } } }
                }
            }, {
                breakpoint: 640,
                options: {
                    chart: { height: 120 },
                    xaxis: { labels: { style: { fontSize: '7px' } } }
                }
            }]
        });
        simulationChart.render().catch(error => console.error('Error rendering simulation chart:', error));

        // Initialize Flatpickr
        flatpickr('#date-picker', {
            mode: 'range',
            enableTime: true,
            dateFormat: 'Y-m-d H:i',
            time_24hr: true,
            onChange: function (selectedDates) {
                if (selectedDates.length === 2) {
                    const start = new Date(selectedDates[0]).getTime();
                    const end = new Date(selectedDates[1]).getTime();
                    const filteredData = chartDataPoints.filter(d => {
                        const time = new Date(d.timestamp).getTime();
                        return time >= start && time <= end;
                    });
                    chart.updateOptions({
                        xaxis: { categories: filteredData.map(d => d.timestamp) }
                    }).catch(error => console.error('Error updating power chart options:', error));
                    chart.updateSeries([{ data: filteredData.map(d => d.power) }]).catch(error => console.error('Error updating power chart series:', error));
                    console.log('Chart filtered to range:', selectedDates);
                }
            }
        });

        let lineCount = 0;
        const maxLines = 1000;

        function generateDataLine() {
            try {
                const voltage = (220 + Math.random() * 10).toFixed(2);
                const current = (0.5 + Math.random() * 2).toFixed(2);
                const deviceId = `device_${Math.floor(Math.random() * 5) + 1}`;
                const userId = currentUser ? currentUser.username : `user_${Math.floor(Math.random() * 10) + 1}`;
                const power = deviceStates[`${userId}-${deviceId}`] === false ? 0 : (voltage * current).toFixed(2);
                const energy_kWh = deviceStates[`${userId}-${deviceId}`] === false ? 0 : (power / 1000 / 3600).toFixed(6);
                const timestamp = new Date().toISOString();

                const data = { timestamp, userId, deviceId, voltage, current, power, energy_kWh };
                chartDataPoints.push(data);

                // Check for irregularities
                if (alertStates[userId] && lastPower[`${userId}-${deviceId}`]) {
                    const prevPower = lastPower[`${userId}-${deviceId}`];
                    if (power > 200 || (prevPower > 0 && Math.abs(power - prevPower) / prevPower > 0.5)) {
                        simulationOutput.innerHTML = `<strong>Alert!</strong> ${userId} on ${deviceId}: ${power > 200 ? 'High usage' : 'Irregular spike'} detected (${power} W).`;
                        alert(`Alert: ${userId} on ${deviceId} - ${power > 200 ? 'High usage' : 'Irregular spike'} (${power} W)`);
                    }
                }
                lastPower[`${userId}-${deviceId}`] = Number(power);

                const displayData = chartDataPoints.length ? chartDataPoints.slice(-maxChartPoints) : [{
                    timestamp: new Date().toISOString(),
                    userId: 'user_1',
                    deviceId: 'device_1',
                    power: 150.23,
                    voltage: 220.50,
                    current: 0.68,
                    energy_kWh: 0.000042
                }];
                chart.updateOptions({
                    xaxis: { categories: displayData.map(d => d.timestamp) }
                }).catch(error => console.error('Error updating power chart options:', error));
                chart.updateSeries([{ data: displayData.map(d => d.power) }]).catch(error => console.error('Error updating power chart series:', error));

                const localData = {
                    ...data,
                    timestamp: new Date(timestamp).toLocaleString('en-US', {
                        timeZone: userTimeZone,
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })
                };
                const line = `<span class="code-tooltip" data-tooltip="This data point shows how Wattrix tracks power for a specific user and device, like who’s using electricity and how much.">${JSON.stringify(localData, null, 2)}</span>`;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = line;
                codeSnippet.appendChild(tempDiv.firstChild);
                Prism.highlightElement(codeSnippet);

                lineCount++;
                if (lineCount >= maxLines) {
                    codeSnippet.innerHTML = '';
                    lineCount = 0;
                    console.log('Code snippet reset after 30 minutes');
                }

                // Auto-scroll to the bottom
                codeSnippet.scrollTo({
                    top: codeSnippet.scrollHeight,
                    behavior: 'smooth'
                });
                console.log('Generated data line:', localData);

                if (!simulationModal.classList.contains('hidden')) {
                    updateSimulationContent();
                    updateSelectOptions();
                    updateDashboardStats();
                    updateProfileDetails();
                }
            } catch (error) {
                console.error('Error generating data line:', error);
            }
        }

        setInterval(generateDataLine, 5000);

        function updateSelectOptions() {
            const users = [...new Set(chartDataPoints.map(d => d.userId))];
            const devices = [...new Set(chartDataPoints.map(d => d.deviceId))];
            console.log('Updating select options, users:', users, 'devices:', devices);

            [userSelectReceipt, userSelectAlerts, userSelectDetails, userSelectDevice].forEach(select => {
                const currentValue = select.value;
                select.innerHTML = '<option value="">Select a user</option>' +
                    users.map(user => `<option value="${user}" ${user === currentValue ? 'selected' : ''}>${user}</option>`).join('');
                console.log(`Updated ${select.id}, current value: ${select.value}`);
            });

            [deviceSelectDetails, deviceSelectStatus].forEach(select => {
                const currentValue = select.value;
                select.innerHTML = '<option value="">Select a device</option>' +
                    devices.map(device => `<option value="${device}" ${device === currentValue ? 'selected' : ''}>${device}</option>`).join('');
                console.log(`Updated ${select.id}, current value: ${select.value}`);
            });

            // Handle userSelectDevice change to update deviceSelectStatus
            userSelectDevice.addEventListener('change', () => {
                const selectedUser = userSelectDevice.value;
                const previousDevice = deviceSelectStatus.value; // Store current device selection
                console.log('User selected:', selectedUser, 'Previous device:', previousDevice);
                const userDevices = [...new Set(chartDataPoints.filter(d => d.userId === selectedUser).map(d => d.deviceId))];
                console.log('Available devices for user:', selectedUser, userDevices);
                deviceSelectStatus.innerHTML = '<option value="">Select a device</option>' +
                    userDevices.map(device => `<option value="${device}" ${device === previousDevice && userDevices.includes(previousDevice) ? 'selected' : ''}>${device}</option>`).join('');
                console.log(`Updated device-select-status, new value: ${deviceSelectStatus.value}`);
            });
        }

        function switchView(viewId) {
            console.log('Attempting to switch view to:', viewId);
            const viewElement = document.getElementById(`view-${viewId}`);
            if (!viewElement) {
                console.error(`View element not found: view-${viewId}`);
                return;
            }
            document.querySelectorAll('.view').forEach(view => view.classList.add('hidden'));
            viewElement.classList.remove('hidden');
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            const tabBtn = document.getElementById(`tab-${viewId}`);
            if (tabBtn) {
                tabBtn.classList.add('active');
                console.log(`Tab button activated: tab-${viewId}`);
            } else {
                console.error(`Tab button not found: tab-${viewId}`);
            }
            simulationOutput.innerHTML = '';
            simSidebar.classList.remove('active');
            simSidebar.classList.remove('animate-slide-in');
            simHamburger.textContent = '☰';
            updateSimulationContent();
            console.log(`Switched to view: ${viewId}`);
        }

        function updateSimulationContent() {
            try {
                const latestData = chartDataPoints.filter(d => d.userId === currentUser?.username)[chartDataPoints.length - 1] || {
                    userId: currentUser?.username || 'user_1',
                    deviceId: 'device_1',
                    power: 150.23,
                    voltage: 220.50,
                    current: 0.68,
                    energy_kWh: 0.000042,
                    timestamp: new Date().toISOString()
                };
                const localTime = new Date(latestData.timestamp).toLocaleString('en-US', {
                    timeZone: userTimeZone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                simulationData.innerHTML = `
                    User ID: ${latestData.userId}<br>
                    Device ID: ${latestData.deviceId}<br>
                    Power: ${latestData.power} W<br>
                    Voltage: ${latestData.voltage} V<br>
                    Current: ${latestData.current} A<br>
                    Timestamp: ${localTime}
                `;

                const historyData = chartDataPoints.filter(d => d.userId === currentUser?.username).slice(-5) || [latestData];
                const deviceTotals = chartDataPoints.reduce((totals, d) => {
                    totals[d.deviceId] = (totals[d.deviceId] || 0) + Number(d.power);
                    return totals;
                }, {});
                simulationHistory.innerHTML = historyData.map(d => {
                    const time = new Date(d.timestamp).toLocaleString('en-US', {
                        timeZone: userTimeZone,
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    const cost = (d.energy_kWh * 3600 * 0.15).toFixed(2);
                    return `
                        <tr>
                            <td class="p-1">${time}</td>
                            <td class="p-1">${d.userId}</td>
                            <td class="p-1">${d.deviceId}</td>
                            <td class="p-1">${d.power}</td>
                            <td class="p-1">${(d.energy_kWh * 3600).toFixed(6)}</td>
                            <td class="p-1">${cost}</td>
                            <td class="p-1">${deviceTotals[d.deviceId].toFixed(2)}</td>
                        </tr>
                    `;
                }).join('');

                simulationChart.updateOptions({
                    xaxis: { categories: historyData.map(d => d.timestamp) }
                }).catch(error => console.error('Error updating simulation chart options:', error));
                simulationChart.updateSeries([{ data: historyData.map(d => d.power) }]).catch(error => console.error('Error updating simulation chart series:', error));

                efficiencyTip.innerHTML = latestData.power > 200 ?
                    'High power usage detected! Turn off unused devices to save up to 10%.' :
                    'Power usage is optimal. Keep monitoring to maintain efficiency!';
            } catch (error) {
                console.error('Error updating simulation content:', error);
            }
        }

        function updateDashboardStats() {
            const userData = chartDataPoints.filter(d => d.userId === currentUser?.username);
            const totalEnergy = userData.reduce((sum, d) => sum + Number(d.energy_kWh) * 3600, 0).toFixed(6);
            const totalCost = (totalEnergy * 0.15).toFixed(2);
            dashboardEnergy.textContent = `${totalEnergy} kWh`;
            dashboardCost.textContent = `$${totalCost}`;
        }

        function updateProfileDetails() {
            if (currentUser) {
                const userData = chartDataPoints.filter(d => d.userId === currentUser.username);
                const totalEnergy = userData.reduce((sum, d) => sum + Number(d.energy_kWh) * 3600, 0).toFixed(6);
                const totalCost = (totalEnergy * 0.15).toFixed(2);
                profileDetails.innerHTML = `
                    Username: ${currentUser.username}<br>
                    Email: ${currentUser.email}<br>
                    Total Energy: ${totalEnergy} kWh<br>
                    Total Cost: $${totalCost}
                `;
            }
        }

        // Navigation tab event listeners for horizontal nav
        ['dashboard', 'history', 'receipt', 'expenses', 'alerts', 'user-details', 'device-details', 'device-status', 'profile'].forEach(view => {
            const tabBtn = document.getElementById(`tab-${view}`);
            if (tabBtn) {
                ['click', 'touchstart'].forEach(eventType => {
                    tabBtn.addEventListener(eventType, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log(`Horizontal nav button ${eventType}ed: ${view}`);
                        switchView(view);
                    });
                });
            }
        });

        document.getElementById('print-receipt').addEventListener('click', () => {
            const selectedUser = userSelectReceipt.value;
            if (!selectedUser) {
                simulationOutput.innerHTML = '<strong>Error:</strong> Please select a user.';
                return;
            }
            const userData = chartDataPoints.filter(d => d.userId === selectedUser);
            if (userData.length === 0) {
                simulationOutput.innerHTML = '<strong>No data found for this user.</strong>';
                return;
            }
            const totalEnergy = userData.reduce((sum, d) => sum + Number(d.energy_kWh) * 3600, 0);
            const totalCost = (totalEnergy * 0.15).toFixed(2);
            const devices = [...new Set(userData.map(d => d.deviceId))];
            const details = userData.map(d => {
                const localTime = new Date(d.timestamp).toLocaleString('en-US', {
                    timeZone: userTimeZone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                return `
                    Device: ${d.deviceId}<br>
                    Power: ${d.power} W<br>
                    Energy: ${(d.energy_kWh * 3600).toFixed(6)} kWh<br>
                    Cost: $${((d.energy_kWh * 3600) * 0.15).toFixed(2)}<br>
                    Timestamp: ${localTime}<br>
                    ---
                `;
            }).join('');
            simulationOutput.innerHTML = `
                <strong>Electricity Receipt for ${selectedUser}</strong><br>
                Devices: ${devices.join(', ')}<br>
                Total Energy: ${totalEnergy.toFixed(6)} kWh<br>
                Total Cost: $${totalCost} (at $0.15/kWh)<br>
                <strong>Details:</strong><br>
                ${details}
            `;
        });

        document.getElementById('check-expenses').addEventListener('click', () => {
            const totalEnergy = chartDataPoints.slice(-5).reduce((sum, d) => sum + Number(d.energy_kWh) * 3600, 0);
            const cost = (totalEnergy * 0.15).toFixed(2);
            simulationOutput.innerHTML = `
                <strong>Expenses (Last 5 Minutes)</strong><br>
                Total Energy: ${totalEnergy.toFixed(6)} kWh<br>
                Total Cost: $${cost} (at $0.15/kWh)<br>
                Users: ${[...new Set(chartDataPoints.slice(-5).map(d => d.userId))].join(', ')}
            `;
        });

        document.getElementById('billing-split').addEventListener('click', () => {
            const users = [...new Set(chartDataPoints.slice(-5).map(d => d.userId))];
            const split = users.map(user => {
                const userData = chartDataPoints.slice(-5).filter(d => d.userId === user);
                const totalEnergy = userData.reduce((sum, d) => sum + Number(d.energy_kWh) * 3600, 0);
                return {
                    user,
                    energy: totalEnergy.toFixed(6),
                    cost: (totalEnergy * 0.15).toFixed(2)
                };
            });
            simulationOutput.innerHTML = `
                <strong>Billing Split (Last 5 Minutes)</strong><br>
                ${split.map(s => `${s.user}: ${s.energy} kWh, $${s.cost}`).join('<br>')}
            `;
        });

        document.getElementById('toggle-alert').addEventListener('click', () => {
            const selectedUser = userSelectAlerts.value;
            if (!selectedUser) {
                simulationOutput.innerHTML = '<strong>Error:</strong> Please select a user.';
                return;
            }
            alertStates[selectedUser] = !alertStates[selectedUser];
            simulationOutput.innerHTML = `<strong>Alerts for ${selectedUser}</strong> turned ${alertStates[selectedUser] ? 'ON' : 'OFF'}.`;
        });

        document.getElementById('report-user').addEventListener('click', () => {
            const selectedUser = userSelectAlerts.value;
            if (!selectedUser) {
                simulationOutput.innerHTML = '<strong>Error:</strong> Please select a user.';
                return;
            }
            const userData = chartDataPoints.filter(d => d.userId === selectedUser);
            if (userData.length === 0) {
                simulationOutput.innerHTML = '<strong>No data found for this user.</strong>';
                return;
            }
            const devices = [...new Set(userData.map(d => d.deviceId))];
            const totalPower = userData.reduce((sum, d) => sum + Number(d.power), 0);
            const totalEnergy = userData.reduce((sum, d) => sum + Number(d.energy_kWh) * 3600, 0);
            const totalCost = (totalEnergy * 0.15).toFixed(2);
            simulationOutput.innerHTML = `
                <strong>User Report: ${selectedUser}</strong><br>
                Devices: ${devices.join(', ')}<br>
                Total Power: ${totalPower.toFixed(2)} W<br>
                Total Energy: ${totalEnergy.toFixed(6)} kWh<br>
                Total Cost: $${totalCost}<br>
                <strong>Recommendation:</strong> Review usage for potential overuse or irregularities.
            `;
        });

        document.getElementById('show-user-details').addEventListener('click', () => {
            const selectedUser = userSelectDetails.value;
            if (!selectedUser) {
                simulationOutput.innerHTML = '<strong>Error:</strong> Please select a user.';
                return;
            }
            const userData = chartDataPoints.filter(d => d.userId === selectedUser);
            if (userData.length === 0) {
                simulationOutput.innerHTML = '<strong>No data found for this user.</strong>';
                return;
            }
            const devices = [...new Set(userData.map(d => d.deviceId))];
            const totalPower = userData.reduce((sum, d) => sum + Number(d.power), 0);
            const totalEnergy = userData.reduce((sum, d) => sum + Number(d.energy_kWh) * 3600, 0);
            const totalCost = (totalEnergy * 0.15).toFixed(2);
            const details = userData.map(d => {
                const localTime = new Date(d.timestamp).toLocaleString('en-US', {
                    timeZone: userTimeZone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                return `
                    Device: ${d.deviceId}<br>
                    Power: ${d.power} W<br>
                    Energy: ${(d.energy_kWh * 3600).toFixed(6)} kWh<br>
                    Cost: $${((d.energy_kWh * 3600) * 0.15).toFixed(2)}<br>
                    Timestamp: ${localTime}<br>
                    ---
                `;
            }).join('');
            simulationOutput.innerHTML = `
                <strong>User Details: ${selectedUser}</strong><br>
                Devices: ${devices.join(', ')}<br>
                Total Power: ${totalPower.toFixed(2)} W<br>
                Total Energy: ${totalEnergy.toFixed(6)} kWh<br>
                Total Cost: $${totalCost}<br>
                <strong>Usage Records:</strong><br>
                ${details}
            `;
        });

        document.getElementById('show-device-details').addEventListener('click', () => {
            const selectedDevice = deviceSelectDetails.value;
            if (!selectedDevice) {
                simulationOutput.innerHTML = '<strong>Error:</strong> Please select a device.';
                return;
            }
            const deviceData = chartDataPoints.filter(d => d.deviceId === selectedDevice);
            if (deviceData.length === 0) {
                simulationOutput.innerHTML = '<strong>No data found for this device.</strong>';
                return;
            }
            const users = [...new Set(deviceData.map(d => d.userId))];
            const totalPower = deviceData.reduce((sum, d) => sum + Number(d.power), 0);
            const totalEnergy = deviceData.reduce((sum, d) => sum + Number(d.energy_kWh) * 3600, 0);
            const totalCost = (totalEnergy * 0.15).toFixed(2);
            const details = deviceData.map(d => {
                const localTime = new Date(d.timestamp).toLocaleString('en-US', {
                    timeZone: userTimeZone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                return `
                    User: ${d.userId}<br>
                    Power: ${d.power} W<br>
                    Energy: ${(d.energy_kWh * 3600).toFixed(6)} kWh<br>
                    Cost: $${((d.energy_kWh * 3600) * 0.15).toFixed(2)}<br>
                    Timestamp: ${localTime}<br>
                    ---
                `;
            }).join('');
            simulationOutput.innerHTML = `
                <strong>Device Details: ${selectedDevice}</strong><br>
                Users: ${users.join(', ')}<br>
                Total Power: ${totalPower.toFixed(2)} W<br>
                Total Energy: ${totalEnergy.toFixed(6)} kWh<br>
                Total Cost: $${totalCost}<br>
                <strong>Usage Records:</strong><br>
                ${details}
            `;
        });

        document.getElementById('toggle-device').addEventListener('click', () => {
            const selectedUser = userSelectDevice.value;
            const selectedDevice = deviceSelectStatus.value;
            if (!selectedUser || !selectedDevice) {
                simulationOutput.innerHTML = '<strong>Error:</strong> Please select a user and device.';
                return;
            }
            const key = `${selectedUser}-${selectedDevice}`;
            deviceStates[key] = !deviceStates[key];
            simulationOutput.innerHTML = `<strong>Device ${selectedDevice}</strong> for ${selectedUser} turned ${deviceStates[key] ? 'ON' : 'OFF'}.`;
        });

        document.getElementById('show-device-status').addEventListener('click', () => {
            const selectedUser = userSelectDevice.value;
            const selectedDevice = deviceSelectStatus.value;
            console.log('Show device status clicked, user:', selectedUser, 'device:', selectedDevice);
            if (!selectedUser || !selectedDevice) {
                simulationOutput.innerHTML = '<strong>Error:</strong> Please select a user and device.';
                return;
            }
            const key = `${selectedUser}-${selectedDevice}`;
            const deviceData = chartDataPoints.filter(d => d.userId === selectedUser && d.deviceId === selectedDevice);
            if (deviceData.length === 0) {
                simulationOutput.innerHTML = `<strong>No data found for ${selectedDevice} used by ${selectedUser}.</strong>`;
                return;
            }
            const latestData = deviceData[deviceData.length - 1];
            const localTime = new Date(latestData.timestamp).toLocaleString('en-US', {
                timeZone: userTimeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            simulationOutput.innerHTML = `
                <strong>Device Status: ${selectedDevice}</strong><br>
                User: ${selectedUser}<br>
                State: ${deviceStates[key] === false ? 'OFF' : 'ON'}<br>
                Power: ${latestData.power} W<br>
                Voltage: ${latestData.voltage} V<br>
                Current: ${latestData.current} A<br>
                Energy: ${(latestData.energy_kWh * 3600).toFixed(6)} kWh<br>
                Cost: $${((latestData.energy_kWh * 3600) * 0.15).toFixed(2)}<br>
                Timestamp: ${localTime}
            `;
        });

        document.getElementById('clear-history').addEventListener('click', () => {
            const selectedUser = userSelectDevice.value;
            const selectedDevice = deviceSelectStatus.value;
            if (!selectedUser || !selectedDevice) {
                simulationOutput.innerHTML = '<strong>Error:</strong> Please select a user and device.';
                return;
            }
            chartDataPoints.splice(0, chartDataPoints.length, ...chartDataPoints.filter(d => !(d.userId === selectedUser && d.deviceId === selectedDevice)));
            simulationOutput.innerHTML = `<strong>History cleared for ${selectedDevice} used by ${selectedUser}.</strong>`;
            updateSimulationContent();
            updateSelectOptions();
            updateDashboardStats();
            updateProfileDetails();
        });

        document.getElementById('download-data').addEventListener('click', () => {
            const selectedUser = userSelectDevice.value;
            const selectedDevice = deviceSelectStatus.value;
            if (!selectedUser || !selectedDevice) {
                simulationOutput.innerHTML = '<strong>Error:</strong> Please select a user and device.';
                return;
            }
            const deviceData = chartDataPoints.filter(d => d.userId === selectedUser && d.deviceId === selectedDevice);
            if (deviceData.length === 0) {
                simulationOutput.innerHTML = `<strong>No data found for ${selectedDevice} used by ${selectedUser}.</strong>`;
                return;
            }
            const csv = [
                'Timestamp,User ID,Device ID,Power (W),Voltage (V),Current (A),Energy (kWh)',
                ...deviceData.map(d => [
                    new Date(d.timestamp).toLocaleString('en-US', { timeZone: userTimeZone }),
                    d.userId,
                    d.deviceId,
                    d.power,
                    d.voltage,
                    d.current,
                    (d.energy_kWh * 3600).toFixed(6)
                ].join(','))
            ].join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${selectedUser}_${selectedDevice}_data.csv`;
            a.click();
            URL.revokeObjectURL(url);
            simulationOutput.innerHTML = `<strong>Data downloaded for ${selectedDevice} used by ${selectedUser}.</strong>`;
        });
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
});