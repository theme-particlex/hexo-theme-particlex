document.addEventListener('DOMContentLoaded', function () {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = Array.from(document.querySelectorAll('.content h1, .content h2, .content h3, .content h4, .content h5, .content h6'));
    const scrollOffset = 70; 
    let isScrolling = false;
    function highlight(id) {
        if (!id) return;
        tocLinks.forEach(link => {
            const href = decodeURIComponent(link.getAttribute('href'));
            if (href === '#' + id) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    function scrollSpy() {
        if (isScrolling) return;
        let currentId = '';
        const triggerLine = scrollOffset + 20; 
        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= triggerLine) {
                currentId = section.getAttribute('id');
            } else {
                break;
            }
        }
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
            currentId = sections[sections.length - 1].getAttribute('id');
        }
        if (currentId) highlight(currentId);
    }
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(scrollSpy);
        }
    });

    tocLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            isScrolling = true;
            const targetId = decodeURIComponent(this.getAttribute('href')).substring(1);
            highlight(targetId);
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        });
    });
    scrollSpy();
});