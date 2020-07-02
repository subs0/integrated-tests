(function () {
    const input = document.querySelector('#search');
    const targets = [...document.querySelectorAll('#sidebarNav li')];
    input.addEventListener('keyup', () => {
        targets.forEach(target => {
            if (!target.innerText.toLowerCase().includes(input.value.toLowerCase())) {
                target.style.display = 'none';
                const list = [...target.parentNode.childNodes].filter(elem => elem.style.display !== 'none');
                if (!list.length) {
                    target.parentNode.style.display = 'none';
                    target.parentNode.previousSibling.style.display = 'none';
                }
                const category = [...target.parentNode.parentNode.childNodes]
                    .filter(elem => elem.tagName !== 'H2' && elem.style.display !== 'none');
                if (!category.length) {
                    target.parentNode.parentNode.style.display = 'none';
                }
            }
            else {
                target.parentNode.style.display = 'block';
                target.parentNode.previousSibling.style.display = 'block';
                target.parentNode.parentNode.style.display = 'block';
                target.style.display = 'block';
            }
        });
    });
})();
