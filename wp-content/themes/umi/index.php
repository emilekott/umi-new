<?php get_header(); ?><div id="pageHead"><h1>Blog</h1></div>
			<?php $home_content = of_get_option('ttrust_home_content'); ?>
			<?php //$c = ($home_content=="projects") ? "fullProjects" : "threeFourth" ?>			
			<div id="content">				

				<?php if($home_content=="posts") : ?>
					<?php include( get_stylesheet_directory() . '/includes/posts_home.php'); ?>
				<?php elseif($home_content=="projects" || $home_content=="") : ?>
					<?php include( get_stylesheet_directory() . '/includes/projects_home.php'); ?>
				<?php endif; ?>
				
			</div>		
	
<?php get_footer(); ?>
