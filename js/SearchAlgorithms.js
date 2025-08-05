import { linearSearch } from './search/linearSearch.js';
import { binarySearch } from './search/binarySearch.js';
import { jumpSearch } from './search/jumpSearch.js';
import { interpolationSearch } from './search/interpolationSearch.js';

export class SearchAlgorithms {
    constructor(visualizer) {
        this.visualizer = visualizer;
        this.linearSearch = linearSearch.bind(this);
        this.binarySearch = binarySearch.bind(this);
        this.jumpSearch = jumpSearch.bind(this);
        this.interpolationSearch = interpolationSearch.bind(this);
    }

    async runSearchAlgorithm(algorithm) {
        const target = parseInt(this.visualizer.uiManager.searchValue.value);
        if (isNaN(target)) {
            this.visualizer.uiManager.searchResultText.textContent = 'Invalid search value';
            return;
        }

        let result = -1;

        switch (algorithm) {
            case 'linear':
                result = await this.linearSearch(target);
                break;
            case 'binary':
                this.visualizer.array.sort((a, b) => a - b);
                this.visualizer.arrayRenderer.renderArray();
                await this.visualizer.sleep(1000);
                await this.visualizer.waitWhilePaused();
                result = await this.binarySearch(target);
                break;
            case 'jump':
                this.visualizer.array.sort((a, b) => a - b);
                this.visualizer.arrayRenderer.renderArray();
                await this.visualizer.sleep(1000);
                await this.visualizer.waitWhilePaused();
                result = await this.jumpSearch(target);
                break;
            case 'interpolation':
                this.visualizer.array.sort((a, b) => a - b);
                this.visualizer.arrayRenderer.renderArray();
                await this.visualizer.sleep(1000);
                await this.visualizer.waitWhilePaused();
                result = await this.interpolationSearch(target);
                break;
        }

        if (result !== -1) {
            this.visualizer.uiManager.searchResultText.textContent = `Found at index ${result}`;
            this.visualizer.arrayRenderer.renderArray([result], ['bg-[var(--chart-4)]']);
        } else {
            this.visualizer.uiManager.searchResultText.textContent = 'Not found';
            this.visualizer.arrayRenderer.renderArray();
        }
    }
}