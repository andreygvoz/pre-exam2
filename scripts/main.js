;(function($){
	'use strict';
     $(window).on('load', function() {

     	$('.ba-slider').slick({
     		// dots:true,
     		// easing:'test',
     		slidesToShow:1,
     		arrows:false,
     		slide:'.ba-slide',
     		// slidesToScroll:2,
     		// autoplaySpeed:1000,
     		// autoplay:true,
     		// centerMode:true,
     		asNavFor:'.ba-slider-navigation',
     	});
       $('.ba-slider-navigation').slick({
     		// dots:true,
     		// easing:'test',
     		slidesToShow:3,
     		// slidesToScroll:2,
     		// autoplaySpeed:1000,
     		// autoplay:true,
     		centerMode: true,
     		asNavFor:'.ba-slider',
     		slide:'.ba-slide',
     		prevArrow:'.ba-prev',
     		nextArrow:'.ba-next',

     	});

  });

     // MAP SECTION

     function createMap () {
          var $markers =$('.ba-marker');
          console.log($markers);

          var map = new google.maps.Map($('.ba-map')[0],{
               maxZoom:16,
               scrollwheel: false,

               center: new google.maps.LatLng(0,0),
               styles:[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}],
          });

          addMarkers($markers, map);
          centerMap($markers, map);
     }

     function addMarkers ($markers, map) {
          $markers.each(function() {
               var lat = $(this).data('lat');
               var lng = $(this).data('lng');
               var icon = $(this).data('icon')
               var marker = new google.maps.Marker({
                    position: {lat: lat, lng:lng},
                    map: map,
                    icon:icon,
               })
               var content = $(this).find('.description').html()


               var infoWindow = new google.maps.InfoWindow({
                    content:content,
               })
               marker.addListener('click', function  () {
                    infoWindow.open(map,marker);
               });
          });
     }

     function centerMap($markers, map) {

          if ($markers.length == 1) {

               var lat = $markers.data('lat');
               var lng = $markers.data('lng');
               var latLng = new google.maps.LatLng( lat, lng );
               map.setCenter(latLng);
               
          } else { 

               var bounds = new google.maps.LatLngBounds();

               $markers.each( function() {
                    var lat = $(this).data('lat');
                    var lng = $(this).data('lng');
                    var latLng = new google.maps.LatLng( lat, lng );
                    bounds.extend(latLng);
               });

               map.fitBounds(bounds);

          }

     }
     
     createMap()

     // SCROLL FUNCTION

     $('a[href*="#"]').on('click', function(){

          event.preventDefault();

          $('body').animate({
               scrollTop:$($(this).attr('href')).offset().top 

          }, 1500);

          

     });




})(jQuery);

