// متغيرات عامة
let currentUser = null;
let posts = [];
let postIdCounter = 1;
let friends = [];
let friendRequests = [];
let suggestedFriends = [];
let notifications = [];
let voiceRecordings = {};
let mediaRecorder = null;
let recordedChunks = [];

// نظام الأصدقاء المتقدم - بدون حدود
const UNLIMITED_FRIENDS = true;
const MAX_FRIENDS = UNLIMITED_FRIENDS ? Infinity : 5000;

// إحصائيات متقدمة للأصدقاء
function getFriendsStats() {
    return {
        totalFriends: friends.length,
        onlineFriends: friends.filter(f => f.isOnline).length,
        mutualConnections: calculateMutualConnections(),
        recentlyAdded: friends.filter(f => {
            const addedDate = new Date(f.addedDate || Date.now());
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return addedDate > weekAgo;
        }).length
    };
}

// حساب الروابط المشتركة
function calculateMutualConnections() {
    // خوارزمية متقدمة لحساب الروابط المشتركة
    let totalMutual = 0;
    friends.forEach(friend => {
        if (friend.mutualFriends) {
            totalMutual += friend.mutualFriends;
        }
    });
    return Math.floor(totalMutual / Math.max(friends.length, 1));
}

// فلتر المحتوى غير اللائق - نظام متطور
const inappropriateContent = {
    ar: {
        words: ['كلمات', 'غير', 'لائقة', 'بالعربية', 'سيء', 'كراهية', 'عنصرية', 'إساءة'],
        patterns: [/\b(سب|شتم|لعن)\b/gi, /\b(عنف|اعتداء)\b/gi],
        severity: {
            high: ['عنصرية', 'كراهية', 'تهديد'],
            medium: ['سيء', 'إساءة'],
            low: ['كلمات']
        }
    },
    en: {
        words: ['inappropriate', 'bad', 'hate', 'spam', 'abuse', 'offensive', 'racist', 'violence'],
        patterns: [/\b(hate|racism|violence)\b/gi, /\b(spam|scam|fake)\b/gi],
        severity: {
            high: ['hate', 'racist', 'violence', 'threat'],
            medium: ['abuse', 'offensive', 'spam'],
            low: ['inappropriate', 'bad']
        }
    }
};

// نظام الذكاء الاصطناعي لفلترة المحتوى
function analyzeContentWithAI(text) {
    const lang = currentLanguage;
    const content = inappropriateContent[lang];
    
    let score = 0;
    let severity = 'clean';
    let detectedIssues = [];
    
    // فحص الكلمات المباشرة
    content.words.forEach(word => {
        if (text.toLowerCase().includes(word.toLowerCase())) {
            if (content.severity.high.includes(word)) {
                score += 10;
                severity = 'high';
            } else if (content.severity.medium.includes(word)) {
                score += 5;
                if (severity !== 'high') severity = 'medium';
            } else {
                score += 2;
                if (severity === 'clean') severity = 'low';
            }
            detectedIssues.push(word);
        }
    });
    
    // فحص الأنماط المتقدمة
    content.patterns.forEach(pattern => {
        const matches = text.match(pattern);
        if (matches) {
            score += matches.length * 3;
            if (severity === 'clean') severity = 'medium';
            detectedIssues.push(...matches);
        }
    });
    
    return {
        isInappropriate: score > 3,
        severity: severity,
        score: score,
        issues: detectedIssues,
        suggestion: generateContentSuggestion(text, detectedIssues)
    };
}

// اقتراح بديل للمحتوى
function generateContentSuggestion(originalText, issues) {
    if (issues.length === 0) return originalText;
    
    let suggestion = originalText;
    issues.forEach(issue => {
        const replacement = currentLanguage === 'ar' ? '[محتوى محذوف]' : '[content removed]';
        suggestion = suggestion.replace(new RegExp(issue, 'gi'), replacement);
    });
    
    return suggestion;
}

