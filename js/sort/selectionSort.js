export async function selectionSort() {
    const n = this.visualizer.array.length;
    for (let i = 0; i < n - 1 && this.visualizer.isRunning; i++) {
        let minIdx = i;
        this.visualizer.arrayRenderer.renderArray([i], ['bg-[var(--chart-4)]']);
        await this.visualizer.sleep(this.visualizer.getDelay());
        await this.visualizer.waitWhilePaused();

        for (let j = i + 1; j < n && this.visualizer.isRunning; j++) {
            this.visualizer.stepCount++;
            this.visualizer.comparisonCount++;
            this.visualizer.uiManager.updateCounters();

            this.visualizer.arrayRenderer.renderArray([i, j, minIdx], [
                'bg-[var(--chart-4)]',
                'bg-[var(--destructive)]',
                'bg-[var(--chart-3)]'
            ]);
            await this.visualizer.sleep(this.visualizer.getDelay());
            await this.visualizer.waitWhilePaused();

            if (this.visualizer.array[j] < this.visualizer.array[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            [this.visualizer.array[i], this.visualizer.array[minIdx]] = [this.visualizer.array[minIdx], this.visualizer.array[i]];
            this.visualizer.swapCount++;
            this.visualizer.uiManager.updateCounters();

            this.visualizer.arrayRenderer.renderArray([i, minIdx], ['bg-[var(--chart-5)]', 'bg-[var(--chart-5)]']);
            await this.visualizer.sleep(this.visualizer.getDelay());
            await this.visualizer.waitWhilePaused();
        }
    }
}