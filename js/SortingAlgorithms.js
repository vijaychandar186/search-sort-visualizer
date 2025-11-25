import { bubbleSort } from './sort/bubbleSort.js';
import { selectionSort } from './sort/selectionSort.js';
import { insertionSort } from './sort/insertionSort.js';
import { mergeSort, merge } from './sort/mergeSort.js';
import { quickSort, partition } from './sort/quickSort.js';
import { heapSort, heapify } from './sort/heapSort.js';

export class SortingAlgorithms {
    constructor(visualizer) {
        this.visualizer = visualizer;
        this.bubbleSort = bubbleSort.bind(this);
        this.selectionSort = selectionSort.bind(this);
        this.insertionSort = insertionSort.bind(this);
        this.mergeSort = mergeSort.bind(this);
        this.quickSort = quickSort.bind(this);
        this.heapSort = heapSort.bind(this);

        // Bind helper functions
        this.merge = merge.bind(this);
        this.partition = partition.bind(this);
        this.heapify = heapify.bind(this);
    }

    async runSortingAlgorithm(algorithm) {
        switch (algorithm) {
            case 'bubble':
                await this.bubbleSort();
                break;
            case 'selection':
                await this.selectionSort();
                break;
            case 'insertion':
                await this.insertionSort();
                break;
            case 'merge':
                await this.mergeSort(0, this.visualizer.array.length - 1);
                break;
            case 'quick':
                await this.quickSort(0, this.visualizer.array.length - 1);
                break;
            case 'heap':
                await this.heapSort();
                break;
        }

        if (this.visualizer.isRunning) {
            this.visualizer.arrayRenderer.renderArray(
                Array.from({length: this.visualizer.array.length}, (_, i) => i),
                Array(this.visualizer.array.length).fill('bg-[var(--chart-4)]')
            );
            await this.visualizer.sleep(1000);
            await this.visualizer.waitWhilePaused();
            this.visualizer.arrayRenderer.renderArray();
        }
    }
}