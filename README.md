# simple_carousel [![Build Status](https://secure.travis-ci.org/forwardadvance/simple_carousel.png?branch=master)](http://travis-ci.org/forwardadvance/simple_carousel)

A really simple Angular image carousel.

## Getting Started

A basic carousel will look something like this. 

Ensure you have an object called images in $scope. You are of course free to modify the html as you see fit. The only requirement is that you have a list of images in the higgidy-carousel-images directive.

    $scope.images = [];

    <div higgidy-carousel='images' timeout="3000">
      <ul higgidy-carousel-images>
        <li ng-repeat="image in images">
          <a href="{{image.link}}">
            <img ng-src="{{image.src}}" alt="{{img.alt}}" />
          </a>
        </li>
      </ul>
      <nav class="links">
        <ul>
          <li ng-repeat="image in images">
            <a href="" ng-click="show($index)" ng-class="{selected: carousel.current == $index}">
              {{$index}}
            </a>
          </li>
        </ul>
      </nav>
    </div>


## Examples

<http://www.higgidy.co.uk>, or just view the project index file.

## Building

watch the project with the default grunt task. Livereload is enabled and will work with the livereload plugin.

    grunt

build with:

    grunt build


## Release History

2014-12-09 - First release

## License
Copyright (c) 2014 Nicholas Johnson  
Licensed under the MIT license.
