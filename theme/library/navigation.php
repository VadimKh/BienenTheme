<?php
/**
 * Customize the output of menus for Foundation top bar (copy from FoundationPress theme)
 *
 * @package WordPress
 * @subpackage Bienen Theme
 * @since Bienen Theme 1.0
 */

register_nav_menus(array(
    'top-bar-l' => 'Left Top Bar',// Registers the menu in the WordPress admin menu editor.
    'top-bar-r' => 'Right Top Bar',
    //'mobile-off-canvas' => 'Mobile',
));


/**
 * Left top bar
 * http://codex.wordpress.org/Function_Reference/wp_nav_menu
 */
if ( ! function_exists( 'foundationpress_top_bar_l' ) ) {
    function foundationpress_top_bar_l() {
        wp_nav_menu(array(
            'container' => false,                           // Remove nav container
            'container_class' => '',                        // Class of container
            'menu' => '',                                   // Menu name
            'menu_class' => 'top-bar-menu left',            // Adding custom nav class
            'theme_location' => 'top-bar-l',                // Where it's located in the theme
            'before' => '',                                 // Before each link <a>
            'after' => '',                                  // After each link </a>
            'link_before' => '',                            // Before each link text
            'link_after' => '',                             // After each link text
            'depth' => 5,                                   // Limit the depth of the nav
            'fallback_cb' => false,                         // Fallback function (see below)
            'walker' => new Foundationpress_Top_Bar_Walker(),
        ));
    }
}

/**
 * Right top bar
 */
if ( ! function_exists( 'foundationpress_top_bar_r' ) ) {
    function foundationpress_top_bar_r() {
        wp_nav_menu(array(
            'container' => false,                           // Remove nav container
            'container_class' => '',                        // Class of container
            'menu' => '',                                   // Menu name
            'menu_class' => 'top-bar-menu right',           // Adding custom nav class
            'theme_location' => 'top-bar-r',                // Where it's located in the theme
            'before' => '',                                 // Before each link <a>
            'after' => '',                                  // After each link </a>
            'link_before' => '',                            // Before each link text
            'link_after' => '',                             // After each link text
            'depth' => 5,                                   // Limit the depth of the nav
            'fallback_cb' => false,                         // Fallback function (see below)
            'walker' => new Foundationpress_Top_Bar_Walker(),
        ));
    }
}

/**
 * Mobile off-canvas
 */
/*if ( ! function_exists( 'foundationpress_mobile_off_canvas' ) ) {
    function foundationpress_mobile_off_canvas() {
        wp_nav_menu(array(
            'container' => false,                           // Remove nav container
            'container_class' => '',                        // Class of container
            'menu' => '',                                   // Menu name
            'menu_class' => 'off-canvas-list',              // Adding custom nav class
            'theme_location' => 'mobile-off-canvas',        // Where it's located in the theme
            'before' => '',                                 // Before each link <a>
            'after' => '',                                  // After each link </a>
            'link_before' => '',                            // Before each link text
            'link_after' => '',                             // After each link text
            'depth' => 5,                                   // Limit the depth of the nav
            'fallback_cb' => false,                         // Fallback function (see below)
            'walker' => new Foundationpress_Offcanvas_Walker(),
        ));
    }
}*/

/**
 * Add support for buttons in the top-bar menu:
 * 1) In WordPress admin, go to Apperance -> Menus.
 * 2) Click 'Screen Options' from the top panel and enable 'CSS CLasses' and 'Link Relationship (XFN)'
 * 3) On your menu item, type 'has-form' in the CSS-classes field. Type 'button' in the XFN field
 * 4) Save Menu. Your menu item will now appear as a button in your top-menu
 */
if ( ! function_exists( 'foundationpress_add_menuclass' ) ) {
    function foundationpress_add_menuclass($ulclass) {
        $find = array('/<a rel="button"/', '/<a title=".*?" rel="button"/');
        $replace = array('<a rel="button" class="button"', '<a rel="button" class="button"');

        return preg_replace( $find, $replace, $ulclass, 1 );
    }
    add_filter( 'wp_nav_menu','foundationpress_add_menuclass' );
}

if ( ! class_exists( 'Foundationpress_Top_Bar_Walker' ) ) :
    class Foundationpress_Top_Bar_Walker extends Walker_Nav_Menu {

        function display_element( $element, &$children_elements, $max_depth, $depth = 0, $args, &$output ) {
            $element->has_children = ! empty( $children_elements[ $element->ID ] );
            $element->classes[] = ( $element->current || $element->current_item_ancestor ) ? 'active' : '';
            $element->classes[] = ( $element->has_children && 1 !== $max_depth ) ? 'has-dropdown' : '';

            parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
        }

        function start_el( &$output, $object, $depth = 0, $args = array(), $current_object_id = 0 ) {
            $item_html = '';
            parent::start_el( $item_html, $object, $depth, $args );

            $output .= ( 0 == $depth ) ? '<li class="divider"></li>' : '';

            $classes = empty( $object->classes ) ? array() : (array) $object->classes;

            if ( in_array( 'label', $classes ) ) {
                $output .= '<li class="divider"></li>';
                $item_html = preg_replace( '/<a[^>]*>(.*)<\/a>/iU', '<label>$1</label>', $item_html );
            }

            if ( in_array( 'divider', $classes ) ) {
                $item_html = preg_replace( '/<a[^>]*>( .* )<\/a>/iU', '', $item_html );
            }

            $output .= $item_html;
        }

        function start_lvl( &$output, $depth = 0, $args = array() ) {
            $output .= "\n<ul class=\"sub-menu dropdown\">\n";
        }

    }
endif;