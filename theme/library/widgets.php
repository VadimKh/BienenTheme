<?php
// If Dynamic Sidebar Exists
//if(!function_exists('dynamic_sidebar') || !dynamic_sidebar('search-widget'))
if (function_exists('register_sidebar'))
{
    register_sidebar(array(
        'name' => __('Search Widget', 'bienen'),
        'description' => __('Put search widget here...', 'bienen'),
        'id' => 'search-widget',
        'before_widget' => '<div class="search-form">',
        'after_widget' => '</div>',
        'before_title' => '',
        'after_title' => ''
    ));
}
