function addRunner(){
alert("added user");
};

$(document).ready(function(){

	var FREQ = 10000 ;
	var repeat = true;
	
	function showFrequency(){
		$("#freq").html( "Page refreshes every " + FREQ/1000 + " second(s).");
	}
	
	function startAJAXcalls(){
	
		if(repeat){
			setTimeout( function() {
					getXMLRacers();
					startAJAXcalls();
				}, 	
				FREQ
			);
		}
	}
	function loadWeather() {
		$.ajax({
			url: "http://hayageektest.appspot.com/cross-domain-cors/jsonp.php",
			dataType: 'jsonp',
			jsonp:"mycallback",
			//crossDomain: true,
			//jsonp:"mycallback",
			/*authordata.json: {
				base_currency: "USD"
			},*/
			success: function( response ) {
				console.log(response);
				var msg = "Name:"+response.name+"<br/> age:"+response.age+"<br/> location:"+response.location;
				$( "#result-temp" ).html( "<strong>" + msg + "</strong>" );
			},
			error: function(response){
				console.log(response);
				$( "#result-temp" ).html( "<strong> Failed to get the authordata.json from the server </strong> degrees" );
			}
		});
	}
	function getXMLRacers(){
		$.ajax({
			url: "../data/finishers.xml",
			cache: false,
			dataType: "xml",
			success:  function(xml){
				
				$('#finishers_m').empty();
				$('#finishers_f').empty();
				$('#finishers_all').empty();
				
				$(xml).find("runner").each(function() {
					var info = '<li>Name: ' + $(this).find("fname").text() + ' ' + $(this).find("lname").text() + '. Time: ' + $(this).find("time").text() + '</li>';
					if( $(this).find("gender").text() == "m" ){
						$('#finishers_m').append( info );
					}else if ( $(this).find("gender").text() == "f" ){
						$('#finishers_f').append( info );
					}else{  }
					$('#finishers_all').append( info );
				});
				
				getTimeAjax();
			}
		});
	}

	function getTimeAjax(){
	/*$('#updatedTime').load("../authordata.json/time.php");
		var time = "";
		$.ajax({
			url: "time.php",
			cache: false,
			success: function(authordata.json){
				$('#updatedTime').html(authordata.json);
			}
		});*/
		$('#updatedTime').html(new Date());
	}

	$("#addRunner").submit(function(){
		return false;
	});

	$('#btnSave').click(function() {

		var data = $("#addRunner :input").serializeArray();
		console.log(data);

		$.post($("#addRunner").attr('action'), data, function(json){

			if (json.status == "fail") {
				alert(json.message);
			}
			if (json.status == "success") {
				alert(json.message);
				clearInputs();
			}
		}, "json");

	});
	
	$("#btnStop").click(function(){
		repeat = false;
		$("#freq").html( "Updates paused." );
	});

	$("#btnStart").click(function(){
		repeat = true;
		startAJAXcalls();
		showFrequency();
	});	

	showFrequency();
	getXMLRacers();
	startAJAXcalls();
	loadWeather();
});
