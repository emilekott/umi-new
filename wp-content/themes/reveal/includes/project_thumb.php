<?php if(!of_get_option('ttrust_open_project_single')) : ?>
	<div class="project small ajx <?php echo $p; ?>" id="project-<?php echo $post->post_name;?>">
		<a href="<?php the_permalink() ?>" rel="bookmark" ></a>
		<?php $project_thumb_size = (of_get_option('ttrust_project_thumb_layout') == "grid") ? "ttrust_one_fourth_cropped" : "ttrust_one_fourth"; ?>

		<a href="#<?php echo $post->post_name; ?>" ><?php the_post_thumbnail($project_thumb_size, array('class' => 'thumb', 'alt' => ''.get_the_title().'', 'title' => ''.get_the_title().'')); ?></a>
		<span class="title"><span><?php the_title(); ?></span></span>																																
	</div>
<?php else: ?>
	<div class="project small <?php echo $p; ?>" id="project-<?php echo $post->post_name;?>">
		<a href="<?php the_permalink() ?>" rel="bookmark" ></a>
		<?php $project_thumb_size = (of_get_option('ttrust_project_thumb_layout') == "grid") ? "ttrust_one_fourth_cropped" : "ttrust_one_fourth"; ?>

		<a href="<?php the_permalink() ?>" ><?php the_post_thumbnail($project_thumb_size, array('class' => 'thumb', 'alt' => ''.get_the_title().'', 'title' => ''.get_the_title().'')); ?></a>
		<span class="title"><span><?php the_title(); ?></span></span>																																
	</div>
<?php endif; ?>