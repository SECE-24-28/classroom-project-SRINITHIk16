/* ==========================================================
   SWIFTRECHARGE - UNIVERSAL JS FILE (WITHOUT API CODE)
   ========================================================== */

console.log("SwiftRecharge Core JS Loaded");

/* Helper */
function safeGet(id) {
    return document.getElementById(id);
}

/* ==========================================================
   LOGIN PAGE
   ========================================================== */
if (safeGet('loginForm')) {
    console.log("Login Page Loaded");

    safeGet('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const username = safeGet('username').value;
        const password = safeGet('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(u =>
            (u.email === username || u.mobile === username) &&
            u.password === password
        );

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful! Redirecting to dashboard...');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials! Try again.');
        }
    });
}

/* Quick login */
window.quickLogin = function (email, password) {
    safeGet('username').value = email;
    safeGet('password').value = password;
    setTimeout(() => {
        safeGet('loginForm').dispatchEvent(new Event('submit'));
    }, 300);
};

/* ==========================================================
   SIGNUP PAGE
   ========================================================== */
if (safeGet('signupForm')) {
    safeGet('signupForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const user = {
            name: safeGet('name').value,
            email: safeGet('email').value,
            mobile: safeGet('mobile').value,
            password: safeGet('password').value
        };

        if (!safeGet('terms').checked) {
            alert('Please accept terms & conditions.');
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(user));

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Account created! Redirecting to login...');
        window.location.href = "login.html";
    });

    /* Password Strength Meter */
    if (safeGet('password')) {
        safeGet('password').addEventListener('input', function () {
            const p = this.value;
            const bar = safeGet('strengthBar');
            const text = safeGet('passwordStrength');

            if (!bar || !text) return;

            let strength = 0;
            if (p.length >= 8) strength++;
            if (/[A-Z]/.test(p)) strength++;
            if (/[0-9]/.test(p)) strength++;
            if (/[^A-Za-z0-9]/.test(p)) strength++;

            const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
            const labels = ['Very Weak', 'Weak', 'Good', 'Strong'];

            bar.className = `h-full ${colors[strength]} w-${(strength + 1) * 25}`;
            text.textContent = `Password strength: ${labels[strength]}`;
        });
    }
}

/* ==========================================================
   DASHBOARD LOGIC
   ========================================================== */
if (safeGet('userName')) {
    document.addEventListener('DOMContentLoaded', () => {
        const user = JSON.parse(localStorage.getItem('currentUser'));

        if (!user) {
            window.location.href = "login.html";
            return;
        }

        safeGet('userName').textContent = user.name;
        safeGet('userInitial').textContent = user.name.charAt(0).toUpperCase();
        safeGet('welcomeName').textContent = user.name;

        loadRechargeHistory();
        updateDashboardStats();
    });
}

/* ==========================================================
   Recharge History
   ========================================================== */
function rechargePlan(amount) {
    const history = JSON.parse(localStorage.getItem('rechargeHistory')) || [];

    const entry = {
        amount,
        operator: "Unknown",
        number: "XXXXXXXXXX",
        date: new Date().toISOString()
    };

    history.push(entry);
    localStorage.setItem('rechargeHistory', JSON.stringify(history));

    alert("Recharge Successful!");
    loadRechargeHistory();
    updateDashboardStats();
}

function loadRechargeHistory() {
    const box = safeGet('recentRecharges');
    if (!box) return;

    const history = JSON.parse(localStorage.getItem('rechargeHistory')) || [];

    if (history.length === 0) {
        box.innerHTML = `<p class="text-gray-300">No recharge history found.</p>`;
        return;
    }

    box.innerHTML = history.slice(-5).reverse().map(h => `
        <div class="glass-effect p-4 rounded-lg flex justify-between">
            <p class="text-white">₹${h.amount}</p>
            <span class="text-gray-400 text-sm">${new Date(h.date).toDateString()}</span>
        </div>
    `).join("");
}

function updateDashboardStats() {
    const history = JSON.parse(localStorage.getItem('rechargeHistory')) || [];
    const total = history.reduce((sum, h) => sum + Number(h.amount), 0);

    safeGet('totalSpent').textContent = total;
    safeGet('rechargeCount').textContent = history.length;
}

/* Logout */
window.logout = function () {
    localStorage.removeItem('currentUser');
    window.location.href = "login.html";
};
