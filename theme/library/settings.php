<?php
function bienen_customize_register( $wp_customize )
{
    $wp_customize->add_panel('bienen_info_panel', array(// Contact information
        'priority' => 1,
        'capability' => 'edit_theme_options',
        'title' => __('Contact information', 'bienen')
    ));

    $wp_customize->add_section('bienen_info_section', array(/* header content section */
        'title' => __('Contact information', 'bienen'),
        'description' => __('Main contact information', 'bienen'),
        'priority' => 30,
        'panel' => 'bienen_info_panel',
    ));
    $wp_customize->add_setting('e_mail',array(/* header width */
        'default' =>'',
        'type' => 'theme_mod',
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'bienen_sanitize_text',
        'priority' => 15,
    ));
    $wp_customize->add_control('e_mail',array(
        'label' => __('Set email','bienen'),
        'section' => 'bienen_info_section',
        'type' => 'text',
    ));
};

function bienen_sanitize_uri($uri) {
    if('' === $uri){
        return '';
    }
    return esc_url_raw($uri);
}
function bienen_sanitize_text( $input ) {
    return wp_kses_post( force_balance_tags( $input ) );
}

add_action( 'customize_register', 'bienen_customize_register' );