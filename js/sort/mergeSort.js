export async function mergeSort(left, right, depth = 0) {
    if (left < right && this.visualizer.isRunning) {
        const mid = Math.floor((left + right) / 2);
        const divisionColors = [
            'bg-[var(--chart-3)]',
            'bg-[var(--chart-1)]',
            'bg-[var(--destructive)]',
            'bg-[var(--chart-5)]'
        ];
        const colorIndex = depth % divisionColors.length;

        const indices = Array.from({ length: right - left + 1 }, (_, i) => left + i);
        this.visualizer.arrayRenderer.renderArray(indices, Array(indices.length).fill(divisionColors[colorIndex]));
        await this.visualizer.sleep(this.visualizer.getDelay() * 0.8);
        await this.visualizer.waitWhilePaused();

        await this.mergeSort(left, mid, depth + 1);
        await this.mergeSort(mid + 1, right, depth + 1);
        await this.merge(left, mid, right, depth);
    }
}

async function merge(left, mid, right, depth = 0) {
    const leftArr = this.visualizer.array.slice(left, mid + 1);
    const rightArr = this.visualizer.array.slice(mid + 1, right + 1);

    const leftIndices = Array.from({ length: mid - left + 1 }, (_, i) => left + i);
    const rightIndices = Array.from({ length: right - mid }, (_, i) => mid + 1 + i);

    this.visualizer.arrayRenderer.renderArray(
        [...leftIndices, ...rightIndices],
        [
            ...Array(leftIndices.length).fill('bg-[var(--chart-4)]'),
            ...Array(rightIndices.length).fill('bg-[var(--chart-2)]')
        ]
    );
    await this.visualizer.sleep(this.visualizer.getDelay());
    await this.visualizer.waitWhilePaused();

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length && this.visualizer.isRunning) {
        this.visualizer.stepCount++;
        this.visualizer.comparisonCount++;
        this.visualizer.uiManager.updateCounters();

        const leftElement = left + i;
        const rightElement = mid + 1 + j;

        this.visualizer.arrayRenderer.renderArray(
            [leftElement, rightElement, k],
            [
                'bg-[var(--chart-5)]',
                'bg-[var(--destructive)]',
                'bg-[var(--chart-3)]'
            ]
        );
        await this.visualizer.sleep(this.visualizer.getDelay());
        await this.visualizer.waitWhilePaused();

        if (leftArr[i] <= rightArr[j]) {
            this.visualizer.array[k] = leftArr[i];
            i++;
        } else {
            this.visualizer.array[k] = rightArr[j];
            j++;
        }

        this.visualizer.arrayRenderer.renderArray([k], ['bg-[var(--chart-4)]']);
        await this.visualizer.sleep(this.visualizer.getDelay() * 0.7);
        await this.visualizer.waitWhilePaused();
        k++;
    }

    while (i < leftArr.length && this.visualizer.isRunning) {
        this.visualizer.array[k] = leftArr[i];
        this.visualizer.arrayRenderer.renderArray([k], ['bg-[var(--chart-4)]']);
        await this.visualizer.sleep(this.visualizer.getDelay() * 0.5);
        await this.visualizer.waitWhilePaused();
        i++;
        k++;
    }

    while (j < rightArr.length && this.visualizer.isRunning) {
        this.visualizer.array[k] = rightArr[j];
        this.visualizer.arrayRenderer.renderArray([k], ['bg-[var(--chart-4)]']);
        await this.visualizer.sleep(this.visualizer.getDelay() * 0.5);
        await this.visualizer.waitWhilePaused();
        j++;
        k++;
    }

    const mergedIndices = Array.from({ length: right - left + 1 }, (_, i) => left + i);
    this.visualizer.arrayRenderer.renderArray(mergedIndices, Array(mergedIndices.length).fill('bg-[var(--chart-4)]'));
    await this.visualizer.sleep(this.visualizer.getDelay() * 0.8);
    await this.visualizer.waitWhilePaused();
}