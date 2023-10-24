let totalLength = 0;

export function incrementTotalLength(length) {
  totalLength += length;
}

export function getTotalLength() {
  return totalLength;
}

// Function to reset totalLength (for testing purposes)
export function resetTotalLength() {
  totalLength = 0;
}
