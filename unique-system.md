# Unique System Design

## 1. Font Name
* **Primary Font**: Inter (Subsets: Latin).
  * This is a modern, highly legible sans-serif font specifically designed for computer screens.
  * It is loaded via `next/font/google` in your `layout.jsx` and applied to the entire `<body>`.
* **System Fallback**: If Inter fails to load, it will fall back to the browser's default sans-serif font stack.

## 2. Font Size
Your project uses a **responsive, variable font size system** based on Tailwind CSS and custom Liquid Glass styling:

* **Default Global Size**: Approximately `16px` (Tailwind's base size), which is standard for web readability.
* **Administrative "Command Center" (Dashboard)**: Uses **High-Density Typography**.
  * **Labels/Captions**: Often set to `text-[9px]` or `text-xs` (approx. `12px`) to show more data in one view.
  * **Metric Values**: Typically `text-sm` (approx. `14px`) or `text-base` (`16px`).
* **Toast Notifications**: Specifically configured in `layout.jsx` to use `12px` with an extra-bold weight (`800`) for high impact.
* **Headers**: Range from `text-xl` (`20px`) to `text-3xl` (`30px`) for titles and section headings.

### Summary Table

| Element | Font Name | Font Size (Approx) |
|---|---|---|
| Global Body | Inter | 16px |
| Dashboards | Inter | 12px - 14px (High Density) |
| Toasts/Alerts | Inter | 12px (Bold) |
| Section Titles | Inter | 20px - 30px |

---

## 3. Brand Colors (Extracted from cook-book-logo.png)

Based on the logo file, the primary unique color palette consists of the following hex codes:

* **Primary Blue**: `#0084FA` (Used as the main brand accent and active state)
* **Darker Blue / Shadow**: `#1873D0` (Used for depth and hover states)
* **Pure White**: `#FFFFFF` (Primary background/contrast color)
* **Pure Black**: `#000000` (Used for bold text and high-contrast elements)
