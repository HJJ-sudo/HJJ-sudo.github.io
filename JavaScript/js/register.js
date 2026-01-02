// 网易严选登录/注册页面 JavaScript

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
  // 初始化所有功能
  initTabs();
  initPasswordToggle();
  initVerificationCode();
  initFormValidation();
  initFormSubmission();
  initForgotPassword();
  initAgreementLinks();
  initSocialLogin();
  initFooterLinks();
});

// 初始化选项卡功能
function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const forms = document.querySelectorAll('.form');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // 移除所有选项卡的活动状态
      tabs.forEach(t => t.classList.remove('active'));
      // 移除所有表单的活动状态
      forms.forEach(f => f.classList.remove('active'));

      // 激活当前选项卡
      this.classList.add('active');
      // 激活对应的表单
      const tabId = this.dataset.tab;
      const targetForm = document.getElementById(`${tabId}-form`);
      if (targetForm) {
        targetForm.classList.add('active');
      }
    });
  });
}

// 初始化密码显示/隐藏功能
function initPasswordToggle() {
  const toggleButtons = document.querySelectorAll('.toggle-password');

  toggleButtons.forEach(button => {
    button.addEventListener('click', function () {
      const passwordInput = this.previousElementSibling;
      const icon = this.querySelector('i');

      // 切换密码可见性
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      }
    });
  });
}

// 初始化验证码功能
function initVerificationCode() {
  const getCodeBtn = document.querySelector('.get-code-btn');
  let countdown = 60;
  let timer = null;

  if (getCodeBtn) {
    getCodeBtn.addEventListener('click', function () {
      const phoneInput = document.getElementById('register-phone');
      const phoneNumber = phoneInput.value.trim();

      // 简单的手机号验证
      if (!/^1[3-9]\d{9}$/.test(phoneNumber)) {
        alert('请输入正确的手机号');
        return;
      }

      // 禁用按钮并开始倒计时
      getCodeBtn.disabled = true;
      getCodeBtn.classList.add('disabled');
      getCodeBtn.textContent = `${countdown}秒后重试`;

      // 倒计时逻辑
      timer = setInterval(function () {
        countdown--;
        getCodeBtn.textContent = `${countdown}秒后重试`;

        if (countdown <= 0) {
          clearInterval(timer);
          getCodeBtn.disabled = false;
          getCodeBtn.classList.remove('disabled');
          getCodeBtn.textContent = '获取验证码';
          countdown = 60;
        }
      }, 1000);

      // 模拟发送验证码
      console.log('向手机号', phoneNumber, '发送验证码');
      alert('验证码已发送，请注意查收');
    });
  }
}

// 初始化表单验证
function initFormValidation() {
  // 登录表单验证
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('input', function (e) {
      const input = e.target;
      validateInput(input);
    });
  }

  // 注册表单验证
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('input', function (e) {
      const input = e.target;
      validateInput(input);
    });
  }
}

// 验证单个输入字段
function validateInput(input) {
  const inputId = input.id;
  const value = input.value.trim();
  let isValid = true;

  // 根据不同的字段进行验证
  switch (inputId) {
    case 'login-username':
      // 验证手机号或邮箱
      isValid = /^1[3-9]\d{9}$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      break;
    case 'login-password':
      // 密码至少6位
      isValid = value.length >= 6;
      break;
    case 'register-phone':
      // 手机号验证
      isValid = /^1[3-9]\d{9}$/.test(value);
      break;
    case 'verification-code':
      // 验证码6位数字
      isValid = /^\d{6}$/.test(value);
      break;
    case 'register-password':
      // 密码至少6位
      isValid = value.length >= 6;
      break;
  }

  // 更新输入框样式
  if (value && !isValid) {
    input.style.borderColor = '#ff4b55';
    input.style.boxShadow = '0 0 0 3px rgba(255, 75, 85, 0.1)';
  } else if (value && isValid) {
    input.style.borderColor = '#50e3c2';
    input.style.boxShadow = '0 0 0 3px rgba(80, 227, 194, 0.1)';
  } else {
    input.style.borderColor = '#e8e8e8';
    input.style.boxShadow = 'none';
  }

  return isValid;
}

