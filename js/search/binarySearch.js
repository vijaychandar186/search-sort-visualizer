export async function binarySearch(target) {
    let left = 0;
    let right = this.visualizer.array.length - 1;

    while (left <= right && this.visualizer.isRunning) {
        this.visualizer.stepCount++;
        const mid = Math.floor((left + right) / 2);

        const rangeIndices = [];
        for (let i = left; i <= right; i++) {
            rangeIndices.push(i);
        }
        const colors = Array(rangeIndices.length).fill('bg-[var(--chart-2)]');

        const midPosition = rangeIndices.indexOf(mid);
        if (midPosition !== -1) {
            colors[midPosition] = 'bg-[var(--destructive)]';
        }

        this.visualizer.arrayRenderer.renderArray(rangeIndices, colors);
        await this.visualizer.sleep(this.visualizer.getDelay());
        await this.visualizer.waitWhilePaused();

        this.visualizer.comparisonCount++;
        this.visualizer.uiManager.updateCounters();

        if (this.visualizer.array[mid] === target) {
            return mid;
        }

        if (this.visualizer.array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}