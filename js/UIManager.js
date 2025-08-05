import { ALGORITHM_DATA } from './constants.js';

export class UIManager {
    constructor(visualizer) {
        this.visualizer = visualizer;
    }

    initializeElements() {
        this.arrayContainer = document.getElementById('arrayContainer');
        this.algorithmType = document.getElementById('algorithmType');
        this.algorithm = document.getElementById('algorithm');
        this.arraySize = document.getElementById('arraySize');
        this.speedControl = document.getElementById('speed');
        this.searchControls = document.getElementById('searchControls');
        this.csvControls = document.getElementById('csvControls');
        this.searchValue = document.getElementById('searchValue');
        this.searchResult = document.getElementById('searchResult');
        this.searchResultText = document.getElementById('searchResultText');
        this.customArrayInput = document.getElementById('customArray');
        this.customArrayError = document.getElementById('customArrayError');

        this.generateBtn = document.getElementById('generateArray');
        this.startBtn = document.getElementById('startAlgorithm');
        this.pausePlayBtn = document.getElementById('pausePlayAlgorithm');
        this.stopBtn = document.getElementById('stopAlgorithm');
        this.resetBtn = document.getElementById('resetArray');
        this.addSearchBtn = document.getElementById('addSearchValue');
        this.loadCustomArrayBtn = document.getElementById('loadCustomArray');
        this.copyOriginalArrayBtn = document.getElementById('copyOriginalArray');
        this.copySortedArrayBtn = document.getElementById('copySortedArray');
        this.themeToggleBtn = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');

        this.timeComplexity = document.getElementById('timeComplexity');
        this.spaceComplexity = document.getElementById('spaceComplexity');
        this.stable = document.getElementById('stable');
        this.stepCountEl = document.getElementById('stepCount');
        this.comparisonCountEl = document.getElementById('comparisonCount');
        this.swapCountEl = document.getElementById('swapCount');
        this.algorithmDescription = document.getElementById('algorithmDescription');
    }

    setupEventListeners() {
        this.generateBtn.addEventListener('click', () => this.visualizer.generateArray());
        this.startBtn.addEventListener('click', () => this.visualizer.startAlgorithm());
        this.pausePlayBtn.addEventListener('click', () => this.togglePausePlay());
        this.stopBtn.addEventListener('click', () => this.visualizer.stopAlgorithm());
        this.resetBtn.addEventListener('click', () => this.visualizer.resetArray());
        this.addSearchBtn.addEventListener('click', () => this.visualizer.addSearchValueToArray());
        this.loadCustomArrayBtn.addEventListener('click', () => this.loadCustomArray());
        this.copyOriginalArrayBtn.addEventListener('click', () => this.copyArrayToClipboard('original'));
        this.copySortedArrayBtn.addEventListener('click', () => this.copyArrayToClipboard('sorted'));
        this.themeToggleBtn.addEventListener('click', (e) => this.visualizer.themeManager.toggleTheme(e));

        this.algorithmType.addEventListener('change', () => this.updateAlgorithmOptions());
        this.algorithm.addEventListener('change', () => this.updateAlgorithmInfo());
        this.arraySize.addEventListener('input', (e) => {
            document.getElementById('arraySizeValue').textContent = e.target.value;
            if (!this.visualizer.isRunning) this.visualizer.generateArray();
        });
        this.speedControl.addEventListener('input', (e) => {
            document.getElementById('speedValue').textContent = e.target.value;
            this.visualizer.speed = parseInt(e.target.value);
        });
        this.customArrayInput.addEventListener('input', () => {
            this.customArrayError.style.display = 'none';
            this.customArrayError.textContent = '';
        });
    }

