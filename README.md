# Search-Sort Visualizer

Search-Sort Visualizer is an interactive web application that visualizes various sorting and searching algorithms. Built with HTML, CSS, and JavaScript, it allows users to explore how algorithms like Bubble Sort, Merge Sort, Linear Search, and Binary Search work through dynamic animations and real-time metrics.

The project is designed with a modular architecture to enhance maintainability and extensibility, making it easy to add new algorithms or modify existing functionality.

---

## Features

* **Algorithm Visualization**: Visualize sorting (Bubble, Selection, Insertion, Merge, Quick, Heap) and searching (Linear, Binary, Jump, Interpolation) algorithms with animated array bars.
* **Interactive Controls**: Adjust array size, animation speed, and input custom arrays. Start, pause, stop, or reset algorithms.
* **Theme Support**: Toggle between light and dark themes with a smooth transition effect.
* **Real-Time Metrics**: Display time complexity, space complexity, stability, step count, comparisons, and swaps for each algorithm.
* **Responsive Design**: Built with Tailwind CSS for a responsive and modern UI.
* **Modular Codebase**: Organized into separate modules for UI management, rendering, algorithms, and theme handling, with sorting and searching algorithms split into individual files.

---

## Project Structure

```
search-sort-visualizer/
├── css/
│   ├── global.css            # Global styles and Tailwind CSS variables
│   ├── visualizer.css        # Component-specific styles for the visualizer
│   ├── output.css            # Tailwind output classes
├── js/
│   ├── main.js               # Application entry point
│   ├── AlgorithmVisualizer.js  # Core orchestrator class
│   ├── SortingAlgorithms.js    # Parent class for sorting algorithms
│   ├── SearchAlgorithms.js     # Parent class for searching algorithms
│   ├── sort/
│   │   ├── bubbleSort.js        # Bubble Sort implementation
│   │   ├── selectionSort.js     # Selection Sort implementation
│   │   ├── insertionSort.js     # Insertion Sort implementation
│   │   ├── mergeSort.js         # Merge Sort implementation
│   │   ├── quickSort.js         # Quick Sort implementation
│   │   ├── heapSort.js          # Heap Sort implementation
│   ├── search/
│   │   ├── linearSearch.js      # Linear Search implementation
│   │   ├── binarySearch.js      # Binary Search implementation
│   │   ├── jumpSearch.js        # Jump Search implementation
│   │   ├── interpolationSearch.js  # Interpolation Search implementation
│   ├── UIManager.js           # UI interaction and DOM updates
│   ├── ArrayRenderer.js       # Array bar rendering and animations
│   ├── ThemeManager.js        # Theme toggling logic
│   ├── constants.js           # Algorithm metadata and constants
├── index.html                 # Main HTML file
├── README.md                  # Project documentation
```

---

## Serve the Application

Since the project uses ES modules, use a local web server to serve the files.

### Python HTTP Server

```bash
python -m http.server 5500
```

### Node.js with live-server

```bash
npm install -g live-server
live-server
```

### VS Code Live Server

Use the **Live Server** extension in Visual Studio Code.

### Open in Browser

Navigate to `http://localhost:5500` (or the port provided by your server) to view the application.

---

## Usage

1. **Select Algorithm Type**: Choose between "Sorting" or "Searching".
2. **Choose Algorithm**: Select a specific algorithm.
3. **Adjust Settings**:

   * Use the Array Size slider.
   * Use the Speed slider.
   * Enter a Custom Array.
   * Provide Search Value (for searching).
4. **Control Visualization**:

   * Generate New Array
   * Start Algorithm
   * Pause / Resume
   * Stop / Reset
5. **Copy Arrays**: Copy original or sorted array as CSV.
6. **Toggle Theme**: Use the theme toggle button.

---

## Algorithm Details

### Sorting Algorithms

| Algorithm      | Time Complexity             | Space Complexity | Stable |
| -------------- | --------------------------- | ---------------- | ------ |
| Bubble Sort    | O(n²)                       | O(1)             | Yes    |
| Selection Sort | O(n²)                       | O(1)             | No     |
| Insertion Sort | O(n²)                       | O(1)             | Yes    |
| Merge Sort     | O(n log n)                  | O(n)             | Yes    |
| Quick Sort     | O(n log n) avg, O(n²) worst | O(log n)         | No     |
| Heap Sort      | O(n log n)                  | O(1)             | No     |

### Searching Algorithms

| Algorithm            | Time Complexity               | Space Complexity | Stable |
| -------------------- | ----------------------------- | ---------------- | ------ |
| Linear Search        | O(n)                          | O(1)             | N/A    |
| Binary Search        | O(log n)                      | O(1)             | N/A    |
| Jump Search          | O(√n)                         | O(1)             | N/A    |
| Interpolation Search | O(log log n) best, O(n) worst | O(1)             | N/A    |

---

## Development

### Adding a New Algorithm

1. **Define Metadata**: Add to `js/constants.js`
2. **Implement Algorithm**:

   * Create new JS file in `js/sort/` or `js/search/`
   * Export an `async` function
   * Use `arrayRenderer.renderArray`, update `stepCount`, `comparisonCount`, `swapCount`
3. **Bind in Parent Class**: Add to `SortingAlgorithms.js` or `SearchAlgorithms.js`
4. **Update Dropdown**: Edit `UIManager.js`
5. **Test Thoroughly**

### Performance Optimization

* Minimize DOM updates in ArrayRenderer.js
* Consider requestAnimationFrame for smooth animations
* Lazy-load non-critical scripts

---

## Acknowledgments

* Tailwind CSS for styling
* Shadcn Theme for light and dark colour schemes
* Inspired by [VisuAlgo](https://visualgo.net/) and other visualizers
* Thanks to the open-source community!