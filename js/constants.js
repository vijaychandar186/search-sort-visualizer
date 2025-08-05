export const ALGORITHM_DATA = {
    bubble: {
        time: 'O(n²)',
        space: 'O(1)',
        stable: 'Yes',
        description: 'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, indicating the list is sorted.'
    },
    selection: {
        time: 'O(n²)',
        space: 'O(1)',
        stable: 'No',
        description: 'Selection Sort divides the list into sorted and unsorted regions. It repeatedly selects the smallest element from the unsorted region and moves it to the end of the sorted region.'
    },
    insertion: {
        time: 'O(n²)',
        space: 'O(1)',
        stable: 'Yes',
        description: 'Insertion Sort builds the sorted array one item at a time. It takes each element and inserts it into its correct position among the previously sorted elements.'
    },
    merge: {
        time: 'O(n log n)',
        space: 'O(n)',
        stable: 'Yes',
        description: 'Merge Sort divides the array into two halves, recursively sorts them, and then merges the sorted halves back together. It uses a divide-and-conquer approach, splitting until single elements are reached.'
    },
    quick: {
        time: 'O(n log n) avg, O(n²) worst',
        space: 'O(log n)',
        stable: 'No',
        description: 'Quick Sort selects a pivot element and partitions the array around it, placing smaller elements before and larger elements after the pivot. It then recursively sorts the partitions.'
    },
    heap: {
        time: 'O(n log n)',
        space: 'O(1)',
        stable: 'No',
        description: 'Heap Sort builds a max heap from the array, then repeatedly extracts the maximum element and places it at the end of the sorted portion, maintaining the heap property.'
    },
    linear: {
        time: 'O(n)',
        space: 'O(1)',
        stable: 'N/A',
        description: 'Linear Search checks each element in the array sequentially until it finds the target value or reaches the end of the array.'
    },
    binary: {
        time: 'O(log n)',
        space: 'O(1)',
        stable: 'N/A',
        description: 'Binary Search works on sorted arrays by repeatedly dividing the search interval in half. It compares the target with the middle element and eliminates half of the remaining elements.'
    },
    jump: {
        time: 'O(√n)',
        space: 'O(1)',
        stable: 'N/A',
        description: 'Jump Search works on sorted arrays by jumping ahead by fixed steps (block size √n). Once the block containing the target is found, it performs a linear search within that block.'
    },
    interpolation: {
        time: 'O(log log n) best, O(n) worst',
        space: 'O(1)',
        stable: 'N/A',
        description: 'Interpolation Search works on uniformly distributed sorted arrays by estimating the position of the target value using interpolation formula, refining the search range iteratively.'
    }
};