import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const config = window.CONNECTHUB_SUPABASE_CONFIG || {};
const url = String(config.url || '').trim();
const publishableKey = String(config.publishableKey || '').trim();
const isConfigured = Boolean(url && publishableKey && /^https:\/\/[^\s]+\.supabase\.co$/.test(url));

function userMessage(error, fallback) {
  const code = error?.code || error?.status;
  if (code === 'invalid_credentials' || code === 400) return 'بيانات الدخول غير صحيحة.';
  if (code === 'user_already_exists' || /already registered|already exists/i.test(error?.message || '')) return 'هذا البريد مستخدم بالفعل.';
  if (/password/i.test(error?.message || '') && /short|weak|characters/i.test(error?.message || '')) return 'كلمة المرور لا تستوفي الحد الأدنى المطلوب.';
  if (/email/i.test(error?.message || '') && /invalid/i.test(error?.message || '')) return 'يرجى إدخال بريد إلكتروني صحيح.';
  if (/network|fetch|offline/i.test(error?.message || '')) return 'تعذر الاتصال بالخدمة. تحقق من الشبكة وحاول مجددًا.';
  return fallback;
}

const auth = {
  configured: isConfigured,
  client: null,
  async register({ email, password, displayName }) {
    if (!this.configured) throw new Error('SUPABASE_NOT_CONFIGURED');
    const { data, error } = await this.client.auth.signUp({ email, password, options: { data: { display_name: displayName } } });
    if (error) { error.userMessage = userMessage(error, 'تعذر إنشاء الحساب.'); throw error; }
    return data;
  },
  async login(email, password) {
    if (!this.configured) throw new Error('SUPABASE_NOT_CONFIGURED');
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) { error.userMessage = userMessage(error, 'تعذر تسجيل الدخول.'); throw error; }
    return data;
  },
  async logout() {
    if (!this.configured) return;
    const { error } = await this.client.auth.signOut();
    if (error) { error.userMessage = userMessage(error, 'تعذر تسجيل الخروج.'); throw error; }
  },
  async getProfile(userId) {
    if (!this.configured || !userId) return null;
    const { data, error } = await this.client.from('profiles').select('id,display_name,avatar_url,bio,created_at,updated_at').eq('id', userId).maybeSingle();
    if (error) { error.userMessage = userMessage(error, 'تعذر تحميل الملف الشخصي.'); throw error; }
    return data;
  },
  async updateProfile(userId, changes) {
    if (!this.configured || !userId) throw new Error('SUPABASE_NOT_CONFIGURED');
    const safe = { display_name: String(changes.display_name || '').trim().slice(0, 80), bio: String(changes.bio || '').trim().slice(0, 500), avatar_url: changes.avatar_url || null };
    const { data, error } = await this.client.from('profiles').update(safe).eq('id', userId).select('id,display_name,avatar_url,bio,created_at,updated_at').single();
    if (error) { error.userMessage = userMessage(error, 'تعذر حفظ الملف الشخصي.'); throw error; }
    return data;
  }
};

if (isConfigured) auth.client = createClient(url, publishableKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
window.ConnectHubAuth = auth;
window.ConnectHubAuthMessage = userMessage;
window.dispatchEvent(new CustomEvent('connecthub-auth-ready'));

if (isConfigured) {
  auth.client.auth.onAuthStateChange(async (_event, session) => {
    try {
      const profile = session?.user ? await auth.getProfile(session.user.id) : null;
      window.dispatchEvent(new CustomEvent('connecthub-auth-state', { detail: { session, user: session?.user || null, profile } }));
    } catch (error) {
      window.dispatchEvent(new CustomEvent('connecthub-auth-error', { detail: error }));
    }
  });
}
