( function ( $ ) {
	
	$.fn.tutorialJS = function( options ) {

		/**
		 *	Configuration settings
		**/
		var config = $.extend({
			'tutorial_btn' : 'tutorial-btn',
			'tutorial_next' : 'tutorial-next',
			'tutorial_start' : 'tutorial-start',
			'tutorial_previous' : 'tutorial-previous',
			'tutorial_complete' : 'tutorial-completed',
			'tutorial_restart' : 'tutorial-restart',
			'nav_selector' : 'navbar',
			'speed' : 250,
			'autostart' : false
		}, options );

		/**
		 *	Definition of some base variables for later use
		**/
		var step = 0,
			$steps = this[0].steps,
			compiled_actions = clickAction = '',
			replacements = {'tutorial-direction' : 'direction', 'tutorial-title' : 'title', 'tutorial-content' : 'content', 'tutorial-actions' : 'actions' },
			template = '<div class="tutorial-item-wrap [[tutorial-direction]]"><div class="tutorial-arrow"></div><div class="tutorial-item-header">[[tutorial-title]]</div><div class="tutorial-item-content">[[tutorial-content]]</div><div class="tutorial-item-actions">[[tutorial-actions]]</div></div>',
			nav_height = $( '.'+ config.nav_selector ).outerHeight(),
			el = '',
			offset = 0,
			getNextStep = true;

		/**
		 *	Adds a position relative class to each element for proper positioning
		**/
		$( this[0].steps ).each( function() {
			$( this.target ).addClass('class-tutorial-relative');
		});

		/**
		 *	If set to autostart, tutorial starts once page loads
		**/
		if( config.autostart ) {
			$( window ).on('load', function() {
				get_tutorial_step();
			});
		}

		/**
		 *	Event listener that controls all click actions for tutorial
		**/
		$( 'body' ).on('click', '.'+ config.tutorial_btn, function( e ) {

			clickAction = $( this ).data('action');

			switch( clickAction ) {
				case 'start':

					getNextStep = true;
					step = 0;

				break;

				case 'next':
					
					getNextStep = true;
					step += 1;

				break;

				case 'previous':

					getNextStep = true;
					step -= 1;

				break;

				case 'completed':

					getNextStep = false;
					step = 0;

				break;

				case 'restart':

					getNextStep = true;
					step = 0;

				break;
			}

			get_tutorial_step();
			e.preventDefault();

		});

		/**
		 *	This method brings everything together and controls the plugins functionality
		**/
		function get_tutorial_step() {

			// remove previous tutorial step
			remove_tutorial_step();

			if( getNextStep ) {

				// build template step for tutorial
				tpl = build_template();

				// scroll to correct location of page
				scroll_page( $steps[step].target );

				// place content
				$( $steps[step].target ).append( tpl );

			}

		}

		/**
		 *	Removes all tutorial steps
		**/
		function remove_tutorial_step() {
			$('.tutorial-item-wrap').remove();
		}

		/**
		 *	The method that scrolls to the correct location on page
		 *
		 *	@var String 
		**/
		function scroll_page( target ) {
			// scroll to element				
			el = target;
			offset = $( el ).parent().offset().top;
		
			$('body,html').animate({
				scrollTop: ( offset - nav_height )
			}, config.speed );
		}

		/**
		 *	The method that builds the html markup for the step
		**/
		function build_template() {

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

			if( $steps[step].substeps ) {

				substepit( $steps[step].substeps );

			}

			return tpl;

		}

		/**
		 *	The method that builds the action buttons for the step determined by the user array
		 *
		 *	@var Array
		**/
		function action_items( actions ) {

			var action_html = '';

			for( i = 0; i < actions.length; i++ ) {

				action_html += '<a href="#" class="tutorial-btn" data-action="'+ actions[i] +'">'+ actions[i].capitalize() +'</a> ';

			}

			return action_html;

		}

		function substepit( steps ) {

/*
var maxCount = 100,
	count = 1,
	interval = 3,
	mod = 0;

for( i = 0; i < maxCount; i++ ) {

	mod = count % interval;

	console.log( mod, mod === 0 );

	count++;

}
*/

		}

		/**
		 *	A helper method that is similar to PHP ucfirst
		**/
		String.prototype.capitalize = function() {
		    return this.charAt(0).toUpperCase() + this.slice(1);
		}

	};
	
}) ( jQuery );

/*

start timer

check to see if timer currently is modulus of user defined duration

if it is trigger event on desired target

run counter to keep track of when to stop intervals

stop intervals

*/