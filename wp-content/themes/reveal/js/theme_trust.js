//////////////////////////////////////////////////////////////
// Set Variables
/////////////////////////////////////////////////////////////

var transitionSpeed = 500;
var scrollSpeed = 700;
var fadeDelay = 100;
var currentProject = "";
var nextProject = "";
var previousHeight = "";
var emptyProjectBoxHeight = 100;
var hasSlideshow = false;
	
///////////////////////////////		
// Mobile Detection
///////////////////////////////

function isMobile(){
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/))
        );
}
	
function isiPad(){
    return (navigator.platform.indexOf("iPad") != -1);
}

function isiPhone(){
    return (
        //Detect iPhone
        (navigator.platform.indexOf("iPhone") != -1) || 
        //Detect iPod
        (navigator.platform.indexOf("iPod") != -1)
        );
}

///////////////////////////////		
// Isotope Browser Check
///////////////////////////////

function isotopeAnimationEngine(){
    if(jQuery.browser.mozilla || jQuery.browser.msie){
        return "jquery";
    }else{
        return "css";
    }
}

///////////////////////////////		
// Lightbox
///////////////////////////////	

function lightboxInit() {
    if(screen.width > 500){
        jQuery("a[rel^='prettyPhoto']").prettyPhoto({
            social_tools: false,
            deeplinking: false
        });
    }
}


///////////////////////////////
// Project Filtering 
///////////////////////////////

function projectFilterInit() {
    jQuery('#filterNav a').click(function(){
        var selector = jQuery(this).attr('data-filter');	
        jQuery('#projects .thumbs').isotope({
            filter: selector,			
            hiddenStyle : {
                opacity: 0,
                scale : 1
            }			
        });
	
        if ( !jQuery(this).hasClass('selected') ) {
            jQuery(this).parents('#filterNav').find('.selected').removeClass('selected');
            jQuery(this).addClass('selected');
        }
	
        return false;
    });	
}


///////////////////////////////
// Project thumbs 
///////////////////////////////

function projectThumbInit() {
	
    if(!isiPad() && !isiPhone()) {
        jQuery(".project.small").hover(
            function() {
                if(!jQuery(this).hasClass("selected")){
                    jQuery(this).find('img:last').stop().fadeTo("fast", .9);
                }
					
            },
            function() {
                if(!jQuery(this).hasClass("selected")){
                    jQuery(this).find('img:last').stop().fadeTo("fast", 1);
                }	
            });
		
        jQuery(".project.small").hover(	
            function() {
				
                jQuery(this).find('.title').stop().fadeTo("fast", 1);
                jQuery(this).find('img:last').attr('title','');
				
            },
            function() {
                if(!jQuery(this).hasClass("selected")){
                    jQuery(this).find('.title').stop().fadeTo("fast", 0);
                }				
            });
    }	
	
	
    var container = jQuery('.thumbs.masonry');
    var colW = container.width() * 0.2475;		
    container.isotope({	
        animationEngine: "jquery",	
        resizable: false,
        filter: '.umipictures', /*hack*/
        masonry: {
            columnWidth: colW
        }
		
    });
    
    //begin hack
    jQuery('#filterNav li a').removeClass("selected");
    jQuery('#filterNav li:eq(1) a').addClass("selected");
    //end hack
    
    
    jQuery(".project.small").css("opacity", "1");	
	
    jQuery(".project.small.ajx").click(function(){
        jQuery(".thumbs .selected .title").hide();
        jQuery(".thumbs .selected").find('img:last').stop().fadeTo("fast", 1);	
        jQuery(".thumbs .selected").removeClass("selected");						
        jQuery(this).addClass("selected");		
        jQuery(".thumbs .selected .title").show();
			
        var projectSlug = jQuery(this).attr('id').replace(/^project-/, '');
        jQuery.scrollTo(0, scrollSpeed);		
        processProject(projectSlug);
    });	
	
}
	
	
///////////////////////////////		
//  Project Loading
///////////////////////////////	

function processProject(projectSlug) {	
	
    // Prevent projecBox from collapsing	
    jQuery("#projectBox").css("height", jQuery("#projectHolder").outerHeight());	
	
    // Fade out the old project	
    if(currentProject != "") {			
        jQuery("#projectHolder").fadeOut(transitionSpeed,
            function() {
                jQuery(".project.ajax").remove();
                currentProject = "";						
                if(projectSlug){
                    loadProject(projectSlug);
                    jQuery("#ajaxLoading").fadeIn('fast');			
                };
            });
    }else{
        //No project currently loaded - open the projectBox to show the loader.	
        if(projectSlug){
            jQuery("#homeMessage").removeClass('withBorder');
            jQuery("#pageHead").removeClass('withBorder');
            jQuery("#projectBox").animate({
                height: emptyProjectBoxHeight
            }, scrollSpeed,
            function() {				
                jQuery("#ajaxLoading").fadeIn('fast',
                    function() {
                        loadProject(projectSlug);		
                    });	
            });					
        };
    }	
	
    if(!projectSlug){
        jQuery("#projectBox").animate({
            height: 0
        }, scrollSpeed,
        function() {				
            jQuery("#homeMessage").addClass('withBorder');
            jQuery("#pageHead").addClass('withBorder');				
        });
							
    }		
}

	
function loadProject(projectSlug) {	
    // Scroll to the top of the projects	
    jQuery("#projectHolder").load(	    
        MyAjax.ajaxurl,
        {	        
            action : 'myajax-submit',	        
            slug : projectSlug
        },
        function( response ) {
	        
        }
        );
}


