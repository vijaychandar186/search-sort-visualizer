export class ArrayRenderer {
    constructor(visualizer) {
        this.visualizer = visualizer;
        this.arrayContainer = document.getElementById('arrayContainer');
    }

    renderArray(highlightIndices = [], colors = []) {
        this.arrayContainer.innerHTML = '';
        if (this.visualizer.array.length === 0) return;

        const maxValue = Math.max(...this.visualizer.array, 10);
        const containerWidth = this.arrayContainer.clientWidth || 800;
        const totalGaps = this.visualizer.array.length - 1;
        const gapWidth = 2;
        const availableWidth = containerWidth - (totalGaps * gapWidth);
        const barWidth = Math.max(8, Math.min(40, availableWidth / this.visualizer.array.length));

        this.visualizer.array.forEach((value, index) => {
            const bar = document.createElement('div');
            const height = Math.max(20, (value / maxValue) * 250);

            bar.className = 'array-bar rounded-t-[var(--radius)] relative transition-all duration-300';
            bar.style.height = `${height}px`;
            bar.style.width = `${barWidth}px`;

            let bgColor = 'bg-[var(--chart-2)]';

            const highlightIndex = highlightIndices.indexOf(index);
            if (highlightIndex !== -1) {
                if (colors[highlightIndex]) {
                    bgColor = colors[highlightIndex];
                } else {
                    bgColor = 'bg-[var(--destructive)]';
                }
                bar.classList.add('highlight');
            }

            bar.className += ` ${bgColor}`;

            if (this.visualizer.array.length <= 25) {
                const label = document.createElement('span');
                label.className = 'absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-[var(--foreground)] font-medium';
                label.textContent = value;
                bar.appendChild(label);
            }

            this.arrayContainer.appendChild(bar);
        });
    }
}