# Design System Document: The Analytical Architect

## 1. Overview & Creative North Star
**Creative North Star: "The Precision Lens"**
This design system moves beyond the "generic portfolio" by treating data as high art. It rejects the clutter of traditional dashboards in favor of an editorial, high-end technical experience. The aesthetic is defined by **expansive negative space, intentional asymmetry, and tonal layering**.

To break the "template" look, we utilize a "Precision Lens" approach: 
*   **Asymmetric Grids:** Aligning key data points to a rigid 12-column grid while allowing decorative technical elements to bleed off-canvas.
*   **Micro-Data Accents:** Using the `tertiary` (Teal/Electric Blue) palette for hair-line accents and data-point highlights, making the technical focus feel surgical and deliberate.
*   **Editorial Scale:** Massive `display-lg` typography contrasted against tiny, hyper-legible `label-sm` metadata to create an authoritative, "Financial Times meets Silicon Valley" hierarchy.

## 2. Colors & Surface Philosophy
The palette is rooted in a deep, authoritative navy (`primary: #0e1c2b`) and grounded by a sophisticated architectural gray (`surface: #f8f9fa`).

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. 
*   **Boundary Definition:** Use background shifts. A hero section on `surface` transitions into a "Work" section using `surface-container-low`. 
*   **The Tonal Edge:** If a container requires separation, use a subtle shift from `surface-container-lowest` to `surface-container`. The human eye perceives the change in luminosity as a boundary, which feels more premium than a drawn line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers of fine paper.
*   **Base:** `surface` (#f8f9fa)
*   **Secondary Content:** `surface-container-low` (#f3f4f5)
*   **Floating Cards/Modals:** `surface-container-lowest` (#ffffff)
*   **Interactive Depressions:** `surface-container-high` (#e7e8e9)

### The Glass & Gradient Rule
To prevent the "flat" look of basic Bootstrap sites:
*   **Glassmorphism:** Navigation bars and floating action cards must use `surface-container-lowest` at 80% opacity with a `backdrop-blur` of 12px.
*   **Signature Textures:** Use a subtle linear gradient for high-impact areas (e.g., `primary` to `primary-container`) to add a "carbon-fiber" depth to the professional navy.

## 3. Typography
The typography system balances the brutalist strength of **Space Grotesk** with the utilitarian precision of **Inter**.

*   **Display & Headlines (Space Grotesk):** These are your "Statement" fonts. Use `display-lg` for project titles. The geometric nature of Space Grotesk communicates "Technical Precision."
*   **Body & Titles (Inter):** Used for all functional reading. Inter’s tall x-height ensures readability of complex data descriptions.
*   **Hierarchy as Identity:** Always pair a `display-md` header with a `label-md` uppercase subtitle in the `tertiary` color. This "Micro-Macro" pairing is the signature look of this system.

## 4. Elevation & Depth
We achieve depth through **Tonal Layering** rather than shadows.

*   **The Layering Principle:** Place a `surface-container-lowest` card on top of a `surface-container-low` background. This creates a "soft lift" that feels architectural.
*   **Ambient Shadows:** If a floating element (like a filter popover) requires a shadow, use a 32px blur, 0% spread, and the color `on-surface` at 4% opacity. It should feel like a soft glow of light, not a shadow.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke, use `outline-variant` at 20% opacity. Never use a 100% opaque border.

## 5. Components

### Buttons
*   **Primary:** `primary` background with `on-primary` text. Use `rounded-md` (0.375rem). No shadow; use a slight scale-up (1.02x) on hover.
*   **Secondary:** `surface-container-highest` background. Blends into the layout until hovered.
*   **Tertiary (Technical):** Text-only using `tertiary` (#001f28) with a 1px `tertiary-fixed-dim` underline that expands on hover.

### Cards & Lists
*   **Forbid Divider Lines:** Separate list items with `1.5` (0.5rem) of vertical whitespace and a background hover state of `surface-container-low`.
*   **Data Cards:** Use `surface-container-lowest`. Inside the card, data points should be highlighted with `tertiary_container` accents to draw the eye to the "Analytics."

### Chips (Technical Tags)
*   Use `rounded-full`. Background: `secondary_container`. Text: `on_secondary_container`. These should look like soft pills that don't compete with the primary call to action.

### Input Fields
*   Background: `surface-container-low`. 
*   Border: None, except for a 2px `primary` bottom-border that animates in width on focus. This mimics a "terminal" or "technical entry" feel.

### Additional Component: The "Data Metric" Block
A custom component for this portfolio. A large `headline-lg` number in `primary`, paired with a `label-sm` descriptor in `secondary`, underlined by a 2px `tertiary` sparkline.

## 6. Do's and Don'ts

### Do:
*   **DO** use whitespace as a functional tool. If a section feels crowded, double the spacing token (e.g., move from `8` to `16`).
*   **DO** use `tertiary` sparingly. It is a "laser pointer"—use it only to highlight the most important technical data.
*   **DO** align text to a rigorous baseline. In a data-centric system, misalignment is seen as an error.

### Don't:
*   **DON'T** use black (#000000). Use `on_surface` (#191c1d) for text to maintain the high-end "charcoal" feel.
*   **DON'T** use standard "drop shadows." They look "cheap" and "template-like." Stick to Tonal Layering.
*   **DON'T** use icons from different libraries. Stick to a single, thin-stroke (light) icon set to match the Inter/Space Grotesk weight.
