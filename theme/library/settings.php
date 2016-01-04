<?php
if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title' 	=> __('Basic info', 'bienen'),
        'menu_title'	=> __('Basic info', 'bienen'),
        'menu_slug' 	=> 'basic-info',
        'capability'	=> 'edit_posts',
        'menu_position' => 10,
        'redirect'		=> false
    ));

   /* acf_add_options_sub_page(array(
        'page_title' 	=> __('Home', 'bienen'),
        'menu_title'	=> __('Home page', 'bienen'),
        'parent_slug'	=> 'basic-info',
        'menu_slug' 	=> 'home-info'
    ));*/
}