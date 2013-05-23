/*
 *  Project: RV Font Size jQuery Plugin
 *  Description: An easy and flexible jquery plugin to give font size accessibility control.
 *  URL: https://github.com/ramonvictor/rv-jquery-fontsize/
 *  Author: Ramon Victor (https://github.com/ramonvictor/)
 *  License: Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 *  Any and all use of this script must be accompanied by this copyright/license notice in its present form.
 */

;(function ($, window, document, undefined) {
    "use strict";

    var rvListPaginate = "rvListPaginate",
        defaults = {
            perpage: 5,
            listContainer: '.paginated',
            itemElement: 'li',
            pager: {
            	nextClass: '.rvlp-next',
            	prevClass: '.rvlp-prev',
            	pages: '.rvlp-pages'
            }
        };

    function Plugin(element, options) {
        var _self = this;

        _self.element = element;
        _self.options = $.extend({}, defaults, options);

        _self.$container = $( element );
        

        _self._defaults = defaults;
        _self._name = rvListPaginate;

        _self.init();
    }

    Plugin.prototype = {

        init: function() {

            var _self = this;

            _self.paginateRegister();

        },

        paginateRegister: function(){
            var _self = this;

            _self.$container.each(function(){

                var _context = this,
                    $container = $(this);
                    _context.$listContainer = $container.find( _self.options.listContainer );
                    _context.$childrenItems = _context.$listContainer.find( _self.options.itemElement );
                    _context.$pagesNumberContainer = $container.find( _self.options.pager.pages );

                
                if( _context.$childrenItems.length > _self.options.perpage ){
                    _context.$childrenItems.css('display', 'none').slice(0, _self.options.perpage).show();

                    _context.$paginationLength = Math.ceil( _context.$childrenItems.length / _self.options.perpage );

                    var pagesNavHmtl = '';
                    for (var i=0;i<_context.$paginationLength;i++){
                        var classNames = 'rvlp-page-number';
                        if(i===0){
                            classNames += ' current';
                        }

                        pagesNavHmtl+= '<span class="'+classNames+'" data-show-page="'+ (i+1) +'">'+ (i+1) +'</span>';
                    }
                    _context.$pagesNumberContainer.html( pagesNavHmtl );

                    _self.eventsRegister( _context );
                }
            });

        },

        eventsRegister : function( _context ) {
            var _self = this;

            _context.$pagesNumberContainer.children().on('click', function(){
                var $element = $(this),
                    showpage = parseInt($element.attr('data-show-page'), 10);
                
                $element.addClass('current').siblings().removeClass('current');

                var endRange = showpage * _self.options.perpage;        
                _context.$childrenItems.css('display', 'none').slice( endRange-5 , endRange).show();

            }); 
        }

    };

    
    $.fn[rvListPaginate] = function (options) {
        var _self = this;
        return _self.each(function () {
            if (!$.data(_self, "plugin_" + rvListPaginate)) {
                $.data(_self, "plugin_" + rvListPaginate, new Plugin(_self, options));
            }
        });
    };

})(jQuery, window, document);