$(document).ready(function(){jQuery(document).ready(function(e){e("input, textarea").placeholder()});jQuery(document).ready(function(e){e("textarea").autosize()});$(".piechart").easyPieChart({barColor:"#fff",trackColor:"rgba(255,255,255,.2)",scaleColor:!1,lineCap:"butt",rotate:-90,lineWidth:4,size:40,animate:1e3,onStep:function(e){this.$el.find("span").text(~~e)}})});