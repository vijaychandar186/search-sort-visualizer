export async function heapSort() {
    const n = this.visualizer.array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0 && this.visualizer.isRunning; i--) {
        const heapIndices = Array.from({ length: n }, (_, idx) => idx);
        const heapColors = heapIndices.map(idx => idx <= i ? 'bg-[var(--chart-1)]' : 'bg-[var(--chart-2)]');

        this.visualizer.arrayRenderer.renderArray(heapIndices, heapColors);
        await this.visualizer.sleep(this.visualizer.getDelay() * 0.8);
        await this.visualizer.waitWhilePaused();

        await this.heapify(n, i, true);
    }

    this.visualizer.arrayRenderer.renderArray(
        Array.from({ length: n }, (_, i) => i),
        Array(n).fill('bg-[var(--chart-3)]')
    );
    await this.visualizer.sleep(this.visualizer.getDelay() * 1.2);
    await this.visualizer.waitWhilePaused();

    for (let i = n - 1; i > 0 && this.visualizer.isRunning; i--) {
        this.visualizer.arrayRenderer.renderArray([0, i], [
            'bg-[var(--destructive)]',
            'bg-[var(--chart-5)]'
        ]);
        await this.visualizer.sleep(this.visualizer.getDelay());
        await this.visualizer.waitWhilePaused();

        [this.visualizer.array[0], this.visualizer.array[i]] = [this.visualizer.array[i], this.visualizer.array[0]];
        this.visualizer.swapCount++;
        this.visualizer.uiManager.updateCounters();

        const indices = Array.from({ length: n }, (_, idx) => idx);
        const colors = indices.map(idx => {
            if (idx >= i) return 'bg-[var(--chart-4)]';
            if (idx === 0) return 'bg-[var(--destructive)]';
            return 'bg-[var(--chart-2)]';
        });

        this.visualizer.arrayRenderer.renderArray(indices, colors);
        await this.visualizer.sleep(this.visualizer.getDelay() * 0.8);
        await this.visualizer.waitWhilePaused();

        await this.heapify(i, 0, false);
    }
}

export async function heapify(n, i, isBuildPhase = false) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    const nodeIndices = [i];
    const nodeColors = [isBuildPhase ? 'bg-[var(--chart-1)]' : 'bg-[var(--destructive)]'];

    if (left < n) {
        nodeIndices.push(left);
        nodeColors.push('bg-[var(--chart-2)]');
    }
    if (right < n) {
        nodeIndices.push(right);
        nodeColors.push('bg-[var(--chart-2)]');
    }

    this.visualizer.arrayRenderer.renderArray(nodeIndices, nodeColors);
    await this.visualizer.sleep(this.visualizer.getDelay());
    await this.visualizer.waitWhilePaused();

    if (left < n) {
        this.visualizer.comparisonCount++;
        this.visualizer.uiManager.updateCounters();

        this.visualizer.arrayRenderer.renderArray([i, left], [
            'bg-[var(--chart-5)]',
            'bg-[var(--chart-3)]'
        ]);
        await this.visualizer.sleep(this.visualizer.getDelay() * 0.7);
        await this.visualizer.waitWhilePaused();

        if (this.visualizer.array[left] > this.visualizer.array[largest]) {
            largest = left;
        }
    }

    if (right < n) {
        this.visualizer.comparisonCount++;
        this.visualizer.uiManager.updateCounters();

        this.visualizer.arrayRenderer.renderArray([largest, right], [
            'bg-[var(--chart-5)]',
            'bg-[var(--chart-3)]'
        ]);
        await this.visualizer.sleep(this.visualizer.getDelay() * 0.7);
        await this.visualizer.waitWhilePaused();

        if (this.visualizer.array[right] > this.visualizer.array[largest]) {
            largest = right;
        }
    }

    if (largest !== i && this.visualizer.isRunning) {
        this.visualizer.arrayRenderer.renderArray([i, largest], [
            'bg-[var(--destructive)]',
            'bg-[var(--chart-4)]'
        ]);
        await this.visualizer.sleep(this.visualizer.getDelay());
        await this.visualizer.waitWhilePaused();

        [this.visualizer.array[i], this.visualizer.array[largest]] = [this.visualizer.array[largest], this.visualizer.array[i]];
        this.visualizer.swapCount++;
        this.visualizer.stepCount++;
        this.visualizer.uiManager.updateCounters();

        this.visualizer.arrayRenderer.renderArray([i, largest], [
            'bg-[var(--chart-4)]',
            'bg-[var(--chart-4)]'
        ]);
        await this.visualizer.sleep(this.visualizer.getDelay() * 0.8);
        await this.visualizer.waitWhilePaused();

        await this.heapify(n, largest, isBuildPhase);
    }
}