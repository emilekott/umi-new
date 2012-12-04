(function() {
   tinymce.create('tinymce.plugins.vimeo', {
      init : function(ed, url) {
         ed.addButton('vimeo', {
            title : 'Vimeo Video',
            image : url+'/vimeo-button.png',
            onclick : function() {
               //var posts = prompt("Number of posts", "1");
               //var text = prompt("List Heading", "This is the heading text");
               var id = prompt("Enter the Vimeo id","");
               if (id != null && id != ''){
                     ed.execCommand('mceInsertContent', false, '[vimeo id="'+id+'"]');
               }
               else{
               
          
                     ed.execCommand('mceInsertContent', false, '[vimeo id="14175834"]');
               }
            }
         });
      },
      createControl : function(n, cm) {
         return null;
      },
      getInfo : function() {
         return {
            longname : "Vimeo Video",
            author : 'Emile Kott',
            authorurl : 'http://acroweb.co.uk',
            infourl : 'http://acroweb.co.uk',
            version : "1.0"
         };
      }
   });
   tinymce.PluginManager.add('vimeo', tinymce.plugins.vimeo);
})();