// 初始化表单提交
function initFormSubmission() {
  // 登录表单提交
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value.trim();

      // 验证表单
      const isUsernameValid = validateInput(document.getElementById('login-username'));
      const isPasswordValid = validateInput(document.getElementById('login-password'));

      if (isUsernameValid && isPasswordValid) {
        // 模拟登录请求
        simulateLogin(username, password);
      } else {
        alert('请检查输入信息是否正确');
      }
    });
  }

  // 注册表单提交
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const phone = document.getElementById('register-phone').value.trim();
      const code = document.getElementById('verification-code').value.trim();
      const password = document.getElementById('register-password').value.trim();
      const agreement = document.getElementById('agreement').checked;

      // 验证表单
      const isPhoneValid = validateInput(document.getElementById('register-phone'));
      const isCodeValid = validateInput(document.getElementById('verification-code'));
      const isPasswordValid = validateInput(document.getElementById('register-password'));

      if (!agreement) {
        alert('请阅读并同意用户协议和隐私政策');
        return;
      }

      if (isPhoneValid && isCodeValid && isPasswordValid) {
        // 模拟注册请求
        simulateRegister(phone, code, password);
      } else {
        alert('请检查输入信息是否正确');
      }
    });
  }
}

// 模拟登录请求
function simulateLogin(username, password) {
  // 显示加载状态
  const loginBtn = document.querySelector('#login-form .submit-btn');
  const originalText = loginBtn.textContent;
  loginBtn.textContent = '登录中...';
  loginBtn.disabled = true;

  // 模拟网络请求
  setTimeout(function () {
    // 这里可以替换为实际的API请求
    console.log('登录请求:', { username, password });

    // 模拟登录成功
    alert('登录成功！');

    // 恢复按钮状态
    loginBtn.textContent = originalText;
    loginBtn.disabled = false;

    // 可以在这里添加跳转到首页的逻辑
    // window.location.href = '../index.html';
  }, 1500);
}

// 模拟注册请求
function simulateRegister(phone, code, password) {
  // 显示加载状态
  const registerBtn = document.querySelector('#register-form .submit-btn');
  const originalText = registerBtn.textContent;
  registerBtn.textContent = '注册中...';
  registerBtn.disabled = true;

  // 模拟网络请求
  setTimeout(function () {
    // 这里可以替换为实际的API请求
    console.log('注册请求:', { phone, code, password });

    // 模拟注册成功
    alert('注册成功！');

    // 自动切换到登录选项卡
    const loginTab = document.querySelector('.tab[data-tab="login"]');
    if (loginTab) {
      loginTab.click();
      // 自动填充手机号到登录表单
      const loginUsername = document.getElementById('login-username');
      if (loginUsername) {
        loginUsername.value = phone;
      }
    }

    // 恢复按钮状态
    registerBtn.textContent = originalText;
    registerBtn.disabled = false;
  }, 1500);
}

// 添加忘记密码链接处理
function initForgotPassword() {
  const forgotPasswordLink = document.querySelector('.forgot-password');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function (e) {
      e.preventDefault();
      alert('忘记密码功能将在后续版本中实现');
    });
  }
}

// 添加用户协议和隐私政策链接处理
function initAgreementLinks() {
  const agreementLinks = document.querySelectorAll('.agreement a');
  agreementLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const text = this.textContent;
      alert(`${text}将在后续版本中实现`);
    });
  });
}

// 添加社交媒体登录处理
function initSocialLogin() {
  const socialBtns = document.querySelectorAll('.social-btn');
  socialBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const platform = this.querySelector('span').textContent;
      alert(`${platform}登录功能将在后续版本中实现`);
    });
  });
}

// 添加底部链接处理
function initFooterLinks() {
  const footerLinks = document.querySelectorAll('.footer a');
  footerLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const text = this.textContent;
      alert(`${text}将在后续版本中实现`);
    });
  });
}