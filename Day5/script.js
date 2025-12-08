/* ==========================================================
   SWIFTRECHARGE - UNIVERSAL JS FILE
   Handles: Landing, Login, Signup, Dashboard, Recharge Page
   ========================================================== */

console.log("SwiftRecharge JS Loaded Successfully!");

/* ==========================================================
   HELPER: SAFE ELEMENT GETTER
   ========================================================== */
function safeGet(id) {
    return document.getElementById(id);
}

/* ==========================================================
   LOGIN PAGE
   ========================================================== */
if (safeGet('loginForm')) {
    console.log("Login Page Loaded Successfully.");

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
            alert('Invalid credentials! Try again or create an account.');
        }
    });

    // Quick login helper
    window.quickLogin = function (email, password) {
        safeGet('username').value = email;
        safeGet('password').value = password;
        setTimeout(() => {
            safeGet('loginForm').dispatchEvent(new Event('submit'));
        }, 500);
    };
}

/* ==========================================================
   SIGNUP PAGE
   ========================================================== */
if (safeGet('signupForm')) {
    safeGet('signupForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = safeGet('name').value;
        const email = safeGet('email').value;
        const mobile = safeGet('mobile').value;
        const password = safeGet('password').value;

        if (!safeGet('terms').checked) {
            alert('Please accept the terms and conditions');
            return;
        }

        const user = { name, email, mobile, password };
        localStorage.setItem('currentUser', JSON.stringify(user));

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Account created successfully! Redirecting to login...');
        window.location.href = 'login.html';
    });

    // Password strength checker
    if (safeGet('password')) {
        safeGet('password').addEventListener('input', function () {
            const password = this.value;
            const strengthBar = safeGet('strengthBar');
            const strengthText = safeGet('passwordStrength');

            if (!strengthBar || !strengthText) return;

            let strength = 0;
            if (password.length >= 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;

            const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
            const texts = ['Very Weak', 'Weak', 'Good', 'Strong'];

            strengthBar.className = `h-full ${colors[strength]} w-${(strength + 1) * 25}`;
            strengthText.textContent = `Password strength: ${texts[strength]}`;
        });
    }
}

/* ==========================================================
   DASHBOARD PAGE
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
        loadPlansFromAPI();
        updateDashboardStats();
    });
}

/* ==========================================================
   LOAD PLANS FROM API
   ========================================================== */
async function loadPlansFromAPI() {
    const loadingEl = safeGet('loadingPlans');
    const plansContainer = safeGet('plansContainer');
    const errorEl = safeGet('errorPlans');

    if (!loadingEl || !plansContainer) return;

    loadingEl.classList.remove('hidden');
    plansContainer.classList.add('hidden');
    errorEl?.classList.add('hidden');

    try {
        const res = await fetch("https://69354e0cfa8e704dafbd6ea3.mockapi.io/api/plan/Plan");

        if (!res.ok) throw new Error("Server error");

        const plans = await res.json();

        loadingEl.classList.add('hidden');
        plansContainer.innerHTML = "";
        plansContainer.classList.remove('hidden');

        plans.forEach(plan => {
            const card = document.createElement('div');
            card.className = "glass-effect rounded-xl p-5 plan-card";

            card.innerHTML = `
              <div>
                 <h3 class="text-xl text-white font-bold">₹${plan.price || "299"}</h3>
                 <p class="text-gray-300">${plan.validity || "28 Days"}</p>
                 <span class="operator-badge ${getOperatorClass(plan.operator || "Other")}">
                     ${plan.operator || "Other"}
                 </span>
              </div>

              <button class="w-full mt-5 bg-gradient-to-r from-purple-600 to-pink-600
                      text-white py-2 rounded-lg"
                      onclick="rechargePlan(${plan.price || 299})">
                Recharge Now
              </button>
            `;

            plansContainer.appendChild(card);
        });

    } catch (err) {
        loadingEl.classList.add('hidden');
        errorEl?.classList.remove('hidden');
    }
}

function getOperatorClass(op) {
    op = op.toLowerCase();
    if (op.includes("airtel")) return "airtel";
    if (op.includes("jio")) return "jio";
    if (op.includes("vi") || op.includes("vodafone")) return "vi";
    if (op.includes("bsnl")) return "bsnl";
    if (op.includes("mtnl")) return "mtnl";
    return "other";
}

/* ==========================================================
   RECHARGE AND HISTORY
   ========================================================== */
function rechargePlan(amount) {
    const history = JSON.parse(localStorage.getItem('rechargeHistory')) || [];

    const entry = {
        amount,
        operator: "Unknown",
        date: new Date().toISOString(),
        number: "XXXXXXXXXX"
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
    let total = 0;

    history.forEach(h => total += Number(h.amount));

    safeGet('totalSpent').textContent = total || 0;
    safeGet('rechargeCount').textContent = history.length;
}

/* ==========================================================
   RECHARGE PAGE (STATIC PLANS)
   ========================================================== */
window.recharge = function (amount) {
    alert("You selected ₹" + amount + " recharge plan");
    // window.location.href = "payment.html?amount=" + amount;
};

/* ==========================================================
   LOGOUT
   ========================================================== */
window.logout = function () {
    localStorage.removeItem('currentUser');
    window.location.href = "login.html";
};