// تحميل البيانات من localStorage
function loadData() {
    const savedUser = localStorage.getItem('currentUser');
    const savedPosts = localStorage.getItem('posts');
    const savedFriends = localStorage.getItem('friends');
    const savedRequests = localStorage.getItem('friendRequests');
    const savedNotifications = localStorage.getItem('notifications');
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    
    if (savedFriends) {
        friends = JSON.parse(savedFriends);
    }
    
    if (savedRequests) {
        friendRequests = JSON.parse(savedRequests);
    }
    
    if (savedNotifications) {
        notifications = JSON.parse(savedNotifications);
    }
    
    if (savedPosts) {
        posts = JSON.parse(savedPosts);
        postIdCounter = Math.max(...posts.map(p => p.id), 0) + 1;
    } else {
        // إضافة بعض المنشورات التجريبية
        posts = [
            {
                id: 1,
                author: t('sample_user_1') || 'أحمد محمد',
                content: t('sample_post_1') || 'مرحباً بكم في SocialConnect! 🎉 منصة التواصل الاجتماعي الجديدة',
                time: t('hours_ago') || 'منذ ساعتين',
                likes: 15,
                comments: [
                    { author: 'فاطمة علي', text: 'رائع! أحب التصميم الجديد', type: 'text' },
                    { author: 'محمد حسن', text: 'عمل ممتاز 👏', type: 'text' }
                ],
                liked: false
            },
            {
                id: 2,
                author: 'سارة خالد',
                content: 'يوم جميل للبرمجة والتطوير! من يريد أن ينضم إلى مشروع جديد؟',
                time: t('hours_ago') || 'منذ 4 ساعات',
                likes: 8,
                comments: [
                    { author: 'علي أحمد', text: 'أنا مهتم! ما نوع المشروع؟', type: 'text' }
                ],
                liked: false
            }
        ];
        postIdCounter = 3;
    }
    
    // إضافة بيانات تجريبية للأصدقاء المقترحين
    if (suggestedFriends.length === 0) {
        suggestedFriends = [
            { id: 1, name: 'علي أحمد', mutualFriends: 3, avatar: 'https://via.placeholder.com/60x60' },
            { id: 2, name: 'ليلى حسن', mutualFriends: 5, avatar: 'https://via.placeholder.com/60x60' },
            { id: 3, name: 'خالد عبدالله', mutualFriends: 2, avatar: 'https://via.placeholder.com/60x60' },
            { id: 4, name: 'ريم محمد', mutualFriends: 1, avatar: 'https://via.placeholder.com/60x60' }
        ];
    }
}

// حفظ البيانات في localStorage
function saveData() {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('posts', JSON.stringify(posts));
    localStorage.setItem('friends', JSON.stringify(friends));
    localStorage.setItem('friendRequests', JSON.stringify(friendRequests));
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

// فحص حد الحسابات
function checkAccountLimit() {
    const deviceId = getDeviceId();
    const accounts = JSON.parse(localStorage.getItem('deviceAccounts') || '[]');
    const userAccounts = accounts.filter(acc => acc.deviceId === deviceId);
    
    return userAccounts.length >= 2;
}

// إضافة حساب للجهاز
function addAccountToDevice(email) {
    const deviceId = getDeviceId();
    const accounts = JSON.parse(localStorage.getItem('deviceAccounts') || '[]');
    
    accounts.push({
        deviceId: deviceId,
        email: email,
        createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('deviceAccounts', JSON.stringify(accounts));
}

// الحصول على معرف الجهاز
function getDeviceId() {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = 'device_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
}

// فلترة المحتوى غير اللائق - نسخة محسّنة
function filterInappropriateContent(text) {
    const analysis = analyzeContentWithAI(text);
    return analysis.isInappropriate;
}

// نظام إبلاغ متقدم
function reportContent(postId, reason) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        if (!post.reports) post.reports = [];
        
        post.reports.push({
            userId: currentUser.email,
            reason: reason,
            timestamp: new Date().toISOString()
        });
        
        // إخفاء المحتوى إذا تم الإبلاغ عنه أكثر من 3 مرات
        if (post.reports.length >= 3) {
            post.hidden = true;
            addNotification(t('content_hidden_multiple_reports'));
        }
        
        saveData();
        displayPosts();
        addNotification(t('report_submitted'));
    }
}

// تسجيل الدخول
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email && password) {
        currentUser = {
            name: email.split('@')[0] || t('user'),
            email: email
        };
        
        saveData();
        showMainPage();
        updateNotificationCounts();
    } else {
        alert(t('login_required'));
    }
}

// التسجيل
function signup() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    if (firstName && lastName && email && password) {
        // فحص حد الحسابات
        if (checkAccountLimit()) {
            showAccountLimitModal();
            return;
        }
        
        currentUser = {
            name: `${firstName} ${lastName}`,
            email: email
        };
        
        addAccountToDevice(email);
        saveData();
        showMainPage();
        updateNotificationCounts();
    } else {
        alert(t('signup_required'));
    }
}

// إظهار نافذة حد الحسابات
function showAccountLimitModal() {
    document.getElementById('accountLimitModal').style.display = 'flex';
}

// إغلاق نافذة حد الحسابات
function closeAccountLimitModal() {
    document.getElementById('accountLimitModal').style.display = 'none';
}

// إظهار صفحة التسجيل
function showSignup() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signupPage').style.display = 'block';
}

// إظهار صفحة تسجيل الدخول
function showLogin() {
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
}

