export async function insertionSort() {
    const n = this.visualizer.array.length;
    for (let i = 1; i < n && this.visualizer.isRunning; i++) {
        let key = this.visualizer.array[i];
        let j = i - 1;

        this.visualizer.arrayRenderer.renderArray([i], ['bg-[var(--chart-5)]']);
        await this.visualizer.sleep(this.visualizer.getDelay());
        await this.visualizer.waitWhilePaused();

        while (j >= 0 && this.visualizer.array[j] > key && this.visualizer.isRunning) {
            this.visualizer.stepCount++;
            this.visualizer.comparisonCount++;
            this.visualizer.uiManager.updateCounters();

            this.visualizer.arrayRenderer.renderArray([j, j + 1], ['bg-[var(--destructive)]', 'bg-[var(--destructive)]']);
            await this.visualizer.sleep(this.visualizer.getDelay());
            await this.visualizer.waitWhilePaused();

            this.visualizer.array[j + 1] = this.visualizer.array[j];
            this.visualizer.swapCount++;
            this.visualizer.uiManager.updateCounters();
            j--;
        }

        this.visualizer.array[j + 1] = key;
        this.visualizer.arrayRenderer.renderArray([j + 1], ['bg-[var(--chart-4)]']);
        await this.visualizer.sleep(this.visualizer.getDelay());
        await this.visualizer.waitWhilePaused();
    }
}