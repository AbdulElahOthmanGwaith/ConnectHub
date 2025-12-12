# دليل التشغيل والاختبار - Advanced Security Platform

## التشغيل السريع

### 1. فتح المنصة المتقدمة
```bash
# فتح الملف مباشرة في المتصفح
open advanced-security-platform.html

# أو تشغيل خادم محلي
python -m http.server 8000
# ثم زيارة: http://localhost:8000/advanced-security-platform.html
```

### 2. تفعيل الميزات المتقدمة
- انقر على زر **"تشغيل الميزات المتقدمة"** في شريط التنقل
- أو افتح Console وأكتب:
```javascript
initializeAdvancedFeatures();
```

## اختبار الميزات المتقدمة

### 1. اختبار محلل التهديدات الذكي

#### طريقة الاختبار:
1. انقر على زر **"تجربة"** في بطاقة محلل التهديدات الذكي
2. أو استخدم الكود التالي في Console:

```javascript
// اختبار تحليل محتوى مشبوه
const sampleXSS = '<script>alert("XSS Attack")</script>';
aiAnalyzer.analyzeContent(sampleXSS, 'test-case')
  .then(result => {
    console.log('تحليل التهديدات:', result);
    console.log('درجة المخاطر:', result.riskScore);
    console.log('التهديدات المكتشفة:', result.threats);
  });

// اختبار تحليل كود SQL Injection
const sqlInjection = "'; DROP TABLE users; --";
aiAnalyzer.analyzeContent(sqlInjection, 'sql-test');

// اختبار تحليل محتوى آمن
const safeContent = '<p>مرحباً بالعالم!</p>';
aiAnalyzer.analyzeContent(safeContent, 'safe-test');
```

#### النتائج المتوقعة:
- محتوى XSS: درجة مخاطر عالية (70-90%)
- SQL Injection: درجة مخاطر عالية (80-95%)
- المحتوى الآمن: درجة مخاطر منخفضة (0-10%)

### 2. اختبار نظام المراقبة الفورية

#### طريقة الاختبار:
1. انقر على زر **"تجربة"** في بطاقة المراقبة الفورية
2. أو استخدم الكود التالي:

```javascript
// بدء المراقبة
realTimeMonitor.startMonitoring(1000);

// إضافة قاعدة تنبيه مخصصة
realTimeMonitor.addAlertRule({
    name: 'Test Alert Rule',
    condition: (metrics) => metrics.requests > 100,
    severity: 'medium',
    message: 'تم تجاوز 100 طلب'
});

// مراقبة الأحداث
realTimeMonitor.on('alertTriggered', (alert) => {
    console.log('تنبيه أمني:', alert);
});

realTimeMonitor.on('metricsCollected', (metrics) => {
    if (metrics.requests % 50 === 0) {
        console.log('إحصائيات المراقبة:', metrics);
    }
});

// محاكاة طلبات
for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        fetch('https://example.com/api/test' + i);
    }, i * 200);
}
```

#### النتائج المتوقعة:
- ظهور إحصائيات في Console
- تنبيهات عند تجاوز الحدود
- مراقبة طلبات الشبكة

### 3. اختبار مولد السياسات الذكي

#### طريقة الاختبار:
1. انقر على زر **"تجربة"** في بطاقة مولد السياسات الذكي
2. أو استخدم الكود التالي:

```javascript
// توليد سياسة لموقع تجريبي
policyGenerator.generatePolicy('https://example.com', {
    strictness: 'medium',
    includeNonce: true
}).then(policy => {
    console.log('سياسة الأمان المولدة:');
    console.log('نوع الموقع:', policy.websiteType);
    console.log('CSP:', policy.policy.csp);
    console.log('الرؤوس:', policy.policy.headers);
    console.log('التوصيات:', policy.recommendations);
});

// توليد سياسة صارمة
policyGenerator.generatePolicy('https://bank.com', {
    strictness: 'high'
}).then(policy => {
    console.log('سياسة صارمة:', policy.policy.csp);
});

// توليد سياسة تجارة إلكترونية
policyGenerator.generatePolicy('https://shop.com', {
    strictness: 'low'
}).then(policy => {
    console.log('سياسة تجارة إلكترونية:', policy.policy.csp);
});
```

#### النتائج المتوقعة:
- تصنيف صحيح لنوع الموقع
- سياسات CSP مناسبة
- إعدادات خادم صحيحة
- توصيات مفيدة

### 4. اختبار منصة التدريب التفاعلي

#### طريقة الاختبار:
1. انقر على زر **"تجربة"** في بطاقة التدريب التفاعلي
2. أو استخدم الكود التالي:

```javascript
// بدء وحدة أساسيات الأمان
const fundamentals = securityTraining.startModule('fundamentals');
console.log('وحدة الأساسيات:', fundamentals);

// بدء وحدة XSS
const xssModule = securityTraining.startModule('xss');
console.log('وحدة XSS:', xssModule);

// أداء اختبار
const quizAnswers = [1, 0, 1]; // إجابات الاختبار
const quizResult = securityTraining.takeQuiz('fundamentals', quizAnswers);
console.log('نتيجة الاختبار:', quizResult);

// عرض التقدم
const progress = securityTraining.getProgress();
console.log('التقدم:', progress);

// عرض الإحصائيات
const stats = securityTraining.getStatistics();
console.log('الإحصائيات:', stats);
```

#### النتائج المتوقعة:
- بدء الدروس بنجاح
- اختبار يعمل بشكل صحيح
- تتبع التقدم
- حساب الإحصائيات

### 5. اختبار لوحة المعلومات

