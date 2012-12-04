<?php
add_shortcode('vimeo', 'vimeo');

function vimeo($atts) {
    $atts = shortcode_atts(array(
        'id' => '',
        'width' => 940,
        'height' => 529,
        'desc' => "y",
            ), $atts);

    
    if (isset($atts['id'])) {
        $id = $atts['id'];
        $hash = unserialize(file_get_contents("http://vimeo.com/api/v2/video/$id.php"));
        $description = $hash[0]['description'];
    }
    

    $html = '<div class="videoContainer"><iframe src="http://player.vimeo.com/video/' . $atts['id'] . '?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;color=ed1c24" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>';
    //if ($atts['desc']=="y")   $html .= '<div class="video-description">'.$description."</div>";
    return $html;
}

function register_vimeo_button( $buttons ) {
   array_push( $buttons, "|", "vimeo" );
   return $buttons;}


function add_vimeo_plugin( $plugin_array ) {
   $plugin_array['vimeo'] = get_stylesheet_directory_uri() . '/js/vimeo.js';
   return $plugin_array;
}

function my_vimeo_button() {

   if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
      return;
   }

   if ( get_user_option('rich_editing') == 'true' ) {
      add_filter( 'mce_external_plugins', 'add_vimeo_plugin' );
      add_filter( 'mce_buttons', 'register_vimeo_button' );
   }

}

function my_refresh_mce($ver) {
    $ver += 3;
    return $ver;
}
add_filter( 'tiny_mce_version', 'my_refresh_mce');
add_action('init', 'my_vimeo_button');


remove_action( 'woocommerce_before_main_content','woocommerce_breadcrumb', 20, 0);

register_sidebar(array(
	'name' => 'Shop Sidebar',
	'id' => 'sidebar_shop',
	'description' => __('Widget area for the sidebar in shop.', 'themetrust'),
	'before_widget' => '<div id="%1$s" class="oneFourth %2$s sidebarBox widgetBox">',
	'after_widget' => '</div>',
	'before_title' => '<h3>',
	'after_title' => '</h3>'
));

add_image_size('wide_post_thumb_big', 940, 0, false);

?>