// إظهار الصفحة الرئيسية
function showMainPage() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
    
    showMainContent();
    
    // تحديث اسم المستخدم
    document.getElementById('userNameDisplay').textContent = currentUser.name;
    document.getElementById('modalUserName').textContent = currentUser.name;
    
    // عرض المنشورات
    displayPosts();
    displayOnlineFriends();
    generateRandomFriendRequests();
}

// إظهار المحتوى الرئيسي
function showMainContent() {
    document.getElementById('mainContent').style.display = 'flex';
    document.getElementById('friendsContent').style.display = 'none';
}

// إظهار صفحة الأصدقاء
function showFriendsPage() {
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('friendsContent').style.display = 'block';
    
    showFriendsTab('requests');
    displayFriendRequests();
    displayFriends();
    displaySuggestedFriends();
}

// إظهار تبويب الأصدقاء
function showFriendsTab(tab) {
    // إخفاء جميع التبويبات
    document.querySelectorAll('.friends-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // إزالة الفئة النشطة
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // إظهار التبويب المطلوب
    if (tab === 'requests') {
        document.getElementById('friendRequests').style.display = 'block';
        document.querySelector('[onclick="showFriendsTab(\'requests\')"]').classList.add('active');
    } else if (tab === 'friends') {
        document.getElementById('friendsList').style.display = 'block';
        document.querySelector('[onclick="showFriendsTab(\'friends\')"]').classList.add('active');
    } else if (tab === 'suggestions') {
        document.getElementById('friendSuggestions').style.display = 'block';
        document.querySelector('[onclick="showFriendsTab(\'suggestions\')"]').classList.add('active');
    }
}

// توليد طلبات صداقة عشوائية
function generateRandomFriendRequests() {
    if (friendRequests.length === 0) {
        const sampleRequests = [
            { id: 1, name: 'أحمد علي', mutualFriends: 2, avatar: 'https://via.placeholder.com/60x60' },
            { id: 2, name: 'نور حسن', mutualFriends: 4, avatar: 'https://via.placeholder.com/60x60' },
            { id: 3, name: 'عمر خالد', mutualFriends: 1, avatar: 'https://via.placeholder.com/60x60' }
        ];
        
        friendRequests = sampleRequests;
        saveData();
    }
}

// عرض طلبات الصداقة
function displayFriendRequests() {
    const container = document.getElementById('friendRequestsList');
    container.innerHTML = '';
    
    if (friendRequests.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: #65676b;">${t('no_friend_requests') || 'لا توجد طلبات صداقة جديدة'}</p>`;
        return;
    }
    
    friendRequests.forEach(request => {
        const requestElement = document.createElement('div');
        requestElement.className = 'friend-item';
        requestElement.innerHTML = `
            <img src="${request.avatar}" alt="${request.name}">
            <div class="friend-info">
                <div class="friend-name">${request.name}</div>
                <div class="mutual-friends">${request.mutualFriends} ${t('mutual_friends') || 'أصدقاء مشتركين'}</div>
            </div>
            <div class="friend-actions">
                <button class="accept-btn" onclick="acceptFriendRequest(${request.id})">${t('accept')}</button>
                <button class="decline-btn" onclick="declineFriendRequest(${request.id})">${t('decline')}</button>
            </div>
        `;
        container.appendChild(requestElement);
    });
}

// عرض قائمة الأصدقاء
function displayFriends() {
    const container = document.getElementById('myFriendsList');
    container.innerHTML = '';
    
    if (friends.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: #65676b;">${t('no_friends_yet') || 'لم تضف أي أصدقاء بعد'}</p>`;
        return;
    }
    
    friends.forEach(friend => {
        const friendElement = document.createElement('div');
        friendElement.className = 'friend-item';
        friendElement.innerHTML = `
            <img src="${friend.avatar}" alt="${friend.name}">
            <div class="friend-info">
                <div class="friend-name">${friend.name}</div>
                <div class="mutual-friends">${t('friend') || 'صديق'}</div>
            </div>
            <div class="friend-actions">
                <button class="decline-btn" onclick="removeFriend(${friend.id})">${t('remove_friend')}</button>
            </div>
        `;
        container.appendChild(friendElement);
    });
}

// عرض اقتراحات الأصدقاء
function displaySuggestedFriends() {
    const container = document.getElementById('suggestedFriendsList');
    container.innerHTML = '';
    
    suggestedFriends.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'friend-item';
        suggestionElement.innerHTML = `
            <img src="${suggestion.avatar}" alt="${suggestion.name}">
            <div class="friend-info">
                <div class="friend-name">${suggestion.name}</div>
                <div class="mutual-friends">${suggestion.mutualFriends} ${t('mutual_friends') || 'أصدقاء مشتركين'}</div>
            </div>
            <div class="friend-actions">
                <button class="add-friend-btn" onclick="sendFriendRequest(${suggestion.id})">${t('add_friend')}</button>
            </div>
        `;
        container.appendChild(suggestionElement);
    });
}

