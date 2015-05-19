(function(jQuery) {
	var BootstrapFunctions = function ($){
		var self = this;
		
		// Config vars
		self.configs = {
			breakpointClasses: ['xs', 'sm', 'md', 'lg'],
			breakpoint: null,
			useDebounce: true,
			debounceDelay: 100
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
		};

		// Debounce function
		self.debounce = function(fn,delay){
		    var timeoutId;
		    return function debounced(){
		        if(timeoutId){
		            clearTimeout(timeoutId);
		        }
		        timeoutId = setTimeout(fn.bind(this),delay);
		    }
		};

		// Monitor breakpoint changes
		self.monitorBreakpoints = function() {
    		if (self.getBreakpoint() != self.configs.breakpoint){
    			var prevBreakpoint = self.configs.breakpoint;
    			var newBreakpoint = self.getBreakpoint();

    			$('body').trigger('breakpointHit');
    			$('body').trigger(prevBreakpoint + '-breakpoint-exit');
    			self.setBreakpoint();
    			$('body').trigger(newBreakpoint + '-breakpoint-enter');    			
    		}
		};

		// Setup resize events
		if (self.configs.useDebounce === true){
			$(window).on('resize', self.debounce(self.monitorBreakpoints, self.configs.debounceDelay));
		} else {
			$(window).on("resize", self.monitorBreakpoints);
		}

		// Setup initial page load breakpoint
		self.monitorBreakpoints();

		// Expose methods
    	return {
    		isBreakpoint: isBreakpoint,
    		getBreakpoint: getBreakpoint
    	}
	};

	// Setup the global object and run init on document ready
	$(function(){ window.BootstrapFunctions = BootstrapFunctions(jQuery); });
})(jQuery);