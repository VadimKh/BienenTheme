<?php
//disable default posts
function bienen_remove_posts_menu() {
    //remove_menu_page( 'index.php' );                  //Консоль
    remove_menu_page( 'edit.php' );                   //Записи
    //remove_menu_page( 'upload.php' );                 //Медиафайлы
    //remove_menu_page( 'edit.php?post_type=page' );    //Страницы
    //remove_menu_page( 'edit-comments.php' );          //Комментарии
    //remove_menu_page( 'themes.php' );                 //Внешний вид
    //remove_menu_page( 'plugins.php' );                //Плагины
    //remove_menu_page( 'users.php' );                  //Пользователи
    //remove_menu_page( 'tools.php' );                  //Инструменты
    //remove_menu_page( 'options-general.php' );        //Параметры
}
add_action('admin_menu', 'bienen_remove_posts_menu');

function bienen_create_post_type_example()
{
    register_taxonomy_for_object_type('category', 'example'); // Register Taxonomies for Category
    register_taxonomy_for_object_type('post_tag', 'example');
    register_post_type('example', // Register Custom Post Type
        array(
            'labels' => array(
                'name' => __('HTML5 Blank Custom Post', 'bienen'), // Rename these to suit
                'singular_name' => __('HTML5 Blank Custom Post', 'bienen'),
                'add_new' => __('Add New', 'bienen'),
                'add_new_item' => __('Add New HTML5 Blank Custom Post', 'bienen'),
                'edit' => __('Edit', 'bienen'),
                'edit_item' => __('Edit HTML5 Blank Custom Post', 'bienen'),
                'new_item' => __('New HTML5 Blank Custom Post', 'bienen'),
                'view' => __('View HTML5 Blank Custom Post', 'bienen'),
                'view_item' => __('View HTML5 Blank Custom Post', 'bienen'),
                'search_items' => __('Search HTML5 Blank Custom Post', 'bienen'),
                'not_found' => __('No HTML5 Blank Custom Posts found', 'bienen'),
                'not_found_in_trash' => __('No HTML5 Blank Custom Posts found in Trash', 'bienen')
            ),
            'public' => true,
            'hierarchical' => true, // Allows your posts to behave like Hierarchy Pages
            'has_archive' => true,
            'supports' => array(
                'title',
                'editor',
                'excerpt',
                'thumbnail'
            ), // Go to Dashboard Custom HTML5 Blank post for supports
            'can_export' => true, // Allows export in Tools > Export
            'taxonomies' => array(
                'post_tag',
                'category'
            ) // Add Category and Post Tags support
        ));
}

add_action('init', 'bienen_create_post_type_example'); // Add our HTML5 Blank Custom Post Type