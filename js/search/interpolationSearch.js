export async function interpolationSearch(target) {
    let low = 0;
    let high = this.visualizer.array.length - 1;

    while (low <= high && target >= this.visualizer.array[low] && target <= this.visualizer.array[high] && this.visualizer.isRunning) {
        this.visualizer.stepCount++;

        if (low === high) {
            this.visualizer.comparisonCount++;
            this.visualizer.uiManager.updateCounters();

            this.visualizer.arrayRenderer.renderArray([low], ['bg-[var(--destructive)]']);
            await this.visualizer.sleep(this.visualizer.getDelay());
            await this.visualizer.waitWhilePaused();

            if (this.visualizer.array[low] === target) {
                return low;
            }
            return -1;
        }

        const pos = low + Math.floor(((target - this.visualizer.array[low]) / (this.visualizer.array[high] - this.visualizer.array[low])) * (high - low));

        const validPos = Math.max(low, Math.min(high, pos));

        const rangeIndices = [];
        for (let i = low; i <= high; i++) {
            rangeIndices.push(i);
        }
        const colors = Array(rangeIndices.length).fill('bg-[var(--chart-2)]');

        const probePosition = rangeIndices.indexOf(validPos);
        if (probePosition !== -1) {
            colors[probePosition] = 'bg-[var(--destructive)]';
        }

        this.visualizer.arrayRenderer.renderArray(rangeIndices, colors);
        await this.visualizer.sleep(this.visualizer.getDelay());
        await this.visualizer.waitWhilePaused();

        this.visualizer.comparisonCount++;
        this.visualizer.uiManager.updateCounters();

        if (this.visualizer.array[validPos] === target) {
            return validPos;
        }

        if (this.visualizer.array[validPos] < target) {
            low = validPos + 1;
        } else {
            high = validPos - 1;
        }
    }

    return -1;
}