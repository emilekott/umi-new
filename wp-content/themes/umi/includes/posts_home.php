<?php while (have_posts()) : the_post(); ?>						

    <div <?php post_class(); ?>>					
        <div class="inside">															
            <h1><?php the_title(); ?></h1>
            <div class="meta clearfix">
                <?php $post_show_author = of_get_option('ttrust_post_show_author'); ?>
                <?php $post_show_date = of_get_option('ttrust_post_show_date'); ?>
                <?php $post_show_category = of_get_option('ttrust_post_show_category'); ?>
                <?php $post_show_comments = of_get_option('ttrust_post_show_comments'); ?>

                <?php if ($post_show_author || $post_show_date || $post_show_category) {
                    _e('Posted ', 'themetrust');
                } ?>					
                <?php if ($post_show_author) {
                    _e('by ', 'themetrust');
                    the_author_posts_link();
                } ?>
                <?php if ($post_show_date) {
                    _e('on', 'themetrust'); ?> <?php the_time('M j, Y');
        } ?>
            <?php if ($post_show_category) {
                _e('in', 'themetrust'); ?> <?php the_category(', ');
    } ?>
            <?php if (($post_show_author || $post_show_date || $post_show_category) && $post_show_comments) {
                echo " | ";
            } ?>

            <?php if ($post_show_comments) : ?>
                    <a href="<?php comments_link(); ?>"><?php comments_number(__('No Comments', 'themetrust'), __('One Comment', 'themetrust'), __('% Comments', 'themetrust')); ?></a>
            <?php endif; ?>
            </div>

    <?php if (has_post_thumbnail()) : ?>
        <?php if (of_get_option('ttrust_post_featured_img_size') == "large") : ?>											
                    <?php the_post_thumbnail('ttrust_post_thumb_big', array('class' => 'postThumb', 'alt' => '' . get_the_title() . '', 'title' => '' . get_the_title() . '')); ?>	    	
        <?php else: ?>
                    <a href="<?php the_permalink() ?>" rel="bookmark" ><?php the_post_thumbnail('ttrust_post_thumb_small', array('class' => 'postThumb alignleft', 'alt' => '' . get_the_title() . '', 'title' => '' . get_the_title() . '')); ?></a>
        <?php endif; ?>
    <?php endif; ?>															

    <?php //the_excerpt();  ?><?php the_content(); ?>
    <?php //more_link();  ?>
            <div id="fb-root"></div>
            <script>(function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=424789807533957";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));</script>
            <div class="fb-like" data-href="<?php the_permalink() ?>" data-send="false" data-layout="button_count" data-width="200" data-show-faces="false"></div>
            <div class="tweet"><a href="https://twitter.com/share" class="twitter-share-button" data-url="<?php the_permalink() ?>" data-text="<?php the_title(); ?>">Tweet</a></div><div class="clear"></div>
            <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
        </div>																				
    </div>				

<?php endwhile; ?>

<?php include( TEMPLATEPATH . '/includes/pagination.php'); ?>
</div>
<?php //get_sidebar(); ?>	