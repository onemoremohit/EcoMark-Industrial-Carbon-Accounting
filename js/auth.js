// EcoMark Authentication Handlers

document.addEventListener('DOMContentLoaded', () => {
    // 1. Password Visibility Toggle (Common)
    const togglePassBtn = document.getElementById('togglePassword');
    const passInput = document.getElementById('password');
    if (togglePassBtn && passInput) {
        togglePassBtn.addEventListener('click', () => {
            const isPass = passInput.type === 'password';
            passInput.type = isPass ? 'text' : 'password';
            const icon = togglePassBtn.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = isPass ? 'visibility_off' : 'visibility';
            }
        });
    }

    // 2. Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const errorBanner = document.getElementById('errorBanner');
            const errorMessage = document.getElementById('errorMessage');
            const submitBtn = loginForm.querySelector('button[type="submit"]');

            if (errorBanner) errorBanner.classList.add('hidden');

            const originalHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="material-symbols-outlined animate-spin">refresh</span> Logging in...`;

            setTimeout(() => {
                const res = DB.login(email, password);
                if (res.success) {
                    submitBtn.innerHTML = `<span class="material-symbols-outlined">check_circle</span> Success!`;
                    submitBtn.classList.replace('bg-primary', 'bg-score-a');
                    
                    setTimeout(() => {
                        if (res.user.role === 'admin') {
                            window.location.href = 'admin/dashboard.html';
                        } else {
                            window.location.href = 'company/dashboard.html';
                        }
                    }, 500);
                } else {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalHTML;
                    if (errorBanner && errorMessage) {
                        errorMessage.textContent = res.message;
                        errorBanner.classList.remove('hidden');
                    }
                }
            }, 800);
        });
    }

    // 3. Register Form Handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const companyName = document.getElementById('company_name').value.trim();
            const industry = document.getElementById('industry').value;
            const location = document.getElementById('location').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            const errorBanner = document.getElementById('errorBanner');
            const errorMessage = document.getElementById('errorMessage');
            const submitBtn = registerForm.querySelector('button[type="submit"]');

            if (errorBanner) errorBanner.classList.add('hidden');

            if (!industry) {
                if (errorBanner && errorMessage) {
                    errorMessage.textContent = "Please select your industry.";
                    errorBanner.classList.remove('hidden');
                }
                return;
            }

            const originalHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="material-symbols-outlined animate-spin">refresh</span> Registering...`;

            setTimeout(() => {
                const res = DB.register(companyName, email, password, industry, location);
                if (res.success) {
                    submitBtn.innerHTML = `<span class="material-symbols-outlined">check_circle</span> Success (+100 Eco-Coins!)`;
                    submitBtn.classList.replace('bg-primary', 'bg-score-a');
                    
                    setTimeout(() => {
                        window.location.href = 'company/dashboard.html';
                    }, 1200);
                } else {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalHTML;
                    if (errorBanner && errorMessage) {
                        errorMessage.textContent = res.message;
                        errorBanner.classList.remove('hidden');
                    }
                }
            }, 1000);
        });
    }
});

// Protection Check (Runs on page load for sub-folders)
function checkAuth(requiredRole) {
    // DB needs to be loaded first
    if (!window.DB) return;
    const user = DB.getCurrentUser();
    if (!user) {
        // Find relative path to login
        const depth = window.location.pathname.split('/').length;
        let prefix = '';
        if (depth > 3) prefix = '../';
        window.location.href = prefix + 'login.html';
        return;
    }
    if (requiredRole && user.role !== requiredRole) {
        const depth = window.location.pathname.split('/').length;
        let prefix = '';
        if (depth > 3) prefix = '../';
        window.location.href = prefix + (user.role === 'admin' ? 'admin/dashboard.html' : 'company/dashboard.html');
    }
    return user;
}
