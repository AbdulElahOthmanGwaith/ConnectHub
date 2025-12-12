// نظام الترجمة متعدد اللغات
let currentLanguage = 'ar';

const translations = {
    ar: {
        // واجهة تسجيل الدخول
        login_subtitle: "منصة التواصل الاجتماعي المتقدمة التي تجمع بين الأصالة والابتكار لتوفر تجربة تواصل فريدة ومميزة.",
        email_placeholder: "البريد الإلكتروني أو رقم الهاتف",
        password_placeholder: "كلمة المرور",
        login_btn: "تسجيل الدخول",
        forgot_password: "هل نسيت كلمة المرور؟",
        create_account: "إنشاء حساب جديد",
        
        // واجهة التسجيل
        create_new_account: "إنشاء حساب جديد",
        quick_easy: "سريع ومجاني.",
        first_name: "الاسم الأول",
        last_name: "اسم العائلة",
        email: "البريد الإلكتروني",
        new_password: "كلمة مرور جديدة",
        register: "التسجيل",
        back_to_login: "العودة لتسجيل الدخول",
        
        // الواجهة الرئيسية
        search_placeholder: "البحث في ConnectHub",
        friends: "الأصدقاء",
        groups: "المجموعات",
        events: "الأحداث",
        saved: "المحفوظات",
        contacts: "جهات الاتصال",
        
        // المنشورات
        whats_on_mind: "ما الذي تفكر فيه؟",
        live_video: "فيديو مباشر",
        photo_video: "صورة/فيديو",
        feeling_activity: "شعور/نشاط",
        create_post: "إنشاء منشور",
        post: "نشر",
        
        // الأصدقاء
        back: "العودة",
        friends_management: "إدارة الأصدقاء",
        friend_requests: "طلبات الصداقة",
        friends_list: "قائمة الأصدقاء",
        friend_suggestions: "اقتراحات الأصدقاء",
        incoming_requests: "طلبات الصداقة الواردة",
        my_friends: "قائمة الأصدقاء",
        suggested_friends: "اقتراحات الأصدقاء",
        accept: "قبول",
        decline: "رفض",
        add_friend: "إضافة صديق",
        remove_friend: "إزالة صديق",
        mutual_friends: "أصدقاء مشتركين",
        friend: "صديق",
        
        // الإشعارات
        notifications: "الإشعارات",
        view_profile: "عرض الملف الشخصي",
        settings: "الإعدادات",
        logout: "تسجيل الخروج",
        
        // الرسائل
        login_required: "يرجى إدخال البريد الإلكتروني وكلمة المرور",
        signup_required: "يرجى ملء جميع الحقول",
        logout_confirm: "هل تريد تسجيل الخروج؟",
        feature_coming_soon: "هذه الميزة قريباً!",
        user: "المستخدم",
        now: "الآن",
        minutes_ago: "دقائق",
        hours_ago: "ساعات",
        minute_ago: "دقيقة",
        hour_ago: "ساعة",
        day_ago: "يوم",
        days_ago: "أيام",
        
        // التعليقات الصوتية
        voice_not_supported: "التسجيل الصوتي غير مدعوم في هذا المتصفح",
        microphone_access_denied: "تم رفض الوصول إلى الميكروفون",
        record: "تسجيل",
        stop: "إيقاف",
        cancel: "إلغاء",
        voice_comment: "تعليق صوتي",
        
        // المحتوى غير اللائق
        content_warning: "تحذير المحتوى",
        inappropriate_content: "يحتوي هذا المحتوى على كلمات غير لائقة. يرجى مراجعة ما كتبته.",
        ok: "حسناً",
        
        // حد الحسابات
        account_limit_title: "حد الحسابات",
        account_limit_message: "لا يمكنك إنشاء أكثر من حسابين على نفس الجهاز لأسباب أمنية.",
        
        // إشعارات متنوعة
        no_friend_requests: "لا توجد طلبات صداقة جديدة",
        no_friends_yet: "لم تضف أي أصدقاء بعد",
        no_notifications: "لا توجد إشعارات",
        friend_added_notification: "تم قبول طلب الصداقة مع",
        friend_request_sent_notification: "تم إرسال طلب صداقة إلى",
        remove_friend_confirm: "هل تريد إزالة",
        from_friends: "من قائمة الأصدقاء؟",
        post_created: "تم إنشاء المنشور بنجاح",
        
        // عينات
        sample_user_1: "أحمد محمد",
        sample_post_1: "مرحباً بكم في ConnectHub! 🌟 منصة التواصل الاجتماعي المتطورة مع ميزات صوتية مبتكرة وأمان متقدم",
        
        // إضافات جديدة
        unlimited_friends: "أصدقاء غير محدودين",
        content_filtered: "تم فلترة المحتوى غير اللائق",
        arabic: "العربية",
        english: "الإنجليزية",
        language_switched: "تم تغيير اللغة بنجاح",
        
        // إضافات للميزات الجديدة
        like: "إعجاب",
        comment: "تعليق",
        share: "مشاركة",
        write_comment: "اكتب تعليقاً...",
        voice_comment_saved: "تم حفظ التعليق الصوتي بنجاح",
        audio_play_error: "خطأ في تشغيل الملف الصوتي",
        report_post: "إبلاغ عن المنشور",
        hide_post: "إخفاء المنشور",
        report_reason: "سبب الإبلاغ:",
        post_hidden: "تم إخفاء المنشور",
        shared_post: "شارك منشور",
        post_shared: "تم مشاركة المنشور بنجاح",
        report_submitted: "تم إرسال البلاغ",
        content_hidden_multiple_reports: "تم إخفاء المحتوى بسبب البلاغات المتعددة",
        no_posts_yet: "لا توجد منشورات بعد",
        start_sharing: "ابدأ بمشاركة أفكارك مع الأصدقاء"
    },
    
    en: {
        // Login interface
        login_subtitle: "Advanced social media platform that combines authenticity and innovation to provide a unique and distinctive communication experience.",
        email_placeholder: "Email or phone number",
        password_placeholder: "Password",
        login_btn: "Log In",
        forgot_password: "Forgot password?",
        create_account: "Create New Account",
        
        // Signup interface
        create_new_account: "Create a new account",
        quick_easy: "It's quick and easy.",
        first_name: "First name",
        last_name: "Last name",
        email: "Email",
        new_password: "New password",
        register: "Sign Up",
        back_to_login: "Back to Login",
        
        // Main interface
        search_placeholder: "Search ConnectHub",
        friends: "Friends",
        groups: "Groups",
        events: "Events",
        saved: "Saved",
        contacts: "Contacts",
        
        // Posts
        whats_on_mind: "What's on your mind?",
        live_video: "Live video",
        photo_video: "Photo/video",
        feeling_activity: "Feeling/activity",
        create_post: "Create post",
        post: "Post",
        
        // Friends
        back: "Back",
        friends_management: "Friends Management",
        friend_requests: "Friend Requests",
        friends_list: "Friends List",
        friend_suggestions: "Friend Suggestions",
        incoming_requests: "Incoming Friend Requests",
        my_friends: "My Friends",
        suggested_friends: "Suggested Friends",
        accept: "Accept",
        decline: "Decline",
        add_friend: "Add Friend",
        remove_friend: "Remove Friend",
        mutual_friends: "mutual friends",
        friend: "Friend",
        
        // Notifications
        notifications: "Notifications",
        view_profile: "View Profile",
        settings: "Settings",
        logout: "Logout",
        
        // Messages
        login_required: "Please enter email and password",
        signup_required: "Please fill all fields",
        logout_confirm: "Do you want to logout?",
        feature_coming_soon: "This feature is coming soon!",
        user: "User",
        now: "now",
        minutes_ago: "minutes ago",
        hours_ago: "hours ago",
        minute_ago: "1 minute ago",
        hour_ago: "1 hour ago",
        day_ago: "1 day ago",
        days_ago: "days ago",
        
        // Voice comments
        voice_not_supported: "Voice recording is not supported in this browser",
        microphone_access_denied: "Microphone access denied",
        record: "Record",
        stop: "Stop",
        cancel: "Cancel",
        voice_comment: "Voice comment",
        
        // Inappropriate content
        content_warning: "Content Warning",
        inappropriate_content: "This content contains inappropriate words. Please review what you wrote.",
        ok: "OK",
        
        // Account limit
        account_limit_title: "Account Limit",
        account_limit_message: "You cannot create more than two accounts on the same device for security reasons.",
        
        // Various notifications
        no_friend_requests: "No new friend requests",
        no_friends_yet: "You haven't added any friends yet",
        no_notifications: "No notifications",
        friend_added_notification: "Friend request accepted with",
        friend_request_sent_notification: "Friend request sent to",
        remove_friend_confirm: "Do you want to remove",
        from_friends: "from your friends list?",
        post_created: "Post created successfully",
        
        // Samples
        sample_user_1: "Ahmed Mohamed",
        sample_post_1: "Welcome to ConnectHub! 🌟 Advanced social media platform with innovative voice features and enhanced security",
        
        // New additions
        unlimited_friends: "Unlimited friends",
        content_filtered: "Inappropriate content has been filtered",
        arabic: "Arabic",
        english: "English",
        language_switched: "Language switched successfully",
        
        // New feature additions
        like: "Like",
        comment: "Comment",
        share: "Share",
        write_comment: "Write a comment...",
        voice_comment_saved: "Voice comment saved successfully",
        audio_play_error: "Error playing audio file",
        report_post: "Report Post",
        hide_post: "Hide Post",
        report_reason: "Report reason:",
        post_hidden: "Post has been hidden",
        shared_post: "Shared post",
        post_shared: "Post shared successfully",
        report_submitted: "Report submitted",
        content_hidden_multiple_reports: "Content hidden due to multiple reports",
        no_posts_yet: "No posts yet",
        start_sharing: "Start sharing your thoughts with friends"
    }
};

