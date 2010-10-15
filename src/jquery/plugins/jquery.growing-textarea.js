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
      var w = parseInt(textarea.width()||textarea.outerWidth()||textarea.css("width")); //get the width of the textarea

      // Firefox seems leave 2px less of space for textareas than for divs, so
      // make the hidden div 2px narrower.  Let's err on the side adding too
      // much space instead of not showing text that's being typed.
      if ($.browser.mozilla) {
        w -= 2;
      }

      var padding = "padding:"+textarea.css("paddingTop") + " " + textarea.css("paddingRight") + " " + textarea.css("paddingBottom") + " " + textarea.css("paddingLeft")+";";
      var fontsize = "font-size:"+textarea.css("fontSize")+";";
      var fontweight = "font-weight:"+textarea.css("fontWeight")+";";
      var lineheight = "";
      lineheight = parseInt(textarea.css("lineHeight"));
      $("body").append(div);
      var resizeBox = function(){
        var html = textarea.val().replace(/(<|>)/g, '').replace(/\n/g,"<br>|");
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
