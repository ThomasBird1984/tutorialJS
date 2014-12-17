( function ( $ ) {
	
	$.fn.tutorialJS = function( options ) {

		/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
		%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    Configuration Settings    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
		%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
		var config = $.extend({
			'tutorial_next' : 'tutorial-next',
			'tutorial_previous' : 'tutorial-previous',
			'tutorial_complete' : 'tutorial-completed',
			'nav_selector' : 'navbar',
			'speed' : 250
		}, options );

		var step = 0,
			$steps = this[0].steps,
			compiled_actions = '',
			replacements = {'tutorial-direction' : 'direction', 'tutorial-title' : 'title', 'tutorial-content' : 'content', 'tutorial-actions' : 'actions' },
			template = '<div class="tutorial-item-wrap [[tutorial-direction]]"><div class="tutorial-arrow"></div><div class="tutorial-item-header">[[tutorial-title]]</div><div class="tutorial-item-content">[[tutorial-content]]</div><div class="tutorial-item-actions">[[tutorial-actions]]</div></div>',
			nav_height = $( '.'+ config.nav_selector ).outerHeight(),
			el = '',
			offset = 0;

		// add a position relative to all wrapping elements for proper placement of tutorial elements
		$( this[0].steps ).each( function() {

			$( this.target ).addClass('class-tutorial-relative');

		});

		$( window ).on('load', function() {

			get_tutorial_step();

		});

		$( 'body' ).on('click', '.'+ config.tutorial_next, function( e ) {

			remove_tutorial_step();

			step += 1;
			get_tutorial_step();

			e.preventDefault();

		});

		$( 'body' ).on('click', '.'+ config.tutorial_previous, function( e ) {

			remove_tutorial_step();

			step -= 1;
			get_tutorial_step();

			e.preventDefault();

		});

		$( 'body' ).on('click', '.'+ config.tutorial_complete, function( e ) {

			$('.tutorial-item-wrap').remove();
			step = 0;

			e.preventDefault();

		});

		function get_tutorial_step() {

			var tpl = template;

			for( var prop in replacements ) {

				if( prop === 'tutorial-actions' ) {

					compiled_actions = action_items( $steps[step][replacements[prop]] );

					var regex = new RegExp( '\\[\\['+ prop +']]', 'g' );
		            tpl = tpl.replace( regex, compiled_actions );

				} else {

		            var regex = new RegExp( '\\[\\['+ prop +']]', 'g' );
		            tpl = tpl.replace( regex, $steps[step][replacements[prop]] );

				}

			};

			// scroll to element				
			el = $steps[step].target;
			offset = $( el ).parent().offset().top;
		
			$('body,html').animate({
				scrollTop: ( offset - nav_height )
			}, config.speed );

			// place content
			$( $steps[step].target ).append( tpl );

		}

		function remove_tutorial_step() {
			$('.tutorial-item-wrap').remove();
		}

		function action_items( actions ) {

			var action_html = '';

			for( i = 0; i < actions.length; i++ ) {

				action_html += '<a href="#" class="tutorial-btn tutorial-'+ actions[i] +'">'+ actions[i].capitalize() +'</a> ';

			}

			return action_html;

		}

		String.prototype.capitalize = function() {
		    return this.charAt(0).toUpperCase() + this.slice(1);
		}

	};
	
}) ( jQuery );