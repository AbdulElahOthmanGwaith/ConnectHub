<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عبدالإله غويث</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * {margin: 0; padding: 0; box-sizing: border-box;}
        body {
            font-family: 'Cairo', sans-serif;
            line-height: 1.6;
            background-color: #f0f2f5;
            color: #333;
            scroll-behavior: smooth;
        }
        header {
            background: linear-gradient(90deg, #4CAF50, #45A049);
            color: white;
            padding: 40px 20px;
            text-align: center;
            position: relative;
        }
        header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        nav {
            position: sticky;
            top: 0;
            background-color: white;
            display: flex;
            justify-content: center;
            padding: 10px 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            z-index: 1000;
        }
        nav a {
            margin: 0 15px;
            text-decoration: none;
            color: #4CAF50;
            font-weight: bold;
            transition: color 0.3s;
        }
        nav a:hover {
            color: #2e7d32;
        }
        section {
            max-width: 900px;
            margin: 40px auto;
            padding: 30px;
            background-color: white;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease-out;
        }
        section.visible {
            opacity: 1;
            transform: translateY(0);
        }
        h2 {
            color: #4CAF50;
            margin-bottom: 15px;
        }
        p {
            margin-bottom: 15px;
        }
        form {
            display: flex;
            flex-direction: column;
        }
        input, textarea {
            margin: 10px 0;
            padding: 12px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 8px;
            transition: border-color 0.3s;
        }
        input:focus, textarea:focus {
            border-color: #4CAF50;
            outline: none;
        }
        button {
            padding: 12px;
            background-color: #4CAF50;
            color: white;
            border: none;
            font-size: 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #388E3C;
        }
        .social-links {
            text-align: center;
            margin-top: 20px;
        }
        .social-links a {
            margin: 0 10px;
            text-decoration: none;
            font-weight: bold;
            color: #4CAF50;
            transition: color 0.3s;
        }
        .social-links a:hover {
            color: #2e7d32;
        }
        footer {
            text-align: center;
            padding: 20px;
            background-color: #333;
            color: white;
            margin-top: 30px;
        }
        .hero-image {
            width: 100%;
            max-height: 400px;
            object-fit: cover;
            border-radius: 15px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>

<header>
    <h1>مرحبا بكم في موقع عبدالإله غويث</h1>
    <p>موقع شخصي لعرض نبذة عني وروابطي وأفضل الطرق للتواصل</p>
</header>

<nav>
    <a href="#about">نبذة عني</a>
    <a href="#contact">تواصل معي</a>
    <a href="#social">روابطي الاجتماعية</a>
</nav>

<section id="about">
    <h2>نبذة عني</h2>
    <img src="https://via.placeholder.com/800x300.png?text=صورة+عبدالإله+غويث" alt="عبدالإله غويث" class="hero-image">
    <p>اسمي عبدالإله غويث، أحب تطوير المواقع الإلكترونية والتصميم، وأسعى دائمًا لتعلم كل جديد في عالم التقنية.</p>
    <p>هذا الموقع الشخصي يعرض نبذة عني، أعمالي وروابطي الاجتماعية لتسهيل التواصل معي.</p>
</section>

<section id="contact">
    <h2>نموذج التواصل</h2>
    <form action="#" method="post">
        <input type="text" name="name" placeholder="اسمك" required>
        <input type="email" name="email" placeholder="بريدك الإلكتروني" required>
        <textarea name="message" placeholder="رسالتك" rows="5" required></textarea>
        <button type="submit">إرسال</button>
    </form>
</section>

<section id="social">
    <h2>روابطي الاجتماعية</h2>
    <div class="social-links">
        <a href="https://www.facebook.com/" target="_blank">فيسبوك</a>
        <a href="https://twitter.com/" target="_blank">تويتر</a>
        <a href="https://www.linkedin.com/" target="_blank">لينكدإن</a>
        <a href="https://www.instagram.com/" target="_blank">إنستغرام</a>
    </div>
</section>

<footer>
    &copy; 2025 عبدالإله غويث
</footer>

<script>
    // تأثير الظهور عند التمرير
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        const triggerBottom = window.innerHeight / 5 * 4;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if(sectionTop < triggerBottom){
                section.classList.add('visible');
            }
        });
    });
</script>

</body>
</html># AbdulElah-Othman-Gwaith