// قبول طلب صداقة
function acceptFriendRequest(requestId) {
    const request = friendRequests.find(r => r.id === requestId);
    if (request) {
        // إضافة إلى قائمة الأصدقاء
        friends.push(request);
        
        // إزالة من طلبات الصداقة
        friendRequests = friendRequests.filter(r => r.id !== requestId);
        
        // إضافة إشعار
        addNotification(`${t('friend_added_notification') || 'تم قبول طلب الصداقة مع'} ${request.name}`);
        
        saveData();
        displayFriendRequests();
        displayFriends();
        displayOnlineFriends();
        updateNotificationCounts();
    }
}

// رفض طلب صداقة
function declineFriendRequest(requestId) {
    friendRequests = friendRequests.filter(r => r.id !== requestId);
    saveData();
    displayFriendRequests();
    updateNotificationCounts();
}

// إرسال طلب صداقة
function sendFriendRequest(suggestionId) {
    const suggestion = suggestedFriends.find(s => s.id === suggestionId);
    if (suggestion) {
        // إضافة إشعار
        addNotification(`${t('friend_request_sent_notification') || 'تم إرسال طلب صداقة إلى'} ${suggestion.name}`);
        
        // إزالة من الاقتراحات
        suggestedFriends = suggestedFriends.filter(s => s.id !== suggestionId);
        
        saveData();
        displaySuggestedFriends();
        updateNotificationCounts();
    }
}

// إزالة صديق
function removeFriend(friendId) {
    const friend = friends.find(f => f.id === friendId);
    if (friend && confirm(`${t('remove_friend_confirm') || 'هل تريد إزالة'} ${friend.name} ${t('from_friends') || 'من قائمة الأصدقاء؟'}`)) {
        friends = friends.filter(f => f.id !== friendId);
        saveData();
        displayFriends();
        displayOnlineFriends();
    }
}

// عرض الأصدقاء المتصلين
function displayOnlineFriends() {
    const container = document.getElementById('onlineFriendsList');
    container.innerHTML = '';
    
    // عرض بعض الأصدقاء كمتصلين
    const onlineFriends = friends.slice(0, 4);
    
    onlineFriends.forEach(friend => {
        const contactElement = document.createElement('div');
        contactElement.className = 'contact-item';
        contactElement.innerHTML = `
            <img src="${friend.avatar}" alt="${friend.name}">
            <span>${friend.name}</span>
            <div class="online-indicator"></div>
        `;
        container.appendChild(contactElement);
    });
}

// إضافة إشعار
function addNotification(message) {
    const notification = {
        id: Date.now(),
        message: message,
        time: new Date().toISOString(),
        read: false
    };
    
    notifications.unshift(notification);
    saveData();
    updateNotificationCounts();
}

// تحديث عدادات الإشعارات
function updateNotificationCounts() {
    const unreadNotifications = notifications.filter(n => !n.read).length;
    const pendingRequests = friendRequests.length;
    
    // تحديث عداد الإشعارات
    const notificationBadge = document.getElementById('notificationCount');
    if (notificationBadge) {
        if (unreadNotifications > 0) {
            notificationBadge.textContent = unreadNotifications;
            notificationBadge.style.display = 'flex';
        } else {
            notificationBadge.style.display = 'none';
        }
    }
    
    // تحديث عداد طلبات الصداقة
    const friendRequestsBadge = document.getElementById('friendRequestsCount');
    const friendRequestsBadge2 = document.getElementById('friendRequestsBadge');
    
    [friendRequestsBadge, friendRequestsBadge2].forEach(badge => {
        if (badge) {
            if (pendingRequests > 0) {
                badge.textContent = pendingRequests;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
    });
}

// عرض الإشعارات
function showNotifications() {
    document.getElementById('notificationsModal').style.display = 'flex';
    displayNotifications();
}

// عرض قائمة الإشعارات
function displayNotifications() {
    const container = document.getElementById('notificationsList');
    container.innerHTML = '';
    
    if (notifications.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: #65676b; padding: 20px;">${t('no_notifications')}</p>`;
        return;
    }
    
    notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification-item ${!notification.read ? 'unread' : ''}`;
        notificationElement.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-user-friends"></i>
            </div>
            <div class="notification-content">
                <div class="notification-text">${notification.message}</div>
                <div class="notification-time">${formatTime(notification.time)}</div>
            </div>
        `;
        
        notificationElement.onclick = () => {
            notification.read = true;
            saveData();
            updateNotificationCounts();
            displayNotifications();
        };
        
        container.appendChild(notificationElement);
    });
}

// إغلاق الإشعارات
function closeNotifications() {
    document.getElementById('notificationsModal').style.display = 'none';
}

