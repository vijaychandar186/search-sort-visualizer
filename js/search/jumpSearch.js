export async function jumpSearch(target) {
    const n = this.visualizer.array.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;

    while (this.visualizer.array[Math.min(prev + step, n) - 1] < target && this.visualizer.isRunning) {
        this.visualizer.stepCount++;
        this.visualizer.comparisonCount++;
        this.visualizer.uiManager.updateCounters();

        const blockIndices = [];
        for (let i = prev; i < Math.min(prev + step, n); i++) {
            blockIndices.push(i);
        }
        this.visualizer.arrayRenderer.renderArray(blockIndices, Array(blockIndices.length).fill('bg-[var(--chart-3)]'));
        await this.visualizer.sleep(this.visualizer.getDelay());
        await this.visualizer.waitWhilePaused();

        prev += step;

        if (prev >= n) {
            break;
        }
    }

    const blockStart = Math.max(0, prev);
    const blockEnd = Math.min(prev + step, n);

    const blockIndices = [];
    for (let i = blockStart; i < blockEnd; i++) {
        blockIndices.push(i);
    }
    this.visualizer.arrayRenderer.renderArray(blockIndices, Array(blockIndices.length).fill('bg-[var(--chart-5)]'));
    await this.visualizer.sleep(this.visualizer.getDelay());
    await this.visualizer.waitWhilePaused();

    for (let i = blockStart; i < blockEnd && this.visualizer.isRunning; i++) {
        this.visualizer.stepCount++;
        this.visualizer.comparisonCount++;
        this.visualizer.uiManager.updateCounters();

        this.visualizer.arrayRenderer.renderArray([i], ['bg-[var(--destructive)]']);
        await this.visualizer.sleep(this.visualizer.getDelay());
        await this.visualizer.waitWhilePaused();

        if (this.visualizer.array[i] === target) {
            return i;
        }
    }

    return -1;
}