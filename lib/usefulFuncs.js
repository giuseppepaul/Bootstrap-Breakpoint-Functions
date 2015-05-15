var BootstrapFunctions;

$(function() {
	BootstrapFunctions = function (){
		var self = this;
		
		// Config vars
		self.configs = {
			breakpointClasses: ['xs', 'sm', 'md', 'lg'],
			breakpoint: null
		};

		// Init
		self.init = function () {
			// Setup elements for breakpoint methods
			for (var i = 0; i < self.configs.breakpointClasses.length; i++) {
				var elemClasses = 'device-' + self.configs.breakpointClasses[i] + ' visible-' + self.configs.breakpointClasses[i] + ' breakpoint';
				var elem = $('<div>').addClass(elemClasses).attr('data-breakpoint', self.configs.breakpointClasses[i]);
				$('body').append(elem);				
			};
		}();

		// Get Current Breakpoint
		self.getBreakpoint = function () {
			var breakpoint = $('.breakpoint:visible').attr('data-breakpoint');
			return breakpoint;
		};

		// Check if breakpoint
		self.isBreakpoint = function (alias) {
		    return $('.device-' + alias).is(':visible');
		};

		// Set breakpoint
		self.setBreakpoint = function (){
			self.configs.breakpoint = self.getBreakpoint();
		}		

		// Monitor breakpoint changes
		$(window).on("resize", function () {
    		if (self.getBreakpoint() != self.configs.breakpoint){    			
    			var prevBreakpoint = self.configs.breakpoint;
    			var newBreakpoint = self.getBreakpoint();

    			$('body').trigger('breakpointHit');
    			$('body').trigger(prevBreakpoint + '-breakpoint-exit');
    			self.setBreakpoint();
    			$('body').trigger(newBreakpoint + '-breakpoint-enter');    			
    		}
    	}).resize();

    	return {
    		isBreakpoint: isBreakpoint,
    		getBreakpoint: getBreakpoint
    	}
	}();
});