// عرض قائمة المستخدم
function showUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
}

// عرض الملف الشخصي
function viewProfile() {
    alert(t('feature_coming_soon') || 'هذه الميزة قريباً!');
    document.getElementById('userMenu').style.display = 'none';
}

// عرض الإعدادات
function showSettings() {
    alert(t('feature_coming_soon') || 'هذه الميزة قريباً!');
    document.getElementById('userMenu').style.display = 'none';
}

// تسجيل الخروج
function logout() {
    if (confirm(t('logout_confirm'))) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        
        document.getElementById('mainPage').style.display = 'none';
        document.getElementById('loginPage').style.display = 'block';
        document.getElementById('userMenu').style.display = 'none';
        
        // مسح الحقول
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    }
}

// فتح نافذة إنشاء منشور
function openPostModal() {
    document.getElementById('postModal').style.display = 'flex';
    document.getElementById('postText').focus();
}

// إغلاق نافذة إنشاء منشور
function closePostModal() {
    document.getElementById('postModal').style.display = 'none';
    document.getElementById('postText').value = '';
}

// إنشاء منشور جديد
function createPost() {
    const postText = document.getElementById('postText').value.trim();
    
    if (postText) {
        // فحص المحتوى غير اللائق
        if (filterInappropriateContent(postText)) {
            showContentWarning(t('inappropriate_content'));
            return;
        }
        
        const newPost = {
            id: postIdCounter++,
            author: currentUser.name,
            content: postText,
            time: t('now'),
            likes: 0,
            comments: [],
            liked: false
        };
        
        posts.unshift(newPost);
        saveData();
        displayPosts();
        closePostModal();
        
        // إضافة إشعار
        addNotification(t('post_created'));
    }
}

// عرض تحذير المحتوى
function showContentWarning(message) {
    document.getElementById('contentWarningMessage').textContent = message;
    document.getElementById('contentWarningModal').style.display = 'flex';
}

// إغلاق تحذير المحتوى
function closeContentWarning() {
    document.getElementById('contentWarningModal').style.display = 'none';
}

// عرض المنشورات مع تطبيق الفلترة
function displayPosts() {
    const container = document.getElementById('postsContainer');
    container.innerHTML = '';
    
    // فلترة المنشورات المخفية أو المبلغ عنها
    const visiblePosts = posts.filter(post => !post.hidden);
    
    visiblePosts.forEach(post => {
        const postElement = createPostElement(post);
        container.appendChild(postElement);
    });
    
    // إضافة إحصائيات الأصدقاء إذا كانت الصفحة فارغة
    if (visiblePosts.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-posts-message';
        emptyMessage.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #65676b;">
                <i class="fas fa-comments" style="font-size: 48px; margin-bottom: 16px; color: #667eea;"></i>
                <h3>${t('no_posts_yet')}</h3>
                <p>${t('start_sharing')}</p>
            </div>
        `;
        container.appendChild(emptyMessage);
    }
}

// إنشاء عنصر منشور متطور
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
        <div class="post-header">
            <img src="https://via.placeholder.com/40x40" alt="Profile">
            <div class="post-info">
                <h4>${post.author}</h4>
                <span class="post-time">${post.time}</span>
            </div>
            <div class="post-menu">
                <button class="post-menu-btn" onclick="showPostMenu(${post.id}, event)">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
        </div>
        <div class="post-content">
            ${post.content}
        </div>
        <div class="post-actions">
            <button class="action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                <i class="fas fa-thumbs-up"></i>
                <span>${t('like')} ${post.likes > 0 ? '(' + post.likes + ')' : ''}</span>
            </button>
            <button class="action-btn" onclick="toggleComments(${post.id})">
                <i class="fas fa-comment"></i>
                <span>${t('comment')} ${post.comments.length > 0 ? '(' + post.comments.length + ')' : ''}</span>
            </button>
            <button class="action-btn" onclick="sharePost(${post.id})">
                <i class="fas fa-share"></i>
                <span>${t('share')}</span>
            </button>
        </div>
        <div id="comments-${post.id}" class="comments-section" style="display: none;">
            ${post.comments.map(comment => createCommentHTML(comment)).join('')}
            <div class="comment-input">
                <img src="https://via.placeholder.com/32x32" alt="Profile">
                <input type="text" placeholder="${t('write_comment') || 'اكتب تعليقاً...'}" onkeypress="handleCommentKeyPress(event, ${post.id})">
                <button class="voice-comment-btn" onclick="toggleVoiceComment(${post.id})" title="${t('voice_comment')}">
                    <i class="fas fa-microphone"></i>
                </button>
            </div>
            <div id="voiceRecorder-${post.id}" class="voice-recorder" style="display: none;">
                <div class="recording-indicator" id="indicator-${post.id}"></div>
                <button id="recordBtn-${post.id}" onclick="startAdvancedRecording(${post.id})" class="record-btn">
                    <i class="fas fa-microphone"></i> ${t('record') || 'تسجيل'}
                </button>
                <button id="stopBtn-${post.id}" onclick="stopAdvancedRecording(${post.id})" class="stop-btn" style="display: none;">
                    <i class="fas fa-stop"></i> ${t('stop') || 'إيقاف'}
                </button>
                <div class="recording-timer" id="timer-${post.id}">0:00</div>
                <button onclick="cancelVoiceComment(${post.id})" class="cancel-btn">
                    <i class="fas fa-times"></i> ${t('cancel') || 'إلغاء'}
                </button>
            </div>
        </div>
    `;
    
    return postDiv;
}

// إنشاء HTML للتعليق المطور
function createCommentHTML(comment) {
    if (comment.type === 'voice') {
        const commentId = comment.id || Date.now();
        return `
            <div class="comment voice-comment">
                <img src="https://via.placeholder.com/32x32" alt="Profile">
                <div class="voice-comment-content">
                    <div class="comment-author">${comment.author}</div>
                    <div class="voice-player">
                        <button class="play-voice-btn" id="play-${commentId}" onclick="playVoiceComment('${comment.audioUrl}', '${commentId}', ${JSON.stringify(comment.waveform || [])})">
                            <i class="fas fa-play"></i>
                        </button>
                        <div class="voice-waveform" id="waveform-${commentId}"></div>
                        <span class="voice-duration">${formatDuration(comment.duration || 5)}</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="comment">
                <img src="https://via.placeholder.com/32x32" alt="Profile">
                <div class="comment-content">
                    <div class="comment-author">${comment.author}</div>
                    <div class="comment-text">${comment.text}</div>
                </div>
            </div>
        `;
    }
}

// نظام التعليقات الصوتية المتطور
let audioContext = null;
let recordingStartTime = null;
let recordingTimer = null;

// تهيئة نظام الصوت
function initializeAudioSystem() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
        console.warn('Web Audio API not supported:', error);
    }
}

