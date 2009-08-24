/* Copyright (c) 2009 Jon Rohan (http://dinnermint.org)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.0.0
 * Written with jQuery 1.3.2
 */
(function($){
  $.fn.growing = function(options){
    var settings = $.extend({
       maxHeight: 400,
       minHeight: 40,
       buffer: 0
    }, options);
    return this.each(function(){
      var textarea = $(this); //cache the textarea
      var minh = textarea.height()>settings.minHeight?textarea.height():settings.minHeight;
      var w = parseInt(textarea.width()||textarea.css("width")); //get the width of the textarea
      var div = $("<div class='faketextarea' style='position:absolute;left:-10000px;width:" + w + "px;'></div>");
      textarea.after(div);
      var resizeBox = function(){
        var html = textarea.val().replace(/(&lt;|>)/g, '').replace(/\n/g,"<br>|");
        if(html!=div.html()) {
          div.html(html);
          var h = div.height();
          prevh = textarea.height();
          var newh = h<=minh?minh:(h>settings.maxHeight?settings.maxHeight:h);
          newh += settings.buffer;
          if(newh>=settings.maxHeight) {
            textarea.css("overflow","auto");
          } else {
            textarea.css("overflow","hidden");
          }
          textarea.css({"height":newh+"px"});
        }
      };
      textarea.keydown(resizeBox);
      textarea.keyup(resizeBox);
      resizeBox();
    });
  };
})(jQuery);