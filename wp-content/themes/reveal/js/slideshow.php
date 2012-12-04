<?php $slideshow_delay = of_get_option('ttrust_slideshow_delay'); ?>
<?php $autoPlay = ($slideshow_delay != "0") ? 1 : 0; ?>
<?php $slideshow_delay = ($slideshow_delay != "") ? $slideshow_delay : '6'; ?>

<script type="text/javascript">
//<![CDATA[

jQuery(window).load(function() {			
	jQuery('.flexslider').flexslider({
		slideshowSpeed: <?php echo $slideshow_delay . '000'; ?>,  		
		slideshow: <?php echo $autoPlay; ?>,				 				
		animation: 'fade',
		animationLoop: true,
		controlNav: true,             
		directionNav: true,
		pauseOnAction: true,            
		pauseOnHover: false,            
		useCSS: true,                   
		touch: true,                  
		video: false
	});  
});

//]]>
</script>