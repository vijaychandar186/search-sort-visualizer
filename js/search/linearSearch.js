export async function linearSearch(target) {
    for (let i = 0; i < this.visualizer.array.length && this.visualizer.isRunning; i++) {
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