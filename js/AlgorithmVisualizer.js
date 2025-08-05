import { UIManager } from './UIManager.js';
import { ArrayRenderer } from './ArrayRenderer.js';
import { ThemeManager } from './ThemeManager.js';
import { SortingAlgorithms } from './SortingAlgorithms.js';
import { SearchAlgorithms } from './SearchAlgorithms.js';

export class AlgorithmVisualizer {
    constructor() {
        this.array = [];
        this.originalArray = [];
        this.sortedArray = [];
        this.isRunning = false;
        this.isPaused = false;
        this.stepCount = 0;
        this.comparisonCount = 0;
        this.swapCount = 0;
        this.speed = 5;
        this.isSorted = false;

        this.uiManager = new UIManager(this);
        this.arrayRenderer = new ArrayRenderer(this);
        this.themeManager = new ThemeManager();
        this.sortingAlgorithms = new SortingAlgorithms(this);
        this.searchAlgorithms = new SearchAlgorithms(this);

        this.uiManager.initializeElements();
        this.uiManager.setupEventListeners();
        this.generateArray();
        this.uiManager.updateAlgorithmOptions();
    }

    generateArray() {
        if (this.isRunning) return;

        const size = parseInt(this.uiManager.arraySize.value);
        this.array = Array.from({ length: size }, () => Math.floor(Math.random() * 250) + 10);
        this.originalArray = [...this.array];
        this.resetCounters();
        this.isSorted = false;
        this.uiManager.updateCopyButtons();
        this.arrayRenderer.renderArray();
    }

    addSearchValueToArray() {
        if (this.isRunning) return;

        const value = parseInt(this.uiManager.searchValue.value);
        if (isNaN(value)) return;

        const randomIndex = Math.floor(Math.random() * this.array.length);
        this.array[randomIndex] = value;
        this.originalArray = [...this.array];
        this.arrayRenderer.renderArray();
    }

    resetArray() {
        if (this.isRunning) return;

        this.array = [...this.originalArray];
        this.resetCounters();
        this.isSorted = false;
        this.uiManager.updateCopyButtons();
        this.arrayRenderer.renderArray();
    }

    resetCounters() {
        this.stepCount = 0;
        this.comparisonCount = 0;
        this.swapCount = 0;
        this.uiManager.updateCounters();
        this.uiManager.searchResultText.textContent = 'Not found';
    }

    async startAlgorithm() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.isPaused = false;
        this.uiManager.setControlsState(true);
        this.resetCounters();

        const type = this.uiManager.algorithmType.value;
        const algo = this.uiManager.algorithm.value;

        try {
            if (type === 'sort') {
                await this.sortingAlgorithms.runSortingAlgorithm(algo);
                if (this.isRunning) {
                    this.sortedArray = [...this.array];
                    this.isSorted = true;
                    this.uiManager.updateCopyButtons();
                }
            } else {
                await this.searchAlgorithms.runSearchAlgorithm(algo);
            }
        } catch (error) {
            console.error('Algorithm execution error:', error);
        } finally {
            this.isRunning = false;
            this.isPaused = false;
            this.uiManager.setControlsState(false);
        }
    }

    stopAlgorithm() {
        this.isRunning = false;
        this.isPaused = false;
        this.uiManager.setControlsState(false);
    }

    async waitWhilePaused() {
        while (this.isPaused && this.isRunning) {
            await this.sleep(100);
        }
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getDelay() {
        return Math.max(50, 1100 - (this.speed * 100));
    }
}