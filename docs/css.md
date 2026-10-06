# CSS conventions

- Put shared CSS variables in `src/styles/styles.css` and reuse them across
  components.
- Use `rem` for spacing, typography, and component sizing. Keep the viewport
  breakpoints below in `px`.
- Build highly responsive layouts: adapt to available width, let text and
  controls wrap, and avoid horizontal overflow. Verify narrow phones through
  wide desktops.

## Breakpoints

Reuse these viewport widths in CSS media queries. Do not invent new breakpoint
numbers or convert them to nearby `rem` values.

| Size | Breakpoint |
| --- | --- |
| Small phone | `400px` |
| Phone | `600px` |
| Tablet | `750px` |
| Small desktop | `1023px` |
| Large desktop | `1600px` |
| Extra-large desktop | `1800px` |

Use `min-width` for styles at and above a breakpoint, and `max-width` for styles
at and below it.