#### طريقة الاختبار:
```javascript
// عرض درجة الأمان
const score = securityDashboard.getSecurityScore();
console.log('درجة الأمان:', score);

// عرض نظرة عامة على التهديدات
const overview = securityDashboard.getThreatOverview();
console.log('نظرة عامة:', overview);

// عرض اتجاه التهديدات
const trends = securityDashboard.getThreatTrends(7);
console.log('الاتجاهات:', trends);

// عرض حالة الامتثال
const compliance = securityDashboard.getComplianceStatus();
console.log('الامتثال:', compliance);

// عرض مقاييس الأداء
const performance = securityDashboard.getPerformanceMetrics();
console.log('الأداء:', performance);

// تفعيل التحديث الفوري
securityDashboard.enableRealTime();

// توليد تقرير
const report = securityDashboard.generateReport('summary', 'html');
console.log('توليد تقرير:', report.id);
```

## اختبار الأدوات التفاعلية

### 1. محاكي XSS الآمن
```javascript
// اختبار إدخال آمن
document.getElementById('xss-demo-input').value = 'مرحباً بالعالم!';
simulateXSSAttack();

// اختبار إدخال مشبوه
document.getElementById('xss-demo-input').value = '<script>alert("XSS")</script>';
simulateXSSAttack();

// اختبار إدخال SQL
document.getElementById('xss-demo-input').value = "'; DROP TABLE users; --";
simulateXSSAttack();
```

### 2. مولد CSP
```javascript
// اختبار قوالب مختلفة
document.getElementById('csp-template').value = 'basic';
generateCSP();

document.getElementById('csp-template').value = 'strict';
generateCSP();

document.getElementById('csp-template').value = 'modern';
generateCSP();

document.getElementById('csp-template').value = 'ecommerce';
generateCSP();
```

### 3. فاحص الأمان
```javascript
// فحص مواقع تجريبية
document.getElementById('scan-demo-input').value = 'https://example.com';
scanWebsite();

document.getElementById('scan-demo-input').value = 'https://google.com';
scanWebsite();

document.getElementById('scan-demo-input').value = 'https://github.com';
scanWebsite();
```

## اختبارات الأداء

### اختبار الذاكرة
```javascript
// مراقبة استخدام الذاكرة
setInterval(() => {
    if (performance.memory) {
        console.log('استخدام الذاكرة:', {
            used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + ' MB',
            total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + ' MB',
            limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) + ' MB'
        });
    }
}, 5000);
```

### اختبار سرعة التحليل
```javascript
// اختبار سرعة محلل التهديدات
const startTime = performance.now();
for (let i = 0; i < 100; i++) {
    aiAnalyzer.analyzeContent(`test content ${i}`, 'performance-test');
}
const endTime = performance.now();
console.log(`متوسط وقت التحليل: ${(endTime - startTime) / 100}ms`);
```

## اختبارات الأمان

### اختبار حماية البيانات
```javascript
// التأكد من عدم إرسال البيانات خارجياً
console.log('اختبار الحماية...');

// مراقبة network requests
const originalFetch = window.fetch;
window.fetch = function(...args) {
    console.log('Network request detected:', args[0]);
    return originalFetch.apply(this, args);
};

// اختبار إرسال بيانات
aiAnalyzer.analyzeContent('sensitive data', 'security-test');
```

### اختبار الخصوصية
```javascript
// التأكد من التخزين المحلي فقط
console.log('اختبار الخصوصية...');

// فحص localStorage
console.log('البيانات المحفوظة:', Object.keys(localStorage));

// فحص sessionStorage
console.log('بيانات الجلسة:', Object.keys(sessionStorage));
```

## استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### 1. خطأ "AIThreatAnalyzer is not defined"
**الحل**: تأكد من تحميل ملف `ai-threat-analyzer.js` قبل تشغيل الكود

#### 2. المراقبة لا تعمل
**الحل**: تأكد من تفعيل المراقبة:
```javascript
securityMonitor.startMonitoring();
```

#### 3. التدريب لا يبدأ
**الحل**: تهيئة منصة التدريب:
```javascript
securityTraining = new SecurityTraining();
securityTraining.startModule('fundamentals');
```

#### 4. لوحة المعلومات فارغة
**الحل**: تحديث البيانات:
```javascript
dashboard.updateAllWidgets();
dashboard.collectCurrentMetrics();
```

### تشخيص المشاكل

#### فحص حالة المكونات
```javascript
console.log('فحص الحالة:');
console.log('AI Analyzer:', typeof aiAnalyzer);
console.log('Security Monitor:', typeof securityMonitor);
console.log('Policy Generator:', typeof policyGenerator);
console.log('Security Training:', typeof securityTraining);
console.log('Security Dashboard:', typeof securityDashboard);
```

#### فحص Console للأخطاء
```javascript
// تفعيل وضع debug
localStorage.setItem('debug', 'true');

// إعادة تحميل الصفحة
location.reload();
```

## ملاحظات هامة

### الأداء
- المنصة محسنة للعمل على الأجهزة الحديثة
- استخدام Web Workers للمعالجة الثقيلة
- ذاكرة تخزين محدودة لتجنب التسريبات

### الأمان
- جميع التحليلات تتم محلياً
- لا يتم إرسال بيانات للخوادم الخارجية
- حماية البيانات الشخصية أولوية قصوى

### التوافق
- متوافق مع جميع المتصفحات الحديثة
- يدعم الهواتف والأجهزة اللوحية
- يعمل بدون اتصال إنترنت

---

**نصيحة**: ابدأ بالاختبارات البسيطة ثم انتقل للاختبارات المتقدمة للحصول على أفضل تجربة!