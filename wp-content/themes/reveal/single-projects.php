<?php get_header(); ?>			
		
		<div id="pageHead">
			<h1><?php the_title(); ?></h1>
			<div class="projectNav clearfix">
				<div class="next <?php if(!get_next_post()){ echo 'inactive'; }?>">						
					<?php next_post_link('%link', true); ?>				
				</div>
				<div class="previous <?php if(!get_previous_post()){ echo 'inactive'; }?>">
					<?php previous_post_link('%link', true); ?>
				</div>							
			</div> <!-- end navigation -->					
		</div>		
				 
		<div id="content" class="full project main clearfix">
			<?php while (have_posts()) : the_post(); ?>			    
			    <div class="visuals clearfix">						
					<?php the_content(); ?>					
					<?php comments_template('', true); ?>
				</div>

				<div class="details">							
					<?php $project_notes = get_post_meta($post->ID, "_ttrust_notes_value", true); ?>
					<?php echo wpautop(do_shortcode($project_notes)); ?>

					<?php $project_url = get_post_meta($post->ID, "_ttrust_url_value", true); ?>
					<?php $project_url_label = get_post_meta($post->ID, "_ttrust_url_label_value", true); ?>
					<?php $project_url_label = ($project_url_label!="") ? $project_url_label : __('Visit Site', 'themetrust'); ?>
					<?php if ($project_url) : ?>
						<p><a class="action" href="<?php echo $project_url; ?>"><?php echo $project_url_label; ?></a></p>
					<?php endif; ?>								
				</div>			
							
			<?php endwhile; ?>
										    	
		</div>		
	
<?php get_footer(); ?>