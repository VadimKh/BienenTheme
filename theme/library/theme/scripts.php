<?php
function bienen_scripts()
{
    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
        $dependencing = array();

        /*inject:js*/
        wp_deregister_script('jquery'); 
        wp_register_script('jquery', get_template_directory_uri() . '/js/vendors/jquery.js', $dependencing); 
        array_push($dependencing, 'jquery'); 
        
        wp_deregister_script('fastclick'); 
        wp_register_script('fastclick', get_template_directory_uri() . '/js/vendors/fastclick.js', $dependencing); 
        array_push($dependencing, 'fastclick'); 
        
        wp_deregister_script('jquery.cookie'); 
        wp_register_script('jquery.cookie', get_template_directory_uri() . '/js/vendors/jquery.cookie.js', $dependencing); 
        array_push($dependencing, 'jquery.cookie'); 
        
        wp_deregister_script('jquery.placeholder'); 
        wp_register_script('jquery.placeholder', get_template_directory_uri() . '/js/vendors/jquery.placeholder.js', $dependencing); 
        array_push($dependencing, 'jquery.placeholder'); 
        
        wp_deregister_script('foundation'); 
        wp_register_script('foundation', get_template_directory_uri() . '/js/vendors/foundation.js', $dependencing); 
        array_push($dependencing, 'foundation'); 
        
        /*endinject*/

        // Custom scripts
        wp_register_script('bienenscripts',get_template_directory_uri() . '/js/main.js', $dependencing);

        // Enqueue Scripts
        wp_enqueue_script('bienenscripts');
    }
}

add_action('wp_footer', 'bienen_scripts'); // Add Custom Scripts to wp_footer

// Load conditional scripts
function bienen_conditional_scripts()
{
    if (is_page('pagenamehere')) {
        // Conditional script(s)
        wp_register_script('scriptname', get_template_directory_uri() . '/js/scriptname.js', array('jquery'), '1.0.0');
        wp_enqueue_script('scriptname');
    }
}

add_action('wp_print_scripts', 'bienen_conditional_scripts'); // Add Conditional Page Scripts