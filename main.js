
class LottoNumbers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .numbers-container {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 20px;
                }
                .number-circle {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: var(--ball-bg, #333);
                    color: var(--ball-text, #fff);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 20px;
                    font-weight: bold;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }
            </style>
            <div class="numbers-container"></div>
        `;
    }

    generateNumbers() {
        const numbersContainer = this.shadowRoot.querySelector('.numbers-container');
        numbersContainer.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        for (const number of [...numbers].sort((a, b) => a - b)) {
            const circle = document.createElement('div');
            circle.className = 'number-circle';
            circle.textContent = number;
            numbersContainer.appendChild(circle);
        }
    }
}

customElements.define('lotto-numbers', LottoNumbers);

document.getElementById('generator-btn').addEventListener('click', () => {
    document.querySelector('lotto-numbers').generateNumbers();
});

const THEME_STORAGE_KEY = 'theme';
const themeToggleBtn = document.getElementById('theme-toggle-btn');

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    themeToggleBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
}

function getInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

let currentTheme = getInitialTheme();
applyTheme(currentTheme);

themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    applyTheme(currentTheme);
});
