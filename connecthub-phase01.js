/* Phase 01 bridge: keeps the existing UI while replacing fake auth only. */
(() => {
  const config = window.CONNECTHUB_SUPABASE_CONFIG || {};
  const configured = Boolean(String(config.url || '').trim() && String(config.publishableKey || '').trim());
  let ready = false;
  let auth = null;

  const formValue = id => document.getElementById(id)?.value.trim() || '';
  const showAuthMessage = (message, kind = 'error') => {
    const target = document.getElementById('authMessage');
    if (target) { target.textContent = message; target.dataset.kind = kind; target.style.display = 'block'; }
    else if (message) alert(message);
  };
  const clearAuthMessage = () => { const target = document.getElementById('authMessage'); if (target) { target.textContent = ''; target.style.display = 'none'; } };
  const setBusy = busy => document.querySelectorAll('#loginPage button, #signupPage button').forEach(button => { button.disabled = busy; button.setAttribute('aria-busy', String(busy)); });

  window.addEventListener('connecthub-auth-ready', () => {
    auth = window.ConnectHubAuth;
    ready = true;
    if (!configured) showAuthMessage('لم يتم إعداد اتصال Supabase بعد. أضف رابط المشروع ومفتاح publishable قبل استخدام الحسابات.');
  });
  window.addEventListener('connecthub-auth-state', event => {
    const { user, profile } = event.detail || {};
    if (!user) {
      window.setConnectHubCurrentUser?.(null);
      document.getElementById('mainPage').style.display = 'none';
      document.getElementById('signupPage').style.display = 'none';
      document.getElementById('loginPage').style.display = 'block';
      return;
    }
    const displayName = profile?.display_name || user.user_metadata?.display_name || user.email?.split('@')[0] || 'ConnectHub user';
    window.setConnectHubCurrentUser?.({ id: user.id, name: displayName, email: user.email || '' });
    clearAuthMessage();
    if (typeof window.showMainPage === 'function') window.showMainPage();
  });
  window.addEventListener('connecthub-auth-error', event => showAuthMessage(window.ConnectHubAuthMessage?.(event.detail, 'تعذر تحميل جلسة المستخدم.') || 'تعذر تحميل جلسة المستخدم.'));

  window.login = async function loginWithSupabase() {
    clearAuthMessage();
    const email = formValue('loginEmail');
    const password = document.getElementById('loginPassword')?.value || '';
    if (!email || !password) { showAuthMessage(window.t?.('login_required') || 'أدخل البريد وكلمة المرور.'); return; }
    if (!ready || !auth?.configured) { showAuthMessage('مصادقة Supabase غير مهيأة بعد.'); return; }
    setBusy(true);
    try { await auth.login(email, password); }
    catch (error) { showAuthMessage(error.userMessage || window.ConnectHubAuthMessage?.(error, 'تعذر تسجيل الدخول.') || 'تعذر تسجيل الدخول.'); }
    finally { setBusy(false); }
  };

  window.signup = async function signupWithSupabase() {
    clearAuthMessage();
    const firstName = formValue('firstName');
    const lastName = formValue('lastName');
    const email = formValue('signupEmail');
    const password = document.getElementById('signupPassword')?.value || '';
    if (!firstName || !lastName || !email || !password) { showAuthMessage(window.t?.('signup_required') || 'أكمل بيانات التسجيل.'); return; }
    if (!ready || !auth?.configured) { showAuthMessage('مصادقة Supabase غير مهيأة بعد.'); return; }
    setBusy(true);
    try {
      const data = await auth.register({ email, password, displayName: `${firstName} ${lastName}` });
      if (!data.session) showAuthMessage('تم إنشاء الحساب. تحقق من بريدك الإلكتروني ثم سجّل الدخول.', 'success');
    } catch (error) { showAuthMessage(error.userMessage || window.ConnectHubAuthMessage?.(error, 'تعذر إنشاء الحساب.') || 'تعذر إنشاء الحساب.'); }
    finally { setBusy(false); }
  };

  window.logout = async function logoutWithSupabase() {
    if (!confirm(window.t?.('logout_confirm') || 'هل تريد تسجيل الخروج؟')) return;
    try { await auth?.logout(); } catch (error) { showAuthMessage(error.userMessage || 'تعذر تسجيل الخروج.'); }
  };
})();
