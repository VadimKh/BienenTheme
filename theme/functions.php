<?php
/**
 * Author: Khoroshiltsev Vadim
 * URL: https://github.com/VadimKh/BienenTheme
 * Custom functions, support, custom post types and more.
 */

/** Thumbnail size, localization, custom header */
require_once('library/theme/support.php');

/** Include scripts */
require_once('library/theme/scripts.php');

/** Include styles */
require_once('library/theme/styles.php');

/** Include styles */
require_once('library/theme/custom.php');


/** Cleanup markup */
require_once('library/theme/markup.php');

/** Menu registration */
require_once( 'library/navigation.php' );

/** Widgets registration */
require_once( 'library/widgets.php' );

/** Custom posts registration */
require_once( 'library/custom-posts.php' );

/** Custom shorcode registration */
require_once( 'library/shortcode.php' );

/** Woocommerce integration */
//require_once( 'library/woocommerce.php' );