    async copyArrayToClipboard(type) {
        let dataArray;
        let button;
        let icon;
        if (type === 'original') {
            dataArray = this.visualizer.originalArray;
            button = this.copyOriginalArrayBtn;
            icon = document.getElementById('copyOriginalIcon');
        } else if (type === 'sorted') {
            dataArray = this.visualizer.sortedArray;
            button = this.copySortedArrayBtn;
            icon = document.getElementById('copySortedIcon');
        }

        if (!dataArray || dataArray.length === 0) {
            return;
        }

        const csvContent = dataArray.join(',');

        try {
            await navigator.clipboard.writeText(csvContent);
            const originalSVG = icon.innerHTML;
            icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            `;
            button.disabled = true;
            setTimeout(() => {
                icon.innerHTML = originalSVG;
                button.disabled = false;
            }, 1500);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    loadCustomArray() {
        if (this.visualizer.isRunning) return;

        const input = this.customArrayInput.value.trim();
        this.customArrayError.style.display = 'none';
        this.customArrayError.textContent = '';

        if (!input) {
            this.customArrayError.textContent = 'Please enter numbers separated by commas.';
            this.customArrayError.style.display = 'block';
            return;
        }

        const values = input.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
        if (values.length === 0) {
            this.customArrayError.textContent = 'Please enter valid numbers separated by commas.';
            this.customArrayError.style.display = 'block';
            return;
        }

        if (values.length > 50) {
            this.customArrayError.textContent = 'Array size cannot exceed 50 elements.';
            this.customArrayError.style.display = 'block';
            return;
        }

        this.visualizer.array = values;
        this.visualizer.originalArray = [...this.visualizer.array];
        this.arraySize.value = values.length;
        document.getElementById('arraySizeValue').textContent = values.length;
        this.visualizer.resetCounters();
        this.visualizer.isSorted = false;
        this.updateCopyButtons();
        this.visualizer.arrayRenderer.renderArray();
    }

    updateAlgorithmOptions() {
        const type = this.algorithmType.value;
        this.algorithm.innerHTML = '';

        if (type === 'sort') {
            this.searchControls.classList.add('hidden');
            this.searchResult.classList.add('hidden');
            this.csvControls.classList.remove('hidden');
            const sortAlgorithms = [
                { value: 'bubble', text: 'Bubble Sort' },
                { value: 'selection', text: 'Selection Sort' },
                { value: 'insertion', text: 'Insertion Sort' },
                { value: 'merge', text: 'Merge Sort' },
                { value: 'quick', text: 'Quick Sort' },
                { value: 'heap', text: 'Heap Sort' }
            ];
            sortAlgorithms.forEach(algo => {
                const option = document.createElement('option');
                option.value = algo.value;
                option.textContent = algo.text;
                this.algorithm.appendChild(option);
            });
        } else {
            this.searchControls.classList.remove('hidden');
            this.searchResult.classList.remove('hidden');
            this.csvControls.classList.add('hidden');
            const searchAlgorithms = [
                { value: 'linear', text: 'Linear Search' },
                { value: 'binary', text: 'Binary Search' },
                { value: 'jump', text: 'Jump Search' },
                { value: 'interpolation', text: 'Interpolation Search' }
            ];
            searchAlgorithms.forEach(algo => {
                const option = document.createElement('option');
                option.value = algo.value;
                option.textContent = algo.text;
                this.algorithm.appendChild(option);
            });
        }

        this.updateAlgorithmInfo();
    }

    updateCopyButtons() {
        this.copySortedArrayBtn.disabled = !this.visualizer.isSorted;
    }

    updateAlgorithmInfo() {
        const algo = this.algorithm.value;
        const data = ALGORITHM_DATA[algo];
        if (data) {
            this.timeComplexity.textContent = data.time;
            this.spaceComplexity.textContent = data.space;
            this.stable.textContent = data.stable;
            this.algorithmDescription.textContent = data.description;
        }
    }

    setControlsState(isRunning) {
        const controls = [
            this.generateBtn,
            this.resetBtn,
            this.algorithmType,
            this.algorithm,
            this.arraySize,
            this.customArrayInput,
            this.loadCustomArrayBtn,
            this.startBtn
        ];

        controls.forEach(control => {
            if (isRunning) {
                control.classList.add('disabled');
                control.disabled = true;
            } else {
                control.classList.remove('disabled');
                control.disabled = false;
            }
        });

        this.stopBtn.disabled = !isRunning;
        this.pausePlayBtn.disabled = !isRunning;
        this.updatePausePlayIcon();
    }

    updatePausePlayIcon() {
        const icon = this.pausePlayBtn.querySelector('#pausePlayIcon');
        icon.innerHTML = this.visualizer.isPaused ?
            `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/>` :
            `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h4v16H6zM14 4h4v16h-4z"/>`;
    }

    togglePausePlay() {
        if (!this.visualizer.isRunning) return;

        this.visualizer.isPaused = !this.visualizer.isPaused;
        this.updatePausePlayIcon();
    }

    updateCounters() {
        this.stepCountEl.textContent = this.visualizer.stepCount;
        this.comparisonCountEl.textContent = this.visualizer.comparisonCount;
        this.swapCountEl.textContent = this.visualizer.swapCount;
    }
}