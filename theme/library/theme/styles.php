<?php
// Load  styles
function bienen_styles()
{
    wp_register_style('bienencss', get_template_directory_uri() . '/css/main.css', '1.0.0');

    // Register CSS
    wp_enqueue_style('bienencss');
}

add_action('wp_enqueue_scripts', 'bienen_styles'); // Add Theme Stylesheet