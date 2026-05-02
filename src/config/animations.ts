/**
 * ─── Animation Assets Configuration ───
 *
 * Centralized paths for all animation frame sequences.
 * Desktop assets are the current production frames.
 * Mobile paths are prepared for future dedicated mobile animations.
 *
 * Structure:
 *   public/animations/logo/desktop/   → Logo intro sequence (40 frames)
 *   public/animations/logo/mobile/    → Future mobile logo sequence
 *   public/animations/hero/desktop/   → Hero car sequence (40 frames)
 *   public/animations/hero/mobile/    → Future mobile hero sequence
 */

export const ANIMATION_CONFIG = {
  logo: {
    desktop: {
      basePath: "/animations/logo/desktop",
      framePattern: "ezgif-frame-{index}.jpg", // {index} = 001, 002, ...
      frameCount: 40,
    },
    mobile: {
      // TODO: Add mobile-specific logo animation assets
      basePath: "/animations/logo/mobile",
      framePattern: "ezgif-frame-{index}.jpg",
      frameCount: 0, // No mobile frames yet
    },
  },
  hero: {
    desktop: {
      basePath: "/animations/hero/desktop",
      framePattern: "ezgif-frame-{index}.jpg",
      frameCount: 40,
    },
    mobile: {
      // TODO: Add mobile-specific hero animation assets
      basePath: "/animations/hero/mobile",
      framePattern: "ezgif-frame-{index}.jpg",
      frameCount: 0, // No mobile frames yet
    },
  },
} as const;

/**
 * Returns the correct animation config for the given animation and device.
 * Falls back to desktop if mobile assets are not yet available.
 */
export function getAnimationConfig(
  animation: "logo" | "hero",
  isMobile: boolean
) {
  const config = ANIMATION_CONFIG[animation];
  const mobileConfig = config.mobile;
  const desktopConfig = config.desktop;

  // Use mobile assets only if they actually exist (frameCount > 0)
  const activeConfig =
    isMobile && mobileConfig.frameCount > 0 ? mobileConfig : desktopConfig;

  return activeConfig;
}

/**
 * Builds the full URL for a specific animation frame.
 */
export function getFrameUrl(
  basePath: string,
  framePattern: string,
  frameIndex: number
): string {
  const paddedIndex = frameIndex.toString().padStart(3, "0");
  return `${basePath}/${framePattern.replace("{index}", paddedIndex)}`;
}
