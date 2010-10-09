var Controller = function(spec, my) {
	var that = {};
	
	my = my || {};

	var GetDefaultBaseUrl = function() {
		var protocol = document.location.protocol + "//";
		var hostname = document.location.hostname;
		var port = document.location.port !== '' ? ":" + document.location.port : "";
		
		return protocol + hostname + port + "/";
	};

	that.clearFlash = function() {
		that.flash = {
			notice: "",
			error: "",
			warning: "",
			message: ""
		}	
	};
	
	that.clearFlash();
	
	that.table = spec.table || null;
	that.model = spec.model || null;
	that.baseURL = spec.base_url || GetDefaultBaseUrl();
	
	that.clearData = function(){
		that.dataIndex = null;
		that.dataShow = null;
		that.dataNew = null;
		that.dataEdit = null;
	};
	
	that.clearData();

	that.index = function( successCallback ) {
		
		var result = $.ajax({
			url: that.baseURL + that.table,
			dataType: "json",
			type: "GET",
			processData: false,
			contentType: "application/json",
			success: function ( data, status, xhr ) {
				that.dataIndex = data;

				if ( typeof( successCallback ) === 'function' ) {
					successCallback( data, status, xhr );
				}
			}
		});
	};
	
	that.show = function( id, successCallback ) {
		$.ajax({
			url: that.baseURL + that.table + "/" + id,
			dataType: "json",
			type: "GET",
			processData: false,
			contentType: "application/json",
			success: function( data, status, xhr ) {
				that.dataShow = data;
				
				if ( typeof( successCallback ) === 'function' ) {
					successCallback( data, status, xhr );
				}
			}
		});
	};

	that.new = function( successCallback ) {
		$.ajax({
			url: that.baseURL + that.table + "/new",
			dataType: "json",
			type: "GET",
			processData: false,
			contentType: "application/json",
			success: function( data, status, xhr ) {
				that.dataNew = data;
				
				if ( typeof( successCallback ) === 'function' ) {
					successCallback( data, status, xhr );
				}
			}
		});
	};

	that.create = function( obj, successCallback ) {
		var data = JSON.stringify( obj );
		
		$.ajax({
			url: that.baseURL + that.table,
			dataType: "json",
			type: "POST",
			processData: false,
			contentType: "application/json",
			data: data,
			success: function( data, status, xhr ) {
				that.flash.notice = xhr.getResponseHeader("X-Flash-Notice");
				that.flash.error = xhr.getResponseHeader("X-Flash-Error");
				that.flash.warning = xhr.getResponseHeader("X-Flash-Warning");
				that.flash.message = xhr.getResponseHeader("X-Flash-Message");
				
				if ( typeof( successCallback ) === 'function' ) {
					successCallback( data, status, xhr );
				}
			}
		});
	};

	that.edit = function( id, successCallback ) {
		$.ajax({
			url: that.baseURL + that.table + "/" + id + "/edit",
			dataType: "json",
			type: "GET",
			processData: false,
			contentType: "application/json",
			success: function( data, status, xhr ) {
				that.dataEdit = data;
				
				if ( typeof( successCallback ) === 'function' ) {
					successCallback( data, status, xhr );
				}
			}
		});
	};

	that.update = function( obj, successCallback ) {
		var data = JSON.stringify( obj );
		
		$.ajax({
			url: that.baseURL + that.table + "/" + obj[that.model].id,
			dataType: "json",
			type: "POST",
			processData: false,
			contentType: "application/json",
			data: data,
			beforeSend: function(xhr)   
			{
				xhr.setRequestHeader("X-Http-Method-Override", "PUT");
			},
			success: function( data, status, xhr ) {
				that.flash.notice = xhr.getResponseHeader("X-Flash-Notice");
				that.flash.error = xhr.getResponseHeader("X-Flash-Error");
				that.flash.warning = xhr.getResponseHeader("X-Flash-Warning");
				that.flash.message = xhr.getResponseHeader("X-Flash-Message");
				
				if ( typeof( successCallback ) === 'function' ) {
					successCallback( data, status, xhr );
				}
			}
		});
	};

	that.destroy = function( id, successCallback ) {
		$.ajax({
			url: that.baseURL + that.table + "/" + id,
			dataType: "json",
			type: "POST",
			processData: false,
			contentType: "application/json",
			beforeSend: function(xhr)   
			{
				xhr.setRequestHeader("X-Http-Method-Override", "DELETE");
			},
			success: function( data, status, xhr ) {
				that.flash.notice = xhr.getResponseHeader("X-Flash-Notice");
				that.flash.error = xhr.getResponseHeader("X-Flash-Error");
				that.flash.warning = xhr.getResponseHeader("X-Flash-Warning");
				that.flash.message = xhr.getResponseHeader("X-Flash-Message");
				
				if ( typeof( successCallback ) === 'function' ) {
					successCallback( data, status, xhr );
				}
			}
		});

	};

	return that;
};

var List = Controller({
	table: 'lists',
	model: 'list'
});