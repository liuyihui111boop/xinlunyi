// 智能轮椅统一样式和交互脚本

// 粒子效果配置
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#22d3ee' },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#22d3ee',
                    opacity: 0.15,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 180, line_linked: { opacity: 0.4 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// 滚动动画触发
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card').forEach(card => {
        observer.observe(card);
    });
}

// 数字计数动画
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 鼠标磁吸效果
function initMagneticEffect() {
    document.querySelectorAll('.magnetic-effect').forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            elem.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'translate(0, 0)';
        });
    });
}

// 页面切换过渡效果
function addPageTransition() {
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });

    // 为所有内部链接添加过渡
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('http')) {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// 返回顶部按钮
function addBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '<span class="material-icons">keyboard_arrow_up</span>';
    button.className = 'fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full shadow-2xl flex items-center justify-center opacity-0 transition-all duration-300 z-50 hover:scale-110';
    button.style.display = 'none';

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
            setTimeout(() => button.style.opacity = '1', 10);
        } else {
            button.style.opacity = '0';
            setTimeout(() => button.style.display = 'none', 300);
        }
    });

    document.body.appendChild(button);
}

// 加载动画
function addLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'fixed inset-0 flex items-center justify-center z-[100] transition-opacity duration-500';
    loader.style.background = 'linear-gradient(135deg, #0a0f1a, #1a2438)';
    loader.innerHTML = `
        <div class="text-center">
            <div class="text-8xl animate__animated animate__pulse animate__infinite">
                <span class="material-icons text-6xl text-gradient-primary">accessible</span>
            </div>
            <div class="text-xl text-gray-400 mt-4">智能轮椅</div>
        </div>
    `;
    document.body.appendChild(loader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 800);
    });
}

// 光标跟随效果
function initCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-6 h-6 rounded-full pointer-events-none z-[999] transition-transform duration-100 hidden lg:block';
    cursor.style.background = 'radial-gradient(circle, rgba(34, 211, 238, 0.3), transparent)';
    cursor.style.mixBlendMode = 'screen';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 12 + 'px';
        cursor.style.top = e.clientY - 12 + 'px';
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// 主题色动态切换
function initThemeSwitch() {
    const themeColors = {
        primary: { from: '#06b6d4', to: '#22c55e' },
        rose: { from: '#f43f5e', to: '#fb7185' },
        amber: { from: '#f59e0b', to: '#fbbf24' },
        blue: { from: '#3b82f6', to: '#60a5fa' },
        indigo: { from: '#6366f1', to: '#818cf8' }
    };

    let currentTheme = 'primary';
    const currentUrl = window.location.pathname;

    if (currentUrl.includes('health-detection')) currentTheme = 'rose';
    else if (currentUrl.includes('battery')) currentTheme = 'amber';
    else if (currentUrl.includes('health-calculator')) currentTheme = 'blue';
    else if (currentUrl.includes('customization')) currentTheme = 'indigo';

    return themeColors[currentTheme];
}

// 卡片3D倾斜效果
function init3DCardEffect() {
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    initSmoothScroll();
    initScrollAnimations();
    initMagneticEffect();
    addPageTransition();
    addBackToTop();
    addLoadingAnimation();
    initCursorFollower();
    init3DCardEffect();
});

// 导出函数供其他页面使用
window.WheelchairUtils = {
    animateValue,
    initParticles,
    initSmoothScroll,
    addBackToTop
};
