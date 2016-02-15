var cc = 0;
var type = "light";
	var layers = [],
		objects = [],

		world = document.getElementById( 'worldcloud' ),
		viewport = document.getElementById( 'view-port' ),

		d = 40,
		p = 400,
		worldXAngle = 0,
		worldYAngle = 0;

	viewport.style.webkitPerspective = p;
	viewport.style.MozPerspective = p;
	viewport.style.oPerspective = p;

	generate();

	function createCloud()
  {
		var div = document.createElement( 'div'  );
		div.className = 'cloudBase';
		var x = 256 - ( Math.random() * 512 );
		var y = 256 - ( Math.random() * 512 );
		var z = 256 - ( Math.random() * 512 );
		cc += 1;
		if($.browser.chrome)
	  {
			if(cc == 1)
			{
				console.log(cc);
				x = -(window.innerWidth / 2) + 240;
				y = -(window.innerHeight / 2) - 30;
				z = 0;
			}
			else if(cc == 2)
			{
				console.log(cc);
				x = (window.innerWidth / 2) - 240;
				y = -(window.innerHeight / 2) - 30;
				z = 0;
			}
			else if(cc == 3)
			{
				console.log(cc);
				x = (window.innerWidth / 2) - 240;
				y = (window.innerHeight / 2) - 70;
				z = 0;
			}
			else if(cc == 4)
			{
				console.log(cc);
				x = -(window.innerWidth / 2) + 240;
				y = (window.innerHeight / 2) - 70;
				z = 0;
			}
	    	// x = 0;
				// y = 0;
				// z = 0;
	  }

		if(cc == 1)
		{
			var t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px ) rotateZ(-13deg)';
		}
		else if(cc == 2)
		{
			var t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px ) rotateZ(13deg)';
		}
		else if(cc == 3)
		{
			var t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px ) rotateZ(-13deg)';
		}
		else if(cc == 4)
		{
			var t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px ) rotateZ(13deg)';
		}
		div.style.webkitTransform = t;
		div.style.MozTransform = t;
		div.style.oTransform = t;
		div.style.msTransform = t;
		world.appendChild( div );

		for( var j = 0; j < 5 + Math.round( Math.random() * 10 ); j++ )
    {
			var cloud = document.createElement( 'img' );
			cloud.style.opacity = 0;
			var r = Math.random();
			if(type == "light")
			{
				var src = './images/cloud2.png';
			}
			else
			{
				var src = './images/smoke.png';
			}
			( function( img ) { img.addEventListener( 'load', function()
      {
				img.style.opacity = .3;
			} ) } )( cloud );
			cloud.setAttribute( 'src', src );
			cloud.className = 'cloudLayer';

			var randnum = Math.floor((Math.random() * 2000) + 500); ;
			var x = window.innerWidth / 2 - randnum + 700 ;
			console.log(x);
      var y = 256//256 - ( Math.random() * 512 );
			var z = 100 - ( Math.random() * 200 );
			z = 0;
			var a = Math.random() * 360;
			if($.browser.chrome)
		  {
				var s = 1 ;
			}
			else
			{
				var s = .25 + Math.random() + 1.5;
			}

			x *= .2; y *= .2;
			cloud.data = {
				x: x,
				y: y,
				z: z,
				a: a,
				s: s,
				speed: .1 * Math.random()
			};
			var t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px ) rotateZ( ' + a + 'deg ) scale( ' + s + ' )';
			cloud.style.webkitTransform = t;
			cloud.style.MozTransform = t;
			cloud.style.oTransform = t;
			cloud.style.msTransform = t;
			div.appendChild( cloud );
			layers.push( cloud );
		}
		return div;
	}

	window.addEventListener( 'mousewheel', onContainerMouseWheel );
	window.addEventListener( 'DOMMouseScroll', onContainerMouseWheel );

	window.addEventListener( 'mousemove', function( e )
  {
	//	worldYAngle = -( .5 - ( e.clientX / window.innerWidth ) ) * 180;
	//	worldXAngle = ( .5 - ( e.clientY / window.innerHeight ) ) * 180;
		//updateView();
	} );

	function generate()
  {
		objects = [];
		if ( world.hasChildNodes() )
    {
			while ( world.childNodes.length >= 1 )
			{
				world.removeChild( world.firstChild );
			}
		}
		for( var j = 0; j < 4; j++ )
    {
			objects.push( createCloud() );
		}
	}


	function updateView()
  {
		var t = 'translateZ( ' + d + 'px ) rotateX( ' + worldXAngle + 'deg) rotateY( ' + worldYAngle + 'deg)';
		world.style.webkitTransform = t;
		world.style.MozTransform = t;
		world.style.oTransform = t;
		world.style.msTransform = t;
	}

	function onContainerMouseWheel( event )
  {

		event = event ? event : window.event;
		//d = d - ( event.detail ? event.detail * -5 : event.wheelDelta / 8 );
		//updateView();
	}

	function update ()
  {

		for( var j = 0; j < layers.length; j++ )
    {
			var layer = layers[ j ];
			layer.data.a += layer.data.speed;
			var t = 'translateX( ' + layer.data.x + 'px ) translateY( ' + layer.data.y + 'px ) translateZ( ' + layer.data.z + 'px ) rotateY( ' + ( - worldYAngle ) + 'deg ) rotateX( ' + ( - worldXAngle ) + 'deg ) rotateZ( ' + layer.data.a + 'deg ) scale( ' + layer.data.s + ')';
			layer.style.webkitTransform = t;
			layer.style.MozTransform = t;
			layer.style.oTransform = t;
			layer.style.msTransform = t;
		}
		requestAnimationFrame( update );
	}


	update();
  updateView();
