(function() {
	var inrescale = false

	function rescale() {
		if (inrescale) return
		inrescale = true
		$('.scroll').attr('style', '')
		$('.hsplit, .vsplit').data('shrink', 0)
		$('.hsplit > .shrink').each(function() {
			var p = $(this).parent()
			var h = Math.ceil(parseFloat($(this).css('height')))
			$(this).css('height', h)
			p.data('shrink', p.data('shrink') + h)
		})
		$('.hsplit > :not(.shrink, .slidein, .slideup, .slideoutup, .slidedown, .slideoutdown)').each(function() {
			var p = $(this).parent()
			var n = p.children(':not(.shrink, .slidein, .slideup, .slideoutup, .slidedown, .slideoutdown)').length
			var s = 'calc(' + (100 / n) + '% - ' + (p.data('shrink') / n) + 'px)'
			$(this).css('height', p.data('shrink') ? s : (100 / n) + '%')
		})
		$('.vsplit > .shrink:not(.slidein)').each(function() {
			var p = $(this).parent()
			$(this).css('width', 'auto')
			var w = Math.ceil(parseFloat($(this).css('width'))) + 1
			$(this).css('width', w)
			p.data('shrink', p.data('shrink') + w)
		})
		$('.vsplit > :not(.shrink, .slidein, .slideleft, .slideoutleft, .slideright, .slideoutright)').each(function() {
			var p = $(this).parent()
			var n = p.children(':not(.shrink, .slidein, .slideleft, .slideoutleft, .slideright, .slideoutright)').length
			var c = p.children('.scroll').length * 20
			//alert(p.data('shrink') + '/' + n)
			var s = 'calc(' + (100 / n) + '% - ' + ((p.data('shrink') + c) / n) + 'px)'
			$(this).css('width', p.data('shrink') ? s : (100 / n) + '%')
		})
		$('.scrollmax.shrink:not(.slidein), .scroll.shrink:not(.slidein)').each(function() {
			$(this).css('width', (Math.ceil(parseFloat($(this).css('width'))) + 20) + 'px')
		})
		$('.scrollmax').scrollTop(10000000)
		inrescale = false
	}

	function prep() {
		rescale()
		var obs = new MutationObserver(rescale)
		$('.observe').each(function() {
			obs.observe(this, {
				attributes: true,
				childList: true,
				characterData: true,
				subtree: true
			})
		})
		var scr = new MutationObserver(function(rec) {
			$(rec.target).scrollTop(10000000)
		})
		$('.scrollmax').each(function() {
			scr.observe(this, {
				childList: true,
				characterData: true,
				subtree: true
			})
		})
	}

	window.addEventListener('resize', rescale)
	window.addEventListener('load', prep)
	
	window.slide = function(id, size) {
		size = size || 'auto'
		var a = {}
		if ($(id).hasClass('slidein')) {
			$(id).data('slidein', true)
			$(id).removeClass('slidein')
			return rescale()
		} else if ($(id).data('slidein')) {
			$(id).attr('style', '')
			$(id).addClass('slidein')
			return rescale()
		} else if ($(id).hasClass('slideup') || $(id).hasClass('slidedown')) {
			a.height = parseInt($(id).css('height')) ? 0 : size
		}  else if ($(id).hasClass('slideright') || $(id).hasClass('slideleft')) {
			a.width = parseInt($(id).css('width')) ? 0 : size
		} else if ($(id).hasClass('slideoutup')) {
			$(id).css('bottom', $(id).parent().css('height'))
			a.height = parseInt($(id).css('height')) ? 0 : size
		} else if ($(id).hasClass('slideoutdown')) {
			$(id).css('top', $(id).parent().css('height'))
			a.height = parseInt($(id).css('height')) ? 0 : size
		} else if ($(id).hasClass('slideoutright')) {
			$(id).css('left', $(id).parent().css('width'))
			a.width = parseInt($(id).css('width')) ? 0 : size
		} else if ($(id).hasClass('slideoutleft')) {
			$(id).css('right', $(id).parent().css('width'))
			a.width = parseInt($(id).css('width')) ? 0 : size
		} 
		$(id).animate(a, 1000)
	}
}())