// الحصول على النص المترجم
function t(key) {
    return translations[currentLanguage][key] || key;
}

// تبديل اللغة
function switchLanguage(lang) {
    currentLanguage = lang;
    saveLanguagePreference();
    updateLanguageInterface();
    translatePage();
    
    // إشعار تغيير اللغة
    showLanguageNotification();
}

// حفظ تفضيل اللغة
function saveLanguagePreference() {
    localStorage.setItem('preferredLanguage', currentLanguage);
}

// تحميل تفضيل اللغة
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        updateLanguageInterface();
        translatePage();
    }
}

// تحديث واجهة اللغة
function updateLanguageInterface() {
    const htmlRoot = document.getElementById('htmlRoot');
    const body = document.body;
    
    if (currentLanguage === 'ar') {
        htmlRoot.setAttribute('lang', 'ar');
        htmlRoot.setAttribute('dir', 'rtl');
        body.classList.remove('ltr');
        body.classList.add('rtl');
        
        // تحديث أزرار اللغة
        document.getElementById('langAr')?.classList.add('active');
        document.getElementById('langEn')?.classList.remove('active');
        
        // تحديث عرض اللغة الحالية
        const currentLangDisplay = document.getElementById('currentLangDisplay');
        if (currentLangDisplay) {
            currentLangDisplay.textContent = 'عربي';
        }
    } else {
        htmlRoot.setAttribute('lang', 'en');
        htmlRoot.setAttribute('dir', 'ltr');
        body.classList.remove('rtl');
        body.classList.add('ltr');
        
        // تحديث أزرار اللغة
        document.getElementById('langEn')?.classList.add('active');
        document.getElementById('langAr')?.classList.remove('active');
        
        // تحديث عرض اللغة الحالية
        const currentLangDisplay = document.getElementById('currentLangDisplay');
        if (currentLangDisplay) {
            currentLangDisplay.textContent = 'English';
        }
    }
}