// تسجيل صوتي متقدم مع مؤثرات بصرية
function startAdvancedRecording(postId) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showAdvancedAlert(t('voice_not_supported') || 'التسجيل الصوتي غير مدعوم', 'warning');
        return;
    }
    
    navigator.mediaDevices.getUserMedia({ 
        audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            sampleRate: 44100
        }
    })
    .then(stream => {
        recordedChunks = [];
        recordingStartTime = Date.now();
        
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm;codecs=opus'
        });
        
        // تحديث واجهة التسجيل
        updateRecordingUI(postId, 'recording');
        
        // بدء المؤقت
        startRecordingTimer(postId);
        
        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(blob);
            const duration = Math.floor((Date.now() - recordingStartTime) / 1000);
            
            // حفظ التسجيل مع معلومات متقدمة
            saveVoiceComment(postId, audioUrl, duration, blob);
            
            stream.getTracks().forEach(track => track.stop());
            updateRecordingUI(postId, 'stopped');
            clearInterval(recordingTimer);
        };
        
        mediaRecorder.start(100); // تسجيل كل 100ms
    })
    .catch(err => {
        console.error('Microphone access error:', err);
        showAdvancedAlert(t('microphone_access_denied') || 'تم رفض الوصول إلى الميكروفون', 'error');
    });
}

// مؤقت التسجيل
function startRecordingTimer(postId) {
    let seconds = 0;
    recordingTimer = setInterval(() => {
        seconds++;
        const timerElement = document.getElementById(`timer-${postId}`);
        if (timerElement) {
            timerElement.textContent = formatRecordingTime(seconds);
        }
        
        // حد أقصى للتسجيل (60 ثانية)
        if (seconds >= 60) {
            stopAdvancedRecording(postId);
        }
    }, 1000);
}

// تنسيق وقت التسجيل
function formatRecordingTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// إيقاف التسجيل المتقدم
function stopAdvancedRecording(postId) {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
    clearInterval(recordingTimer);
}

// حفظ التعليق الصوتي مع معلومات متقدمة
function saveVoiceComment(postId, audioUrl, duration, audioBlob) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        const voiceComment = {
            id: Date.now(),
            author: currentUser.name,
            type: 'voice',
            audioUrl: audioUrl,
            duration: duration,
            size: audioBlob.size,
            timestamp: new Date().toISOString(),
            waveform: generateWaveformData(audioBlob) // بيانات الموجة الصوتية
        };
        
        post.comments.push(voiceComment);
        saveData();
        displayPosts();
        
        // إظهار التعليقات تلقائياً
        setTimeout(() => {
            const commentsSection = document.getElementById(`comments-${postId}`);
            if (commentsSection) commentsSection.style.display = 'block';
        }, 100);
        
        showAdvancedAlert(t('voice_comment_saved') || 'تم حفظ التعليق الصوتي', 'success');
    }
}

