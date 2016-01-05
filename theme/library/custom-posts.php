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

function bienen_create_post_type_products()
{
    //register_taxonomy_for_object_type('category', 'products'); // Register Taxonomies for Category
    //register_taxonomy_for_object_type('post_tag', 'products');
    register_post_type('products', // Register Custom Post Type
        array(
            'labels' => array(
                'name' => __('Products', 'bienen'), // Rename these to suit
                'singular_name' => __('Product', 'bienen'),
                'add_new' => __('Add New', 'bienen'),
                'add_new_item' => __('Add New Product', 'bienen'),
                'edit' => __('Edit', 'bienen'),
                'edit_item' => __('Edit Product', 'bienen'),
                'new_item' => __('New Product', 'bienen'),
                'view' => __('View Product', 'bienen'),
                'view_item' => __('View Product', 'bienen'),
                'search_items' => __('Search Products', 'bienen'),
                'not_found' => __('Products not found', 'bienen'),
                'not_found_in_trash' => __('Products not found in Trash', 'bienen')
            ),
            'public' => true,
            'hierarchical' => true, // Allows your posts to behave like Hierarchy Pages
            'supports' => array(
                'title', 'editor', 'author', 'page-attributes'
            ),
            'can_export' => true, // Allows export in Tools > Export
        ));

    register_taxonomy('products_category', array('products'), array(
        'label'                 => '', // определяется параметром $labels->name
        'labels'                => array(
            'name'              => __('Categories', 'bienen'),
            'singular_name'     => __('Category', 'bienen'),
            'search_items'      => __('Search Categories', 'bienen'),
            'all_items'         => __('All Categories', 'bienen'),
            'parent_item'       => __('Parent Category', 'bienen'),
            'parent_item_colon' => __('Parent Category:', 'bienen'),
            'edit_item'         => __('Edit Category', 'bienen'),
            'update_item'       => __('Update Category', 'bienen'),
            'add_new_item'      => __('Add New Category', 'bienen'),
            'new_item_name'     => __('New Category Name', 'bienen'),
            'menu_name'         => __('Category', 'bienen'),
        ),
        'public'                => true,
        'hierarchical'          => true,
    ) );
}

add_action('init', 'bienen_create_post_type_products'); // Add our HTML5 Blank Custom Post Type