// ترجمة جميع عناصر الصفحة
function translatePage() {
    // ترجمة النصوص
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = t(key);
    });
    
    // ترجمة النصوص النائبة (placeholders)
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        element.placeholder = t(key);
    });
    
    // تحديث عنوان الصفحة
    if (currentLanguage === 'ar') {
        document.title = 'ConnectHub - منصة التواصل الاجتماعي المتقدمة';
    } else {
        document.title = 'ConnectHub - Advanced Social Media Platform';
    }
    
    // إعادة عرض المحتوى الديناميكي
    if (typeof displayPosts === 'function') {
        displayPosts();
    }
    if (typeof displayFriendRequests === 'function') {
        displayFriendRequests();
    }
    if (typeof displayFriends === 'function') {
        displayFriends();
    }
    if (typeof displaySuggestedFriends === 'function') {
        displaySuggestedFriends();
    }
}

// إظهار إشعار تغيير اللغة
function showLanguageNotification() {
    // إنشاء إشعار مؤقت
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        background: #42b883;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        font-size: 14px;
        font-weight: 500;
        transform: translateX(${currentLanguage === 'ar' ? '-' : ''}100%);
        transition: transform 0.3s ease;
    `;
    
    if (currentLanguage === 'ar') {
        notification.style.right = 'auto';
        notification.style.left = '20px';
    }
    
    notification.textContent = t('language_switched');
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // إخفاء الإشعار بعد 3 ثوان
    setTimeout(() => {
        notification.style.transform = `translateX(${currentLanguage === 'ar' ? '-' : ''}100%)`;
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// تحديث الاتجاهات للعناصر الديناميكية
function updateElementDirection(element) {
    if (currentLanguage === 'ar') {
        element.setAttribute('dir', 'rtl');
        element.style.textAlign = 'right';
    } else {
        element.setAttribute('dir', 'ltr');
        element.style.textAlign = 'left';
    }
}