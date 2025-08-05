export async function bubbleSort() {
    const n = this.visualizer.array.length;
    for (let i = 0; i < n - 1 && this.visualizer.isRunning; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1 && this.visualizer.isRunning; j++) {
            await this.visualizer.waitWhilePaused();
            this.visualizer.stepCount++;
            this.visualizer.comparisonCount++;
            this.visualizer.uiManager.updateCounters();

            this.visualizer.arrayRenderer.renderArray([j, j + 1], ['bg-[var(--destructive)]', 'bg-[var(--destructive)]']);
            await this.visualizer.sleep(this.visualizer.getDelay());
            await this.visualizer.waitWhilePaused();

            if (this.visualizer.array[j] > this.visualizer.array[j + 1]) {
                [this.visualizer.array[j], this.visualizer.array[j + 1]] = [this.visualizer.array[j + 1], this.visualizer.array[j]];
                this.visualizer.swapCount++;
                this.visualizer.uiManager.updateCounters();
                swapped = true;

                this.visualizer.arrayRenderer.renderArray([j, j + 1], ['bg-[var(--chart-5)]', 'bg-[var(--chart-5)]']);
                await this.visualizer.sleep(this.visualizer.getDelay());
                await this.visualizer.waitWhilePaused();
            }
        }
        if (!swapped) break;
    }
}