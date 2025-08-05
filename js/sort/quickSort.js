export async function quickSort(low, high, depth = 0) {
    if (low < high && this.visualizer.isRunning) {
        const depthColors = [
            'bg-[var(--secondary)]',
            'bg-[var(--chart-3)]',
            'bg-[var(--destructive)]',
            'bg-[var(--chart-5)]'
        ];
        const colorIndex = depth % depthColors.length;

        const indices = Array.from({ length: high - low + 1 }, (_, i) => low + i);
        this.visualizer.arrayRenderer.renderArray(indices, Array(indices.length).fill(depthColors[colorIndex]));
        await this.visualizer.sleep(this.visualizer.getDelay());
        await this.visualizer.waitWhilePaused();

        const pi = await this.partition(low, high, depth);
        if (this.visualizer.isRunning) {
            this.visualizer.arrayRenderer.renderArray([pi], ['bg-[var(--chart-5)]']);
            await this.visualizer.sleep(this.visualizer.getDelay());
            await this.visualizer.waitWhilePaused();
            await this.quickSort(low, pi - 1, depth + 1);
            await this.quickSort(pi + 1, high, depth + 1);
        }
    }
}

async function partition(low, high, depth = 0) {
    const pivot = this.visualizer.array[high];
    this.visualizer.arrayRenderer.renderArray([high], ['bg-[var(--chart-1)]']);
    await this.visualizer.sleep(this.visualizer.getDelay());
    await this.visualizer.waitWhilePaused();

    let i = low - 1;

    for (let j = low; j < high && this.visualizer.isRunning; j++) {
        this.visualizer.stepCount++;
        this.visualizer.comparisonCount++;
        this.visualizer.uiManager.updateCounters();

        const colors = ['bg-[var(--chart-2)]', 'bg-[var(--chart-1)]'];
        const indices = [j, high];

        if (i >= low) {
            indices.unshift(i);
            colors.unshift('bg-[var(--chart-4)]');
        }

        this.visualizer.arrayRenderer.renderArray(indices, colors);
        await this.visualizer.sleep(this.visualizer.getDelay());
        await this.visualizer.waitWhilePaused();

        if (this.visualizer.array[j] < pivot) {
            i++;
            if (i !== j) {
                this.visualizer.arrayRenderer.renderArray([i, j], [
                    'bg-[var(--chart-5)]',
                    'bg-[var(--chart-5)]'
                ]);
                await this.visualizer.sleep(this.visualizer.getDelay() * 0.8);
                await this.visualizer.waitWhilePaused();

                [this.visualizer.array[i], this.visualizer.array[j]] = [this.visualizer.array[j], this.visualizer.array[i]];
                this.visualizer.swapCount++;
                this.visualizer.uiManager.updateCounters();

                this.visualizer.arrayRenderer.renderArray([i, j], [
                    'bg-[var(--chart-4)]',
                    'bg-[var(--chart-4)]'
                ]);
                await this.visualizer.sleep(this.visualizer.getDelay() * 0.6);
                await this.visualizer.waitWhilePaused();
            }
        }
    }

    this.visualizer.arrayRenderer.renderArray([i + 1, high], [
        'bg-[var(--chart-3)]',
        'bg-[var(--chart-1)]'
    ]);
    await this.visualizer.sleep(this.visualizer.getDelay());
    await this.visualizer.waitWhilePaused();

    [this.visualizer.array[i + 1], this.visualizer.array[high]] = [this.visualizer.array[high], this.visualizer.array[i + 1]];
    this.visualizer.swapCount++;
    this.visualizer.uiManager.updateCounters();

    this.visualizer.arrayRenderer.renderArray([i + 1], ['bg-[var(--chart-5)]']);
    await this.visualizer.sleep(this.visualizer.getDelay());
    await this.visualizer.waitWhilePaused();

    return i + 1;
}