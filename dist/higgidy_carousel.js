/**
 * A simple to implement and integrate Angular image carousel, built with sensible CSS.
 * @version v0.1.1 - 2015-01-20
 * @link https://github.com/forwardadvance/higgidy_carousel
 * @author Nicholas Johnson - nicholas@forwardadvance.com
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"use strict";

angular.module('HiggidyCarousel',  [])

  .controller('HiggidyCarousel.controller', ["$scope", "$interval", function($scope, $interval) {
    var timeout;
    $scope.carousel = {
      current: 0,
      max: 0
    };
    $scope.setMax = function() {
      if ($scope.images){
        $scope.carousel.max = $scope.images.length;
      } else {
        $scope.carousel.max = 1;
      }
    };
    $scope.show = function(i) {
      $scope.resetTimeout();
      $scope.carousel.current = i;
    };
    $scope.moveOn = function() {
      $scope.carousel.current++;
      if ($scope.carousel.current >= $scope.carousel.max) {
        $scope.carousel.current = 0;
      }
    };
    $scope.initTimeout = function() {
      timeout = $interval($scope.moveOn, $scope.carousel.timeout);
    };
    $scope.resetTimeout = function() {
      $interval.cancel(timeout);
      $scope.initTimeout();
    };
    $scope.$watch('carousel.timeout', $scope.initTimeout);
    $scope.$watch('images', $scope.setMax);
  }])

  .directive('higgidyCarousel', function() {
    var directive = {
      controller: 'HiggidyCarousel.controller',
      scope: true,
      link: {
        pre:function(scope, element, attrs) {
          scope.carousel.width = element[0].offsetWidth;
          scope.getWidth = function() {
            scope.carousel.width = element[0].offsetWidth;
          };
          scope.carousel.timeout = attrs.timeout || 1000;
        }
      }
    };
    return directive;
  })

  .directive('higgidyCarouselImages', function() {
    var directive = {
      scope:true,
      link: {
        post: function(scope, element) {
          scope.setsWidths = function() {
            var totalWidth = scope.carousel.width * scope.carousel.max;
            element.find('img').css({
              width: scope.carousel.width + 'px'
            });
            element.css({
              width: totalWidth + 'px'
            });
          };
          scope.animateScroll = function() {
            element.css( {'margin-left': 0-scope.carousel.width * scope.carousel.current + "px"});
          };
          scope.$watch('carousel.max', scope.setsWidths);
          scope.$watch('carousel.current', scope.animateScroll);
        }
      }
    };
    return directive;
  });