// إنشاء بيانات الموجة الصوتية (مبسط)
function generateWaveformData(audioBlob) {
    // هذه دالة مبسطة - في التطبيق الحقيقي ستحتاج تحليل صوتي متقدم
    const points = [];
    for (let i = 0; i < 50; i++) {
        points.push(Math.random() * 100);
    }
    return points;
}

// تحديث واجهة التسجيل
function updateRecordingUI(postId, state) {
    const recordBtn = document.getElementById(`recordBtn-${postId}`);
    const stopBtn = document.getElementById(`stopBtn-${postId}`);
    const timerElement = document.getElementById(`timer-${postId}`);
    const indicator = document.getElementById(`indicator-${postId}`);
    
    if (state === 'recording') {
        if (recordBtn) recordBtn.style.display = 'none';
        if (stopBtn) stopBtn.style.display = 'block';
        if (timerElement) {
            timerElement.style.display = 'block';
            timerElement.textContent = '0:00';
        }
        if (indicator) {
            indicator.style.display = 'block';
            indicator.classList.add('recording-pulse');
        }
    } else {
        if (recordBtn) recordBtn.style.display = 'block';
        if (stopBtn) stopBtn.style.display = 'none';
        if (timerElement) timerElement.style.display = 'none';
        if (indicator) {
            indicator.style.display = 'none';
            indicator.classList.remove('recording-pulse');
        }
    }
}

// تشغيل التعليق الصوتي مع مؤثرات بصرية
function playVoiceComment(audioUrl, commentId, waveformData) {
    const audio = new Audio(audioUrl);
    const playBtn = document.getElementById(`play-${commentId}`);
    const waveform = document.getElementById(`waveform-${commentId}`);
    
    // تحديث الواجهة أثناء التشغيل
    audio.onplay = () => {
        if (playBtn) {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.classList.add('playing');
        }
        if (waveform) {
            waveform.classList.add('active');
        }
    };
    
    audio.onended = () => {
        if (playBtn) {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.classList.remove('playing');
        }
        if (waveform) {
            waveform.classList.remove('active');
        }
    };
    
    // تشغيل أو إيقاف الصوت
    if (audio.paused) {
        audio.play().catch(err => {
            console.error('خطأ في تشغيل التسجيل الصوتي:', err);
            showAdvancedAlert(t('audio_play_error') || 'خطأ في تشغيل الصوت', 'error');
        });
    } else {
        audio.pause();
    }
}

