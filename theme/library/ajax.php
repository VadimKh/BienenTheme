<?php

function bienen_random_review()
{
    $args = array(
        'post_type' => 'review',
        'post_status' => 'publish',
        'posts_per_page' => 1,
        'orderby' => 'rand'
    );
    $query = null;
    $query = new WP_Query($args);
    if( $query->have_posts() ) {
        while ($query->have_posts()) : $query->the_post();
            $data = (object)array(
                'name' =>  get_the_title(),
                'position' => get_field('position'),
                'img' => wp_get_attachment_image_src(get_post_thumbnail_id(),'info')[0],
                'review' => apply_filters( 'the_content', get_the_content() )
            );
            echo json_encode($data);
        endwhile; }
    wp_reset_query();  // Restore global post data stomped by the_post().
    exit; //чтобы в ответ не попало ничего лишнего
}
add_action('wp_ajax_random_review', 'bienen_random_review'); //работает для авторизованных пользователей
add_action('wp_ajax_nopriv_random_review', 'bienen_random_review'); //работает для неавторизованных