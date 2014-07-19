/*
Active GUI - Version 1.0 - January 11th, 2011

COPYRIGHT: 2012-2014 Active9 LLC
WEBSITE: http://active9.com/open-source/activegui/
LICENSE: GNU GENERAL PUBLIC LICENSE V3
*/
var controlwidth = 0;
var controlheight = 0;
var ranscreensize = 0;
var ActiveGUI = {

	// Module Loader
	load_mod: function (mod,funct) {
		eval("ActiveGUI." + mod + " = " + funct + ";");
	},

	// Cross Browser Element ID Object
	get_id: function (i) {
		var obj = "";
		if (document.all) {
			obj = document.all[i];
		} else if (document.layers) {
			obj = document.layers[i];
		} else if (document.getElementById) {
			obj = document.getElementById(i);
		}
		return obj;
	},

	// Object Transparency Functions
	setopacity: function (opacity, id) {
		var object = ActiveGUI.get_id('' + id + '').style;
		object.opacity = (opacity / 100);
		object.MozOpacity = (opacity / 100);
		object.KhtmlOpacity = (opacity / 100);
		object.filter = "alpha(opacity=" + opacity + ")";
	},

	// Fade In An Element In
	fadein: function (target, start, end, pow, interval) {
		FD = ActiveGUI.get_id('' + target + '');
		FD.style.display = "block";
		if (parseFloat(start) > 100) {
			ActiveGUI.setopacity('100', '' + target + '');
			start = 100;
		}
		if (parseFloat(start) < parseFloat(end)) {
			start = parseFloat(start) + parseFloat(pow);
			ActiveGUI.setopacity('' + start + '', '' + target + '');
			window.setTimeout("ActiveGUI.fadein('" + target + "','" + start + "','" + end + "','" + pow + "')", interval);
		}
	},

	// Fade An Element Out
	fadeout: function (target, start, end, pow, interval) {
		FD = ActiveGUI.get_id('' + target + '');
		if (parseFloat(start) < 0) {
			ActiveGUI.setopacity('0', '' + target + '');
			start = 0;
		}
		if (parseFloat(start) > parseFloat(end)) {
			start = parseFloat(start) - parseFloat(pow);
			ActiveGUI.setopacity('' + start + '', '' + target + '');
			window.setTimeout("ActiveGUI.fadeout('" + target + "','" + start + "','" + end + "','" + pow + "')", interval);
		}
		if (parseFloat(start) == parseFloat(end)) {
			FD.style.display = 'none';
		}
	},

	// Hide An Element
	hide_element: function (id) {
		ActiveGUI.fadeout('' + id + '', 100, 0, 10, 20);
	},

	// Show An Element
	show_element: function (id) {
		ActiveGUI.fadein('' + id + '', 0, 100, 10, 20);
	},

	// Get The Clients Screen Size
	screensize: function () {
		var ranscreensize = 1;
		//opera Netscape 6 Netscape 4x Mozilla 
		if (window.innerWidth || window.innerHeight) {
			controlwidth = window.innerWidth;
			controlheight = window.innerHeight;
		}
		//IE Mozilla 
		if (document.body.clientWidth || document.body.clientHeight) {
			controlwidth = document.body.clientWidth;
			controlheight = document.body.clientHeight;
		}
	},

	// Move An Object To The Middle Of The Clients Screen
	movetocenter: function (obj) {
		if (ranscreensize != 1) {
			ActiveGUI.screensize();
		}
		myobj = ActiveGUI.get_id("" + obj + "");
		myobjw = myobj.style.width;
		myobjw = myobjw.replace("px", "");
		myobjh = myobj.style.height;
		myobjh = myobjh.replace("px", "");
		if (!myobj.style.top) {
			myobj.style.top = '0px;'
		}
		if (!myobj.style.left) {
			myobj.style.left = '0px;'
		}
		myobj.style.top = parseFloat((parseFloat(controlheight) - parseFloat(myobjh)) / 2) + 'px';
		myobj.style.left = parseFloat((parseFloat(controlwidth) - parseFloat(myobjw)) / 2) + 'px';
	},

	// Move An Object
	move: function (objectx, step, max, xpow, ypow, interval) {
		if (ranscreensize != 1) {
			ActiveGUI.screensize();
		}
		if (parseFloat(step) < parseFloat(max)) {
			var mvobjm = ActiveGUI.get_id('' + objectx + '');
			if (!mvobjm.style.top) {
				mvobjm.style.top = '0px';
			}
			if (!mvobjm.style.left) {
				mvobjm.style.left = '0px';
			}
			mvobjm.style.top = parseFloat(mvobjm.style.top) + parseFloat(ypow) + 'px';
			mvobjm.style.left = parseFloat(mvobjm.style.left) + parseFloat(xpow) + 'px';
			step = parseFloat(step) + 1;
			window.setTimeout("ActiveGUI.move('" + objectx + "','" + step + "','" + max + "','" + xpow + "','" + ypow + "','" + interval + "')", interval);
		}
	}

}
