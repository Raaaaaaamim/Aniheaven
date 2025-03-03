import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function calculateVideoProgressPercentage(
  videoDuration,
  watchedDuration,
) {
  // Input validation: Ensure durations are numbers and watchedDuration is not negative
  if (
    typeof videoDuration !== "number" ||
    typeof watchedDuration !== "number"
  ) {
    console.error(
      "Error: Both videoDuration and watchedDuration must be numbers.",
    );
    return 0; // Or handle error differently, e.g., throw an error
  }

  if (videoDuration <= 0) {
    console.warn(
      "Warning: videoDuration is zero or negative. Returning 0 to avoid division by zero.",
    );
    return 0; // Avoid division by zero if videoDuration is zero or negative.
  }

  if (watchedDuration < 0) {
    console.warn("Warning: watchedDuration is negative. Assuming 0 watched.");
    watchedDuration = 0; // Treat negative watched duration as 0.
  }

  if (watchedDuration > videoDuration) {
    console.warn(
      "Warning: watchedDuration is greater than videoDuration. Capping watchedDuration to videoDuration.",
    );
    watchedDuration = videoDuration; // Cap watchedDuration at videoDuration if user has watched more than total duration.
  }

  if (watchedDuration === 0 && videoDuration > 0) {
    return 0; // If nothing watched and video has duration, return 0.
  }

  // Calculate the percentage
  let percentage = (watchedDuration / videoDuration) * 100;

  // Round to the nearest whole number (optional, for cleaner output)
  percentage = Math.round(percentage);

  // Ensure the percentage is within the 1-100 range and handle cases where it might be zero
  if (percentage > 100) {
    return 100; // Cap at 100%
  } else if (percentage < 0) {
    return 0; // Should not happen with valid inputs, but for safety
  } else if (percentage === 0 && watchedDuration > 0) {
    return 1; // If watched a bit but rounded down to 0, return at least 1 to indicate some progress.
  } else if (percentage === 0 && watchedDuration === 0 && videoDuration > 0) {
    return 0; // Explicitly return 0 if nothing watched and video has duration.
  } else if (videoDuration === 0 && watchedDuration === 0) {
    return 100; // If video duration is 0, consider it 100% watched (edge case - video is empty)
  }

  return percentage;
}
