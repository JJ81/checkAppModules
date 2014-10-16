/*
 * Check app modular
 * Script by : J
 * Date : 2013.12.2
 * Version : 1.0
 */

// Model
function appCheckModular() {
  this.ENVIRONMENT = {}; // Addable json data freely.
}

appCheckModular.starter = null; // instance

appCheckModular.initiate = function () {
	if(appCheckModular.starter === null) {
		appCheckModular.starter = new appCheckModular();
	}
	return appCheckModular.starter;
};

appCheckModular.prototype = {
	init : function () {
		this.setDeviceInfo();
		this.setBrowserInfo();	
	},
	
	setDeviceInfo : function () {
		var getInfo;
		if(navigator.userAgent.match(/(iPad|iPhone|iPod)/ig)) {
		  getInfo = "iOS";
		} else if(navigator.userAgent.match(/android/ig)) {
		  getInfo = "Android";
		} else {
		  getInfo = "PC";
		}
		this.ENVIRONMENT.Device = getInfo;
	},
  
	getDeviceInfo : function () {
		return this.ENVIRONMENT.Device;
	},
  
	setBrowserInfo : function () {
		var getInfo;  
		if(navigator.userAgent.match(/OPR/ig)){ // when open though Opera browser, it'd checked out Chrome and Mozilla
		  getInfo = "Opera";					
		} else if(navigator.userAgent.match(/Chrome/ig)) {
		  getInfo = "Chrome";				
		} else if(navigator.userAgent.match(/Firefox/ig)){
		  getInfo = "Firefox";					
		} else if(navigator.userAgent.match(/MSIE/ig)){
		  getInfo = "MSIE";					
		}  else {
		  getInfo = "Other";
		}
		this.ENVIRONMENT.Browser = getInfo;
	},
  
	getBrowserInfo : function () {
	    return this.ENVIRONMENT.Browser;
	},
	
	setAppScheme : function (schemes, Package) {
		if(schemes == null || Package == null) return false;
		
	    if(this.ENVIRONMENT.Browser === "Chrome") {
	      var jsonData = schemes;
	      var arr = [];
	      
	      for(var i in jsonData) {
	        arr.push([i, "intent:" + jsonData[i] + "#Intent;package=" + Package + ";end;" ]);
	      }
	
	      for(var j in arr) {
	        this.addPropertyForScheme(arr[j][0].toString(), arr[j][1].toString());
	      }
	    
	    } else {
	      this.ENVIRONMENT.AppScheme = schemes;
	    }
	},
  
	addPropertyForScheme : function (propertyName, value) {
	    this.ENVIRONMENT.AppScheme = this.ENVIRONMENT.AppScheme || {};
	    this.ENVIRONMENT.AppScheme[propertyName] = value;
	},
  
	getAppScheme : function (SchemeName) {
	    if(SchemeName) {
	      return this.ENVIRONMENT.AppScheme[SchemeName];
	    } else {
	      return this.ENVIRONMENT.AppScheme;
	    }
	},
  
	callAppScheme : function (SchemeName) { // optional callMarket func
		
	    if(!SchemeName) return false;
	    
	    if(this.ENVIRONMENT.Device === "iOS") {
            location.href = this.ENVIRONMENT.AppScheme[SchemeName];
	    }else if(this.ENVIRONMENT.Device === 'Android'){
			if(this.ENVIRONMENT.Browser == "Chrome") { // 크롬일 때만 스킴을 로케이션으로 호출해야 하는가 검토가 필요함.
		    	location.href = this.ENVIRONMENT.AppScheme[SchemeName];
		    } else {
		    	var _iframe = document.createElement("iframe");
		    	// 작동 여부 확인할 것.	
			    _iframe.id = "callAppModular";
			    _iframe.style.width = 0;
			    _iframe.style.height = 0;
			    _iframe.style.position = "absolute";
			    _iframe.style.top = "-9999em";
			    _iframe.style.left = "-9999em";
			    _iframe.src = this.ENVIRONMENT.AppScheme[SchemeName];
			    
			    var _self = this;
			    var addr = _self.ENVIRONMENT.Market['Android'];
				
			    _iframe.onload = function () {
					_self.goMarket(addr);
				};
			    document.getElementsByTagName("body")[0].appendChild(_iframe);
			   
		    }
	    }    
	},

	setMarket : function (markets) {
	    this.ENVIRONMENT.Market = markets;
	},
  
	getMarket : function (type) {
	    if(type) {
	      return this.ENVIRONMENT.Market[type];
	    } else {
	      return this.ENVIRONMENT.Market;
	    }
	},
	
	callMarket : function (type) { // for calling iOS market
		location.href = this.ENVIRONMENT.Market[type];
	},
	
	setWebLocation : function (locations) {
	    this.ENVIRONMENT.WebLocation = locations;
	},
  
	getWebLocation : function(locationName) {
	    return this.ENVIRONMENT.WebLocation[locationName];
	},
	  
	callWebLocation : function (locationName) {
		if(this.ENVIRONMENT.Device === 'PC') window.open(this.ENVIRONMENT.WebLocation[locationName]);
		else location.href = this.ENVIRONMENT.WebLocation[locationName];
	},

	// to Check information data on console log  
	viewConsoleInfo : function () {
	    console.log( this.ENVIRONMENT );
	    //alert( this.ENVIRONMENT['Market'].Android );
	},
  
	// Customizing Area
	// Add user options for specific cases.
	setAddOptions : function (options) {
	    this.ENVIRONMENT.userOption = options;
	},
	  
	getAddOptions : function () {
	    return this.ENVIRONMENT.userOption;
	},
	
	goMarket : function (addr) {
		location.href = addr;		
	}
};