## Feature: Stacking Context Tree View
 * It has a split screen view.
 * The left is visualizing DOM.
 * The right has the Stacking Context Tree View.

## Feature: Get All Elements Under Cursor
 * Click DOM element to reveal stacking context.
 * Update the tree view to show the leaf elements and their parents in stack order.
 * Dim out the parent elements slightly.

## Additional Features of Tree View
 * Disable Visibility Checkbox.
 * Show reasons why dom node is a stacking context.

# HSL Color Visualization
 * Shift hue based on absolute position of the leaf on the tree.
 * Shift lightness for node depth.
 * Implement with a canvas overlay, using ctx.drawRect(), utilizing the built-in stacking context to draw everything in order.

# 3d View
 * Replace the DOM view with a 3d visualization.
 * Depth of a stacking context node would be 10 times that of a non-stacking element.
 * Elements would be logically grouped by depth.
 * Show the borders using HSL.
