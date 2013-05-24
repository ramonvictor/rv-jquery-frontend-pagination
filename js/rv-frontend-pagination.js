/*
 *  Project: RV Frontend Pagination jQuery Plugin
 *  Description: A markup-free frontend pagination jquery plugin. Your page can have as many pagination components as you want, ID is not required, you can use css classes.
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
            	next: '.rvlp-next',
            	prev: '.rvlp-prev',
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

            /* NOTE: Create refresh public method. */

        },

        paginateRegister: function(){
            var _self = this;

            _self.$container.each(function(){

                var _context = this,
                    $container = $(this);
                    _context.$listContainer = $container.find( _self.options.listContainer );
                    _context.$childrenItems = _context.$listContainer.find( _self.options.itemElement );
                    _context.$pagesNumberContainer = $container.find( _self.options.pager.pages );
                    _context.$pagesNavPrev = $container.find( _self.options.pager.prev );
                    _context.$pagesNavNext = $container.find( _self.options.pager.next );


                
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
                    _context.pagesNumberLength = _context.$pagesNumberContainer.children().length;

                    _self.eventsRegister( _context );
                }
            });

        },

        getCurrentIndex : function( _context ){
            return parseInt( _context.$pagesNumberContainer.children('.current').attr('data-show-page'), 10) - 1;
        },

        updateDisabledNav : function( _context ){
            var _self = this,
                index = _self.getCurrentIndex( _context );

            _context.$pagesNavPrev.removeClass('disabled');
            _context.$pagesNavNext.removeClass('disabled');

            if( index === 0 ){
               _context.$pagesNavPrev.addClass('disabled');
            }

            if( index === (_context.pagesNumberLength-1) ){
               _context.$pagesNavNext.addClass('disabled');
            }
        },

        eventsRegister : function( _context ) {
            var _self = this;

            _context.$pagesNumberContainer.children().on('click.rvPagination', function(){
                var $element = $(this),
                    showpage = parseInt($element.attr('data-show-page'), 10);
                
                $element.addClass('current').siblings().removeClass('current');

                var endRange = showpage * _self.options.perpage;        
                _context.$childrenItems.css('display', 'none').slice( endRange-5 , endRange).show();

            }); 

            _context.$pagesNavPrev.on('click', function(){
                var index = _self.getCurrentIndex( _context ),
                    $element = $(this);
                if( index > 0 ){
                    _context.$pagesNumberContainer.children().eq(index-1).trigger('click.rvPagination');
                }
                _self.updateDisabledNav( _context );
            });

            _context.$pagesNavNext.on('click', function(){
                var index = _self.getCurrentIndex( _context );
                if( index < (_context.pagesNumberLength-1)) {
                    _context.$pagesNumberContainer.children().eq(index+1).trigger('click.rvPagination');
                }
                _self.updateDisabledNav( _context );
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