function waitForMedia(projectSlug, slideshowDelay) {
	
    var totalMediaElements = 0;
    var loadedMediaElements = 0;
    var mediaTypes = ['img'];
    var autoPlay = (slideshowDelay != "0") ? 1 : 0;
    for(var i=0; i<=mediaTypes.length; i++) {
        totalMediaElements += jQuery("#projectHolder " + mediaTypes[i]).length;	
    }	
	
    if(totalMediaElements > 0){
        for(var i=0; i<=mediaTypes.length; i++) {
            jQuery("#projectHolder " + mediaTypes[i]).each(function() {									
                jQuery(this).load(function() {				
                    loadedMediaElements++;
                    if(loadedMediaElements == totalMediaElements) {
                        jQuery("#ajaxLoading").fadeOut('fast',
                            function(){						
                                //Set up the slideshow
                                jQuery('.flexslider').flexslider({
                                    slideshowSpeed: slideshowDelay + '000',  		
                                    slideshow: autoPlay,				 				
                                    animation: "fade",
                                    animationLoop: true,
                                    controlNav: true,             
                                    directionNav: true,
                                    pauseOnAction: true,            
                                    pauseOnHover: false,            
                                    useCSS: true,                   
                                    touch: true,                  
                                    video: false
                                });
                                showProject(projectSlug);
                            });
                    }
                });
			
            });	
        }
    }else{
        jQuery("#ajaxLoading").fadeOut('fast',
            function(){	       	
                //Fix Vimeo embed for iPad			
                if(isiPad()) {				
                    jQuery.each(jQuery("iframe"), function() {
                        jQuery(this).attr({
                            src: jQuery(this).attr("src")
                        });
                    });
                }			
                showProject(projectSlug);			
            });		
    }	
}

function showProject(projectSlug) {		
	
    // Fade in the new project	
    jQuery("#projectHolder").fadeIn(transitionSpeed);	
    currentProject = "project-" + projectSlug;
    jQuery("#" + currentProject).addClass("selected");	
	
    // Adjust the height of project container
	
    targetHeight = jQuery("#projectHolder").outerHeight();	
    jQuery("#projectHolder").css("height", targetHeight);	
    jQuery("#projectBox").animate({
        height: jQuery("#projectHolder").outerHeight()
    }, scrollSpeed,
    function() {
        jQuery("#projectHolder").css("height", "auto");				
        jQuery("#projectBox").css("height", "auto");		
    });	
    previousHeight = targetHeight;	
	
    jQuery("#projectHolder .closeBtn").click(function(){
        jQuery(".thumbs .selected .title").hide();
        jQuery(".thumbs .selected").find('img:last').stop().fadeTo("fast", 1);	
        jQuery(".thumbs .selected").removeClass("selected");		
        jQuery.scrollTo(0, scrollSpeed);	
        processProject();
    });
}

///////////////////////////////
// Project Nav 
///////////////////////////////

function nextPrevProject(slug) {
    var projectSlug = slug;
    jQuery(".thumbs .selected .title").hide();
    jQuery(".thumbs .selected").find('img:last').stop().fadeTo("fast", 1);	
    jQuery(".thumbs .selected").removeClass("selected");						
    jQuery("#project-"+projectSlug).addClass("selected");	
    jQuery(".thumbs .selected").find('.title').stop().fadeTo("fast", 1);		
	
    jQuery.scrollTo(0, scrollSpeed);		
    processProject(projectSlug);
}

///////////////////////////////
// Isotope Grid Resize
///////////////////////////////

function gridResize() {	
    // update columnWidth on window resize
    var container = jQuery('.thumbs.masonry');
    var colW = container.width() * 0.2475;	
    container.isotope({
        resizable: false,
        masonry: {
            columnWidth: colW
        }
    });			
}
	
	
jQuery.noConflict();
jQuery(window).load(function(){
	
    lightboxInit();
    projectThumbInit();	
    projectFilterInit();
	
    // Show project is there is a hash in the URL
    var projectSlug = location.hash.replace("\#","");	
    var firstProject = jQuery(".thumbs a").eq(1).attr('href').replace("#","");
        
    if((!projectSlug) && location == "http://umipictures.com/"){ //@todo: change for Live
        //change this to look for the first project
        processProject(firstProject);
    }else if(projectSlug != "index"){
        processProject(projectSlug);
    }
	
    jQuery(window).smartresize(function(){
        gridResize();
    });	
	
});