// إشعارات متطورة
function showAdvancedAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `advanced-alert alert-${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">${icons[type]}</span>
            <span class="alert-message">${message}</span>
        </div>
    `;
    
    alert.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : type === 'warning' ? '#fff3cd' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : type === 'warning' ? '#856404' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : type === 'warning' ? '#ffeaa7' : '#bee5eb'};
        border-radius: 12px;
        padding: 16px 20px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        z-index: 10000;
        max-width: 400px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-weight: 500;
    `;
    
    if (currentLanguage === 'ar') {
        alert.style.right = 'auto';
        alert.style.left = '20px';
        alert.style.transform = 'translateX(-100%)';
    }
    
    document.body.appendChild(alert);
    
    // إظهار الإشعار
    requestAnimationFrame(() => {
        alert.style.opacity = '1';
        alert.style.transform = 'translateX(0)';
    });
    
    // إخفاء الإشعار بعد 4 ثوان
    setTimeout(() => {
        alert.style.opacity = '0';
        alert.style.transform = `translateX(${currentLanguage === 'ar' ? '-' : ''}100%)`;
        setTimeout(() => {
            if (document.body.contains(alert)) {
                document.body.removeChild(alert);
            }
        }, 300);
    }, 4000);
}

// تنسيق مدة التسجيل
function formatDuration(seconds) {
    if (typeof seconds === 'string') return seconds;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// تبديل التعليق الصوتي
function toggleVoiceComment(postId) {
    const recorder = document.getElementById(`voiceRecorder-${postId}`);
    if (recorder) {
        recorder.style.display = recorder.style.display === 'none' ? 'block' : 'none';
    }
}

// إلغاء التعليق الصوتي
function cancelVoiceComment(postId) {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
    
    const recorder = document.getElementById(`voiceRecorder-${postId}`);
    if (recorder) recorder.style.display = 'none';
    
    updateRecordingUI(postId, 'stopped');
    clearInterval(recordingTimer);
}

// إظهار قائمة المنشور
function showPostMenu(postId, event) {
    event.stopPropagation();
    
    const existingMenu = document.querySelector('.post-context-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    const menu = document.createElement('div');
    menu.className = 'post-context-menu';
    menu.innerHTML = `
        <div class="menu-item" onclick="reportPost(${postId})">
            <i class="fas fa-flag"></i>
            <span>${t('report_post') || 'إبلاغ عن المنشور'}</span>
        </div>
        <div class="menu-item" onclick="hidePost(${postId})">
            <i class="fas fa-eye-slash"></i>
            <span>${t('hide_post') || 'إخفاء المنشور'}</span>
        </div>
    `;
    
    menu.style.cssText = `
        position: absolute;
        background: white;
        border: 1px solid #e4e6ea;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        z-index: 1000;
        min-width: 150px;
        top: ${event.pageY}px;
        left: ${event.pageX}px;
    `;
    
    document.body.appendChild(menu);
    
    // إغلاق القائمة عند النقر خارجها
    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        });
    }, 100);
}

// إبلاغ عن منشور
function reportPost(postId) {
    const reason = prompt(t('report_reason') || 'سبب الإبلاغ:');
    if (reason) {
        reportContent(postId, reason);
    }
}

// إخفاء منشور
function hidePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.hidden = true;
        saveData();
        displayPosts();
        showAdvancedAlert(t('post_hidden') || 'تم إخفاء المنشور', 'info');
    }
}

// مشاركة منشور
function sharePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        // إنشاء منشور جديد كمشاركة
        const sharedPost = {
            id: postIdCounter++,
            author: currentUser.name,
            content: `${t('shared_post') || 'شارك منشور'} ${post.author}: "${post.content}"`,
            time: t('now') || 'الآن',
            likes: 0,
            comments: [],
            liked: false,
            originalPost: post.id
        };
        
        posts.unshift(sharedPost);
        saveData();
        displayPosts();
        showAdvancedAlert(t('post_shared') || 'تم مشاركة المنشور', 'success');
    }
}

// تبديل الإعجاب
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        if (post.liked) {
            post.likes--;
            post.liked = false;
        } else {
            post.likes++;
            post.liked = true;
        }
        saveData();
        displayPosts();
    }
}

// تبديل عرض التعليقات
function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    if (commentsSection.style.display === 'none') {
        commentsSection.style.display = 'block';
    } else {
        commentsSection.style.display = 'none';
    }
}

// التعامل مع إدخال التعليق
function handleCommentKeyPress(event, postId) {
    if (event.key === 'Enter') {
        const input = event.target;
        const commentText = input.value.trim();
        
        if (commentText) {
            // فحص المحتوى غير اللائق
            if (filterInappropriateContent(commentText)) {
                showContentWarning(t('inappropriate_content'));
                return;
            }
            
            addComment(postId, commentText);
            input.value = '';
        }
    }
}

// إضافة تعليق
function addComment(postId, commentText) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments.push({
            author: currentUser.name,
            text: commentText,
            type: 'text'
        });
        saveData();
        displayPosts();
        
        // إظهار التعليقات تلقائياً بعد إضافة تعليق
        setTimeout(() => {
            document.getElementById(`comments-${postId}`).style.display = 'block';
        }, 100);
    }
}

// تنسيق الوقت
function formatTime(timeString) {
    const time = new Date(timeString);
    const now = new Date();
    const diff = now - time;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return t('now');
    if (minutes < 60) return minutes === 1 ? t('minute_ago') : `${minutes} ${t('minutes_ago')}`;
    if (hours < 24) return hours === 1 ? t('hour_ago') : `${hours} ${t('hours_ago')}`;
    return days === 1 ? t('day_ago') : `${days} ${t('days_ago')}`;
}

// إغلاق النوافذ عند النقر خارجها
window.onclick = function(event) {
    const postModal = document.getElementById('postModal');
    const notificationsModal = document.getElementById('notificationsModal');
    const contentWarningModal = document.getElementById('contentWarningModal');
    const accountLimitModal = document.getElementById('accountLimitModal');
    const userMenu = document.getElementById('userMenu');
    
    if (event.target === postModal) {
        closePostModal();
    } else if (event.target === notificationsModal) {
        closeNotifications();
    } else if (event.target === contentWarningModal) {
        closeContentWarning();
    } else if (event.target === accountLimitModal) {
        closeAccountLimitModal();
    } else if (!event.target.closest('.user-menu') && !event.target.closest('.profile-menu')) {
        userMenu.style.display = 'none';
    }
}

// التحقق من حالة تسجيل الدخول عند تحميل الصفحة
window.onload = function() {
    // تحميل تفضيل اللغة
    loadLanguagePreference();
    
    // تهيئة نظام الصوت
    initializeAudioSystem();
    
    // تحميل البيانات
    loadData();
    
    if (currentUser) {
        showMainPage();
    } else {
        document.getElementById('loginPage').style.display = 'block';
    }
};