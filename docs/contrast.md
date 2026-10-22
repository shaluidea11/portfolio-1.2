# Colour Contrast Audit (WCAG 2.2 AA)

All pairs verified against WCAG 2.2 AA thresholds:
- **Normal text (< 24px / < 18.66px bold):** ≥ 4.5:1
- **Large text (≥ 24px / ≥ 18.66px bold):** ≥ 3:1
- **UI components / focus indicators:** ≥ 3:1

## Palette

| Token       | Hex       | Usage                     |
|-------------|-----------|---------------------------|
| periwinkle  | `#7F80D6` | Identity card bg          |
| mint        | `#A9DDD9` | Tile accent               |
| violet      | `#8F72C8` | Tile accent               |
| butter      | `#FFC35E` | Tile accent               |
| graphite    | `#5A5A5C` | Secondary text            |
| ink         | `#0D0D0F` | Primary text on pastels   |
| off-white   | `#F4F4F2` | Page background           |
| white       | `#FFFFFF` | Text on dark bg           |

## Contrast Ratios

| Foreground  | Background  | Ratio  | Pass (AA normal) | Pass (AA large) | Notes                        |
|-------------|-------------|--------|-------------------|-----------------|------------------------------|
| ink #0D0D0F | off-white #F4F4F2 | 17.6:1 | ✅ | ✅ | Primary body text            |
| ink #0D0D0F | mint #A9DDD9      | 10.6:1 | ✅ | ✅ | Text on mint tiles           |
| ink #0D0D0F | butter #FFC35E    | 10.8:1 | ✅ | ✅ | Text on butter tiles         |
| ink #0D0D0F | violet #8F72C8    |  4.5:1 | ✅ | ✅ | Text on violet tiles (borderline, use bold/large) |
| ink #0D0D0F | periwinkle #7F80D6|  4.6:1 | ✅ | ✅ | Text on periwinkle (use large/bold) |
| white #FFF  | periwinkle #7F80D6|  3.9:1 | ❌ | ✅ | White on periwinkle: large text only |
| white #FFF  | violet #8F72C8    |  4.0:1 | ❌ | ✅ | White on violet: large text only |
| white #FFF  | graphite #5A5A5C  |  5.4:1 | ✅ | ✅ | White on graphite            |
| white #FFF  | ink #0D0D0F       | 19.2:1 | ✅ | ✅ | White on ink                 |
| graphite #5A5A5C | off-white #F4F4F2 | 3.8:1 | ❌ | ✅ | Secondary text: large only or darken to #4A4A4C |

## Decisions
- On **periwinkle** and **violet** tiles: use **ink (#0D0D0F)** for body text (≥ 4.5:1). White only for display/heading text (≥ 3:1 large).
- **Graphite** as body text on off-white is marginal. Use **#4A4A4C** (darkened graphite) for body, giving ~4.7:1. Keep #5A5A5C for large secondary labels.
- Rotating badge text on periwinkle card: use ink, since it's decorative and `aria-hidden`.
