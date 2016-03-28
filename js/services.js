var serviceURL = "http://happ.phpzeal.com/services/";
//var serviceURL = "http://localhost/h_app/services/";

var version = "1.0";
var appname = "H App";
localStorage.setItem("session_version", version);

function Login()
{
	if(localStorage.getItem("session_id_local") == undefined)
	{
		$.mobile.changePage( "#login",null, true, true);
	}else
	{
		$.mobile.changePage( "#main",null, true, true);
	}
}

function LogOut()
{
	localStorage.removeItem("session_id_local");
	localStorage.removeItem("session_name");
	localStorage.removeItem("session_org_name");
	localStorage.removeItem("session_validity");
	localStorage.removeItem("session_id_email_id");
	
	$.mobile.loading( 'show', {
		text: 'Logging Out ...',
		textVisible: true,
		theme: 'a',
		html: ""
	});	
	
	$.mobile.changePage( "#beforelogin",null, true, true);
	$("#app-status-ul").html('');
	$("#app-status-ul2").html('');
}

function ShowHome()
{	
	if(localStorage.session_id_local == undefined)
	{
		//alert('1');
		$.mobile.changePage( "#beforelogin",null, true, true);
	}else
	{
		//alert('test');
		//name = localStorage.session_name;
		//balance = localStorage.session_id_balance;
		//alert(name);
		$.mobile.changePage( "#main",null, true, true);	
		$("#welcome_message").html('');
		//$("#welcome_message").append("<li>Welcome " + name + "</li>").listview("refresh");
		//$("#welcome_message").append("<li>Balance: Rs " + balance + "</li>").listview("refresh");				
		//$("#welcome_message").append("<li>Validity: " + dt2 + "</li>").listview("refresh");
		//$("#welcome_message").append('').listview("refresh");
	}
}

function ShowHome2()
{	
	if(localStorage.session_id_local == undefined)
	{
		$.mobile.changePage( "#beforelogin",null, true, true);
	}else
	{
		//alert('test');
		name = localStorage.session_name;
		balance = localStorage.session_id_balance;
		mem_photo = localStorage.session_id_mem_photo;
		//alert(name);
		$.mobile.changePage( "#main",null, true, true);	
		$("#welcome_message").html('');
		$("#welcome_message").append("<li>Welcome " + name + "</li>").listview("refresh");
		$("#welcome_message").append("<li><center><img height=\"100\" src=\"" + mem_photo + "\"></center></li>").listview("refresh");
		$("#welcome_message").append("<li>Balance: Rs " + balance + "</li>").listview("refresh");
		
		//$("#welcome_message").append("<li>Validity: " + dt2 + "</li>").listview("refresh");
		//$("#welcome_message").append('').listview("refresh");
	}
}

$(document).on('pageinit', '#beforelogin', function()
{  
	$(document).on('click', '#submit_login', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');
			//alert(localStorage.device_uuid);
			  //document.getElementById("l_device_platform").value = localStorage.device_platform;
			  //document.getElementById("l_device_uuid").value = localStorage.device_uuid;
			  //document.getElementById("l_device_browser").value = localStorage.device_browser;		
			  
			 // alert($('#lform').serialize());
			username = document.getElementById("username").value;
			//password = document.getElementById("password").value;
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			//alert(username);
			//alert(password);

			//return false;
		  
			//if($('#username').val().length > 0 && $('#password').val().length > 0)
			if($('#username').val().length > 0)
			{
					//alert(localStorage.getItem("session_id_local"));
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Checking Login ...',
						textVisible: true,
						theme: 'a',
						html: ""
					});	
					
					//alert(serviceURL);
					url = serviceURL + 'pre_login/1';
					//alert(url);//return false;
					
					$.ajax({url: url,
						data: {membership_id: username, device_id: device_id, device_platform: device_platform, device_browser: device_browser, ver: session_version},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							if(result.status == 'success') 
							{
								$.mobile.loading( "hide" );
								//alert('ok');
								//alert(result.status);
								//alert(result.message);
								$.mobile.changePage( "#login",null, true, true);
								//return false;
								//alert(username);
								$('#username2').val(username);
								showMessage(result.message,null,appname,'OK');
								
							} else 
							{
								//alert(result.message);
								$.mobile.loading( "hide" );								
								showMessage(result.message,null,appname,'OK');
								//alert('Logon unsuccessful!');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
							$.mobile.loading( "hide" );	
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$( "[data-role='navbar']" ).navbar();
					//$( "[data-role='header'], [data-role='footer']" ).toolbar();
					//$( "[data-role='footer']" ).toolbar( "refresh" );
					
					$.fixedToolbars.show();
					//$.mobile.loading( "show" );
						
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

$(document).on('pageinit', '#login', function()
{  
	$(document).on('click', '#submit_login2', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');
			//alert(localStorage.device_uuid);
			  //document.getElementById("l_device_platform").value = localStorage.device_platform;
			  //document.getElementById("l_device_uuid").value = localStorage.device_uuid;
			  //document.getElementById("l_device_browser").value = localStorage.device_browser;		
			  
			 // alert($('#lform').serialize());
			username = document.getElementById("username2").value;
			password = document.getElementById("password").value;
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			//alert(username);
			//alert(password);

			//return false;
		  
			if($('#username2').val().length > 0 && $('#password').val().length > 0)
			{
					//alert(localStorage.getItem("session_id_local"));
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Checking Login ...',
						textVisible: true,
						theme: 'a',
						html: ""
					});	
					
					//alert(serviceURL);
					url = serviceURL + 'login/1';
					//alert(url);//return false;
					
					$.ajax({url: url,
						data: {membership_id: username, otp: password, device_id: device_id, device_platform: device_platform, device_browser: device_browser, ver: session_version},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							if(result.status == 'success') 
							{
								$.mobile.loading( "hide" );
								//alert('ok');
								//alert(result.status);
								//alert(result.message);
								//alert(result.data.name);
								//alert(result.data.email);
								//alert(result.data.mobileno);
								//alert(result.data.mem_validity);
								//alert(result.data.balance);
								session_id = result.data.session_id;
								//alert(result.data.session_id);
								//alert(Object.keys(result.data.session_id).length);
								//docname = result[0].tender_doc_file[j].doc_type;
								
								var dt = result.data.mem_validity;
								var dd = dt.substring(8, 10);
								var mm = dt.substring(5, 7);
								var yy = dt.substring(0, 4);
								
								var dt2 = dd + "-" + mm + "-" +yy;
								var d = new Date();
								var d2 = new Date(yy,Number(mm)-1,Number(dd));
								
								d.setHours(0);
								d.setMinutes(0, 0, 0);
								d2.setHours(0);
								d2.setMinutes(0, 0, 0);
								var datediff = Math.abs(d.getTime() - d2.getTime()); // difference 
								var diff2= parseInt(datediff / (24 * 60 * 60 * 1000), 10); 
								//alert(result.name);
								//alert(dt2);return false;
								
								//$.mobile.changePage( "#beforelogin",null, true, true);
								//return false;
								localStorage.setItem("session_id_username", username);
								localStorage.setItem("session_id_local", session_id);
								localStorage.setItem("session_name", result.data.name);
								localStorage.setItem("session_mobileno", result.data.mobileno);
								localStorage.setItem("session_validity", result.data.mem_validity);
								localStorage.setItem("session_id_email_id", result.data.email);
								localStorage.setItem("session_id_balance", result.data.balance);
								localStorage.setItem("session_id_mem_photo", result.data.mem_photo);
								
								//alert(result.email_id);
								//$.mobile.changePage("#second");                         
								
								//alert(result.message);

								$.mobile.changePage( "#main",null, true, true);
								$("#welcome_message").html('');
								$("#welcome_message").append("<li>Welcome " + result.data.name + "</li>").listview("refresh");
								//$("#welcome_message").append("<li>Validity: " + dt2 + "</li>").listview("refresh");
	
								$("#welcome_message").append("<li><center><img height=\"100\" src=\"" + result.data.mem_photo + "\"></center></li>").listview("refresh");	
								$("#welcome_message").append("<li>Balance: Rs " + result.data.balance + "</li>").listview("refresh");
								
								if(diff2>0 && diff2<=30)
								{
									username = localStorage.session_id_username;
									//alert('<li><a href="#" onclick="Renew(' + "'" + username + "'" + ');return false;">' + "Renew Subscription" +'</a> </li>');
									//$("#welcome_message").append('<li><a href="#" onclick="Renew(' + "'" + username + "'" + ');return false;">' + "Renew Subscription" +'</a> </li>').listview("refresh");
								}									
								showMessage(result.message,null,'Welcome','OK');
								
							} else 
							{
								//alert(result.message);
								$.mobile.loading( "hide" );								
								showMessage(result.message,null,result.message,'OK');
								//alert('Logon unsuccessful!');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
							$.mobile.loading( "hide" );	
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$( "[data-role='navbar']" ).navbar();
					//$( "[data-role='header'], [data-role='footer']" ).toolbar();
					//$( "[data-role='footer']" ).toolbar( "refresh" );
					
					$.fixedToolbars.show();
					//$.mobile.loading( "show" );
						
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

function ListServices()
{	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local;
	//alert(searchparam);
	//return false;
	//http://localhost/h_app/services/list_services/1?session=HA90d272cbeaeb394e04d14b73045bb7eec92145c8
	url = serviceURL + 'list_services/1'
	
	//alert(url);
	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Getting Services ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		//alert(result.status);
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
			$.mobile.changePage( "#search_result_afterlogin_prebook",null, true, true);
			$("#sum_list_afterlogin_book").html('');
			$("#card1").html('');
			
				for(i=0; i<Object.keys(result.data.service).length; i++)
				{
					service_id = result.data.service[i].service_id;
					service_name = result.data.service[i].service_name;
					service_logo = result.data.service[i].service_logo;
					s_validity = result.data.service[i].s_validity;
					//chargeable = result.data.service[i].chargeable;
					charges = result.data.service[i].charges;
					guest_charges = result.data.service[i].guest_charges;
					
					comments = result.data.service[i].comments;
					chargeable = '';
					
					img = '<img src="' + service_logo + '" height="50">';
					plus = '<img src="images/' + 'plus-outline.png' + '" height="24">';
					minus = '<img src="images/' + 'minus-outline.png' + '" height="24">';
					
					select = '<select name="dropdown"><option value="0" selected>0</option><option value="1">1</option><option value="2">2</option></select>';
					
					console.log(service_name);
					console.log(img);
					console.log(charges);
					
					console.log("<li><a href=\"#\" onclick=\"SetBookID(" + service_id + ",'" + service_name + "','" + chargeable + "'," + charges + ");return false;\">" + img + " " + service_name + "<br> Rs " + charges  + "</a></li>");
					
					//$("#sum_list_afterlogin_book").append("<li><a href=\"#\" onclick=\"SetBookID(" + service_id + ",'" + service_name + "','" + chargeable + "'," + charges + ");return false;\">" + img + " " + service_name + "<br> Rs " + charges  + "</a></li>").listview("refresh");
					
					//alert();
					
					$("#sum_list_afterlogin_prebook").append("<li><a href=\"#\" onclick=\"SetBookOption(" + service_id + ",'" + service_name + "','" + chargeable + "','" + charges + "','" + guest_charges + "','" + service_logo + "'"+ ");return false;\">" + img + " " + service_name + "<br>Member: Rs " + charges + "<br>Guest: Rs " + guest_charges + "</a></li>").listview("refresh");
					
					//alert('<div class="card"><div class="card-image"><img alt="home" src="' + service_logo + '" /><h2>' + service_name + '</h2></div><h3>Member: Rs ' + charges + '<br>Guest: Rs ' + guest_charges + '</h3><p>' + urldecode(comments) + '</p>' + '<p><button onclick="alert(' +   "'anil'" +    ');">Test</button></p>' + '</div>');
					//return false;
					
					$("#card1").append('<div class="card"><div class="card-image"><img alt="home" src="' + service_logo + '" /><h2>' + service_name + '</h2></div><h3>Member: Rs ' + charges + '<br>Guest: Rs ' + guest_charges + '</h3><p>' + urldecode(comments) + "<button onclick=\"SetBookOption(" + service_id + ",'" + service_name + "','" + chargeable + "','" + charges + "','" + guest_charges + "','" + service_logo + "'"+ ");return false;\">Book</button>" + '</p>' + '</div>');
					
					//'<p><button onclick="alert(' +   "'anil'" +    ');">Book</button></p>'
					//$("#sum_list_afterlogin_book").append("<li>Guest: " + plus + " 0 " + minus + " </li>").listview("refresh");		
					//$("#sum_list_afterlogin_book").append("<li>Guest: " + select + "</li>").listview("refresh");						
					//$("#sum_list_afterlogin_book").append("<li>" +  img + " " + service_name + "<br> Rs " + charges + "</li>").listview("refresh");
										
					//console.log(result[0][i].Location);
					
					//$("#sum_list_afterlogin_book").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
				}

		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		//alert(result.status);
		alert(error);
		alert(request[0]);
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function SetBookID(service_id,service_name,chargeable,charges)
{
	//alert(service_id);
	//alert(service_name);
	//alert(chargeable);
	//alert(charges );
	$("#priceid").html('Rs ' + charges);
	$("#service_id").val(service_id);
	$("#service_name").val(service_name);
	$("#chargeable").val(chargeable);
	$("#charges").val(charges);
}

function BookServices()
{		
	service_id = $("#service_id").val();
	charges = $("#charges").val();
	chargeable = $("#chargeable").val();
	service_name = $("#service_name").val();
	member = $("#member").val();
	guest = $("#guest").val();
	total_charge = $("#total_charge").val();
	court_id = $("#court_id").val();
	slot_id = $("#slot_id").val();
	date_book = $("#date_book").val();

	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local + "&service_id="+ service_id +  "&member="+ member + "&guest="+ guest  + "&dod="+ date_book  + "&court="+ court_id + "&timing="+ slot_id;
	
	//&member=1&guest=1&dod=2016-11-11&court=1&timing=10:10;
	//alert(searchparam);
	
	//else if(total_charge <= 0)
	//{
		//alert('Please select service before clicking on book');
	//	showMessage('Please select number of member before clicking on book',null,'Error','OK');
	//	return false;
	//}
	//alert(member);
	//alert(total_charge);
	if(member <= 0)
	{
		//alert('Please select service before clicking on book');
		showMessage('Please select number of member before clicking on book',null,'Error','OK');
		return false;
	}
	//alert($("#cdown").val());
	
	if($("#court_id").val() == '1')
	{
		if($("#cdown").val() == 0)
		{
			//alert('Please select service before clicking on book');
			showMessage('Please select Court',null,'Error','OK');
			return false;
		}
	}
	if($("#slot_id").val() == '1')
	{
		if($("#tsdown_1").val() == 0)
		{
			//alert('Please select service before clicking on book');
			showMessage('Please select timing',null,'Error','OK');
			return false;
		}
	}
	
	alert("total_charge " + total_charge);
	//return false;
	//http://localhost/h_app/services/deduct_wallet/1?session=HA2762630b44f339a768eacc488029ef4d4943a83d&service_id=1
	//http://localhost/h_app/services/deduct_wallet_new/1?session=HA2762630b44f339a768eacc488029ef4d4943a83d&service_id=1&member=1&guest=1&dod=2016-11-11&court=1&timing=10:10
	

	url = serviceURL + 'deduct_wallet_new/1'
	
	//alert(url);
	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Booking Service ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			ShowHome2();
			showMessage(result.message,null,appname,'OK');
			
			//alert(result.data.balance);
			console.log(result.message);
			localStorage.setItem("session_id_balance", result.data.balance);
			
			//ListTicket(1);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			
	
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function ChangeMG()
{
	//alert('hi');
	mcount = $("#mgcount1").val();
	gcount = $("#mgcount2").val();
	//alert(mcount);
	//alert(gcount);
	
	$("#member").val(mcount);
	$("#guest").val(gcount);
	
	total = ($("#charges").val() * mcount) + ($("#guest_charges").val() * gcount);
	//alert(total);
	$("#priceid").html('Rs ' + total);
	
	$("#total_charge").val(total);
}

function ChangeCourt()
{
	cdown = $("#cdown").val();
	//gcount = $("#mgcount2").val();
	//alert(cdown);
	
	tsdown = $("#tsdown").val();
	//alert(tsdown);
	var divided = cdown.split(":");
	var name=divided[0];
	//var street = divided[1];
	//alert("court no " + name);
	
	$('#tsdown option').each(function(index,element)
	{
	 console.log(index);
	 console.log(element.value);
	 console.log(element.text);
	 var divided2 = element.value.split(":");
	 var name2=divided2[0];
	 var name3=divided2[1];
	 
		//alert(element.text);
	    //alert(element.value + " : " + element.text);
		//alert(name2);
	
	 $('#tsdown_1').empty();
	 $('#tsdown_1').append( new Option('Select Timing','0') );
	 if(name == name2)
	 {
		 // alert("for this: " + element.value + " : " + element.text);
		  //alert(name3);
		  $('#tsdown_1').append( new Option(element.text,name3) );
	 }
	 });		

	
}

function SetBookOption(service_id,service_name,chargeable,charges, guest_charges, service_logo)
{
	//alert(service_id);
	//alert(service_name);
	//alert(chargeable);
	//alert(charges );
	var selectcourt1 = '<select name="cdown" id="cdown" onchange="ChangeCourt();" data-native-menu="true"><option value="0" selected>Select Court</option>';
	var selectcourt2 = '';
	var selectcourt = '';

	var selectts1 = '<select name="tsdown" id="tsdown"><option value="0" selected>Select Timing</option>';
	var selectts2 = '';
	var selectts = '';
	
	var selectts1_1 = '<select name="tsdown_1" id="tsdown_1"><option value="0" selected>Select Timing</option>';
	var selectts2_1 = '';
	var selectts_1 = '';

	var selectts1_2 = '<select name="tsdown_2" id="tsdown_2"><option value="0" selected>Select Timing</option>';
	var selectts2_2 = '';
	var selectts_2 = '';	
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local + "&service_id="+ service_id;
	
	url = serviceURL + 'service_prop/1';
	
	//alert(url);
	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Booking Service ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//alert('ok');
			//showMessage(result.message,null,appname,'OK');
			//alert(result.data.balance);
			console.log(result.message);
			//localStorage.setItem("session_id_balance", result.data.balance);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert('ok');
			//	selectcourt = '<select name="dropdown"><option value="0" selected>Court 1</option><option value="2">Court 2</option></select>';
			
			message = result.message;

			for(i=0; i<Object.keys(result.data.service).length; i++)
			{
				service_id = result.data.service[i].service_id;
				booking_allowed = result.data.service[i].booking_allowed;
				//alert(booking_allowed);
			}
			if(booking_allowed == 0)
			{
				alert(message);
				//showMessage(result.message,null,'Error','OK');
				return false;
			}
			//alert(selectcourt1);
			for(i2=0; i2<Object.keys(result.data.court).length; i2++)
			{
				court_id = result.data.court[i2].court_id;
				court_name = result.data.court[i2].court_name;
				court_capacity = result.data.court[i2].court_capacity;
				//alert(court_id);
				//alert(court_name);
				//alert(court_capacity);
				selectcourt2 = selectcourt2 + '<option value="' + court_id + ':' + court_capacity + '">' + court_name + '</option>';
				//'<option value="' + '" selected>' + court_name + '</option>'
				//alert(selectcourt2);
				
			}
			if(i2>0)
			{
				$("#court_id").val(1);
			}
			selectcourt = selectcourt1 + selectcourt2 + '</select>';
			//alert(selectcourt2);
			//alert(selectcourt);
			
			for(i3=0; i3<Object.keys(result.data.slots).length; i3++)
			{
				court_id3 = result.data.slots[i3].court_id;
				timesl_id = result.data.slots[i3].timesl_id;
				timing = result.data.slots[i3].timing;
				//alert(court_id);
				//alert(court_name);
				//alert(court_capacity);
				//selectts2 = selectts2 + '<option value="' + court_id3 + '">' + timing + '</option>';
				selectts2 = selectts2 + '<option value="' + court_id3 + ':' + timesl_id + '">' + timing + '</option>';

				//'<option value="' + '" selected>' + court_name + '</option>'
				//alert(selectcourt2);
				
			}
			if(i3>0)
			{
				$("#slot_id").val(1);
			}
			selectts = selectts1 + selectts2 + '</select>';
			selectts1_1 = selectts1_1 + '</select>';
			selectts1_2 = selectts1_2 + '</select>';
			//alert(selectts);
			//alert(selectts1_1);
			
			//alert('ok2');
			var courtpar = '';
			var timing_par = '';
			if(i2>0) // court
			{
				var courtpar = "Court: " + selectcourt + "<br>";
			}
			if(i3>0) // slot
			{
				var timing_par = "Timing: " + selectts1_1 + "<br>";
			}
			para = selectts + courtpar + timing_par + "Member: " + select + "<br>Guest: " + select2;
				//$("#cdown").selectmenu('refresh', true);

			$("#sum_list_afterlogin_book").append("<li><p>" + para + "</p>").listview("refresh");
			
			//$("#cdown").selectmenu('refresh');
			//$("#cdown").selectmenu('refresh', true);
			

			
			
			$("#tsdown").hide();
			//alert(selectcourt);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
				
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});       
	
	$.mobile.changePage( "#search_result_afterlogin_book",null, true, true);
	$("#sum_list_afterlogin_book").html('');
						
	img = '<img src="' + service_logo + '" height="50">';
	plus = '<img src="images/' + 'plus-outline.png' + '" height="24">';
	minus = '<img src="images/' + 'minus-outline.png' + '" height="24">';
	
	select = '<select name="mgcount1" id="mgcount1" onchange="ChangeMG();"><option value="0" selected>0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>';
	
	select2 = '<select name="mgcount2" id="mgcount2" onchange="ChangeMG();"><option value="0" selected>0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>';

	selectdate = '<select name="dropdown"><option value="0" selected>Today</option><option value="2">07-Mar-2016</option><option value="8">08-Mar-2016</option></select>';
	
	//selectcourt = '<select name="dropdown"><option value="0" selected>Court 1</option><option value="2">Court 2</option></select>';

	selecttiming = '<select name="dropdown"><option value="0" selected>10:30 to 11:10 AM</option><option value="2">11:10 to 11:50 AM</option><option value="3">11:50 to 12:30 AM</option></select>';
	
	
	console.log(service_name);
	console.log(img);
	console.log(charges);
	
	console.log("<li><a href=\"#\" onclick=\"SetBookID(" + service_id + ",'" + service_name + "','" + chargeable + "'," + charges + ");return false;\">" + img + " <h2>" + service_name + "</h2><br> Rs " + charges  + "</a></li>");
	
	//$("#sum_list_afterlogin_book").append("<li><a href=\"#\" onclick=\"SetBookID(" + service_id + ",'" + service_name + "','" + chargeable + "'," + charges + ");return false;\">" + img + " " + service_name + "<br> Rs " + charges  + "</a></li>").listview("refresh");
	
	//$("#sum_list_afterlogin_book").append("<li><a href=\"#\" onclick=\"SetBookOption(" + service_id + ",'" + service_name + "','" + chargeable + "'," + charges + ");return false;\">" + img + " " + service_name + "<br> Rs " + charges  + "</a></li>").listview("refresh");
	
	//$("#sum_list_afterlogin_book").append("<li>Guest: " + plus + " 0 " + minus + " </li>").listview("refresh");		
	
	aa = '<div class="ui-grid-b">    <div class="ui-block-a"><div class="ui-bar ui-bar-a" >Block A</div></div>    <div class="ui-block-b"><div class="ui-bar ui-bar-a" >Block B</div></div>    <div class="ui-block-c"><div class="ui-bar ui-bar-a">Block C</div></div></div>';

	//$("#sum_list_afterlogin_book").append(aa).listview("refresh");

	$("#sum_list_afterlogin_book").append("<li>" +  img + " " + service_name + "<br><p >Member: Rs " + charges + "<p >Guest: Rs " + guest_charges + "</p></li>").listview("refresh");
	
	//$("#cdown").trigger("change");
	//$("#sum_list_afterlogin_book").append("<form><div class=\"ui-field-contain\"><label for=\"select-native-1\">Basic:</label><select name=\"select-native-1\" id=\"select-native-1\"> <option value=\"4\">The 4th Option</option></select></div></form>");

	//if(service_name == 'Swimming')
	//{
	//	para = "Member: " + select + "<br>Guest: " + select2;
	//}else if(service_name == 'Steam')
	//{
	//	para = "Date: " + selectdate + "<br>Member: " + select + "<br>Guest: " + select;
	//}else
	//{
	//	para = "Date: " + selectdate + "<br>Court: " + selectcourt + "<br>Timing: " + selecttiming + "<br>Member: " + select + "<br>Guest: " + select2;
	//}
	
	//para =  "Member: " + select + "<br>Guest: " + select2;
	//$("#sum_list_afterlogin_book").append("<li><p>" + para + "</p>").listview("refresh");
	
	//$("#sum_list_afterlogin_book").append("<li><p>Date: " + selectdate + "</p>").listview("refresh");						
	//$("#sum_list_afterlogin_book").append("<p>Court: " + selectcourt + "</p>").listview("refresh");						
	//$("#sum_list_afterlogin_book").append("<p>Timing: " + selecttiming + "</p>").listview("refresh");						
	//$("#sum_list_afterlogin_book").append("<p>Guest: " + select + "</p></li>").listview("refresh");						
	
	//console.log(result[0][i].Location);
	
	//$("#sum_list_afterlogin_book").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
					
	//$("#priceid").html('Rs ' + charges);
	$("#service_id").val(service_id);
	$("#service_name").val(service_name);
	$("#chargeable").val(chargeable);
	$("#charges").val(charges);
	$("#guest_charges").val(guest_charges);
	$("#member").val(0);
	$("#guest").val(0);
	$("#total_charge").val(0);
	$("#priceid").html('');
}

function ListTicket(last)
{		
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/list_ticket/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	url = serviceURL + 'list_ticket/1'
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Listing Ticket ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
			$.mobile.changePage( "#search_result_afterlogin_list",null, true, true);
			$("#sum_list_afterlogin_list").html('');
			
			if(last == '1')
			{
					service_id = result.data.service[0].service_id;

					service_name = result.data.service[0].service_name;
					sticket_id = result.data.service[0].sticket_id;
					ticket_no = result.data.service[0].ticket_no;
					service_logo = result.data.service[0].ticket_logo;
					s_validity = result.data.service[0].s_validity;
					chargeable = result.data.service[0].chargeable;
					//charges = result.data.service[0].charges;
					comments = result.data.service[0].comments;
					datec = result.data.service[i].datec;
					service_date = result.data.service[i].service_date;
					service_slot = result.data.service[i].service_slot;
					service_court = result.data.service[i].service_court;
					ticket_type = result.data.service[i].ticket_type;
					extra_info = result.data.service[i].extra_info;
					
					ticket_url = serviceURL + 'genqr?ticket_no=' + sticket_id;
					//ticket_url = '';
					img = '<img src="' + ticket_url + '" >';
					console.log(service_name);
					console.log(img);
					//alert(service_name);
					//console.log(charges);
					//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
					
					//alert('generating qr code');
					//TicketID(ticket_no);
					
					$("#sum_list_afterlogin_list").append("<li><center>Service: " +  service_name + "<br>Booking Date: " + datec + "<br>Validity: " + s_validity + "<br><br>" + img + "</center></li>").listview("refresh");
					$("#sum_list_afterlogin_list").append("<li><center><img height=\"100\" src=\"" + localStorage.session_id_mem_photo + "\"></center></li>").listview("refresh");					
			}
			else
			{
				for(i=0; i<Object.keys(result.data.service).length; i++)
				{
					service_id = result.data.service[i].service_id;
					service_name = result.data.service[i].service_name;
					service_logo = result.data.service[i].ticket_logo;
					s_validity = result.data.service[i].s_validity;
					sticket_id = result.data.service[i].sticket_id;
					ticket_no = result.data.service[i].ticket_no;
					chargeable = result.data.service[i].chargeable;
					//charges = result.data.service[i].charges;
					comments = result.data.service[i].comments;
					datec = result.data.service[i].datec;
					service_date = result.data.service[i].service_date;
					service_slot = result.data.service[i].service_slot;
					service_court = result.data.service[i].service_court;
					ticket_type = result.data.service[i].ticket_type;
					extra_info = result.data.service[i].extra_info;
					
					ticket_url = serviceURL + 'genqr?ticket_no=' + sticket_id;
					//ticket_url = '';
					img = '<img src="' + ticket_url + '" >';
					console.log(ticket_url);
					console.log(img);
					//service_name,datec,s_validity
					console.log("<li><a href=\"#\" onclick=\"TicketID(" + "'" + sticket_id + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "'" + ");return false;\">" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "</a></li>");
					
					if(extra_info == '1')
					{
						info1 = service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Timing: " + service_slot + "<br>Court: " + service_court + "<br>Ticket Type: " + ticket_type + "<br>Validity: " + s_validity ;
					}else
					{
						info1 = service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Ticket Type: " + ticket_type + "<br>Validity: " + s_validity ;
					}
					clickinfo =  "'" + sticket_id + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "', '" + service_date+ "','" + service_slot+ "','" + service_court+ "','" + ticket_type + "','" + extra_info + "'";
					//alert(clickinfo);
					
					$("#sum_list_afterlogin_list").append("<li><a href=\"#\" onclick=\"TicketID(" + clickinfo  + ");return false;\">" + info1 + "</a></li>").listview("refresh");
					//$("#sum_list_afterlogin_list").append("<li>" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "<br>" + "</li>").listview("refresh");
										
					//console.log(result[0][i].Location);
					
					//$("#sum_list_afterlogin_list").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
				}
				if(i == 0)
				{
					//alert('no ticket');
					$("#sum_list_afterlogin_list").append("<li><center>Active Ticket is not available.</center></li>").listview("refresh");
				}
			}

		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function TransTicket()
{		
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/trans_history/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	url = serviceURL + 'trans_history/1'
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Listing Transaction History ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
			$.mobile.changePage( "#search_result_afterlogin_list",null, true, true);
			$("#sum_list_afterlogin_list").html('');
			
			for(i=0; i<Object.keys(result.data.service).length; i++)
			{
				service_id = result.data.service[i].service_id;
				service_name = result.data.service[i].service_name;
				service_logo = result.data.service[i].ticket_logo;
				s_validity = result.data.service[i].s_validity;
				sticket_id = result.data.service[i].sticket_id;
				ticket_no = result.data.service[i].ticket_no;
				chargeable = result.data.service[i].chargeable;
				//charges = result.data.service[i].charges;
				comments = result.data.service[i].comments;
				datec = result.data.service[i].datec;
				service_date = result.data.service[i].service_date;
				service_slot = result.data.service[i].service_slot;
				service_court = result.data.service[i].service_court;
				ticket_type = result.data.service[i].ticket_type;
				extra_info = result.data.service[i].extra_info;				
				ticket_url = serviceURL + 'genqr?ticket_no=' + sticket_id;
				//ticket_url = '';
				img = '<img src="' + ticket_url + '" >';
				if(extra_info == '1')
				{
					info1 = service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Timing: " + service_slot + "<br>Court: " + service_court + "<br>Ticket Type: " + ticket_type + "<br>Validity: " + s_validity ;
				}else
				{
					info1 = service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Ticket Type: " + ticket_type + "<br>Validity: " + s_validity ;
				}
					
				//alert(service_name);
				console.log(service_name);
				console.log(img);
				//service_name,datec,s_validity
				console.log("<li><a href=\"#\" onclick=\"TicketID(" + "'" + ticket_no + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "'" + ");return false;\">" + service_name + "<br>Booking Date: " + datec + "<br>Validity: " + s_validity + "</a></li>");
				
				$("#sum_list_afterlogin_list").append("<li>" + info1 + "</li>").listview("refresh");
				//$("#sum_list_afterlogin_list").append("<li>" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "<br>" + "</li>").listview("refresh");
									
				//console.log(result[0][i].Location);
				
				//$("#sum_list_afterlogin_list").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
			}
			if(i == 0)
			{
				//alert('no ticket');
				$("#sum_list_afterlogin_list").append("<li><center>Transaction History not available.</center></li>").listview("refresh");
			}
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function TicketID(sticket_id, service_name,datec,s_validity,service_date, service_slot,service_court,ticket_type, extra_info )
{
	//sticket_id + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "', '" + service_date+ "','" + service_slot+ "','" + service_court+ "','" + ticket_type + "','" + extra_info
	//alert('test' + ticket_no);
		//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
		ticket_url = serviceURL + 'genqr?ticket_no=' + sticket_id;
		//ticket_url = '';
		img = '<img src="' + ticket_url + '" >';
		console.log(service_name);
		console.log(img);
		//alert(img);
		//console.log(charges);
		//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
		
		//alert('generating qr code');
		//TicketID(ticket_no);
		
		if(extra_info == '1')
		{
			info2 = "Service: " + service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Timing: " + service_slot + "<br>Court: " + service_court + "<br>Ticket Type: " + ticket_type + "<br>Validity: " + s_validity + "<br>" + img + "</center><hr><center><img height=\"100\" src=\"" + localStorage.session_id_mem_photo
		}else
		{
			info2 = "Service: " + service_name + "<br>Booking Date: " + datec + "<br>Service Date: " + service_date + "<br>Ticket Type: " + ticket_type + "<br>Validity: " + s_validity + "<br>" + img + "</center><hr><center><img height=\"100\" src=\"" + localStorage.session_id_mem_photo
		}		
		//info2 = "Service: " + service_name + "<br> Booking Date: " + datec + "<br>Validity: " + s_validity + "<br>" + img + "</center><hr><center><img height=\"100\" src=\"" + localStorage.session_id_mem_photo;
		
		$.mobile.changePage( "#search_result_afterlogin_list",null, true, true);
		$("#sum_list_afterlogin_list").html('');
			
		$("#sum_list_afterlogin_list").append("<li><center>" + info2 + "\"></center></li>").listview("refresh")		
}

function RechargeHistory()
{		
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/trans_history/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	url = serviceURL + 'recharge_history/1'
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Listing Recharges ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
			$.mobile.changePage( "#search_result_recharge_history",null, true, true);
			$("#sum_list_recharge_history").html('');
			
			for(i=0; i<Object.keys(result.data.service).length; i++)
			{
				tran_amt = result.data.service[i].tran_amt;
				aval_bal = result.data.service[i].aval_bal;
				datec = result.data.service[i].datec;
				comments = result.data.service[i].comments;

				$("#sum_list_recharge_history").append("<li><a href=\"#\">Source: " + comments + "<br> Recharge Date: " + datec + "<br>Amount: Rs " + tran_amt + "</a></li>").listview("refresh");
				//$("#sum_list_recharge_history").append("<li>" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "<br>" + "</li>").listview("refresh");
									
				//console.log(result[0][i].Location);
				
				//$("#sum_list_recharge_history").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
			}
			if(i == 0)
			{
				//alert('no ticket');
				$("#sum_list_recharge_history").append("<li><center>Recharge History not available.</center></li>").listview("refresh");
			}
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function Recharge()
{	
		charges = 100;
		service_id =1;

		$.mobile.changePage("#search_result_afterlogin_recharge",null, true, true);
		$("#sum_list_afterlogin_recharge").html('');
		
		//alert('aa');
		console.log("<li><a href=\"#\" onclick=\"RecharegAmt(" + charges + ");return false;\">" + "<br> Rs " + charges  + "</a></li>");
		$("#sum_list_afterlogin_recharge").append("<li><a href=\"#\" onclick=\"RecharegAmt(" + charges + ");return false;\">" + "<br> Rs " + charges  + "</a></li>").listview("refresh");

		charges = 500;

		$("#sum_list_afterlogin_recharge").append("<li><a href=\"#\" onclick=\"RecharegAmt(" + charges + ");return false;\">" + "<br> Rs " + charges  + "</a></li>").listview("refresh");
		
		charges = 1000;
		$("#sum_list_afterlogin_recharge").append("<li><a href=\"#\" onclick=\"RecharegAmt(" + charges + ");return false;\">" + "<br> Rs " + charges  + "</a></li>").listview("refresh");

}

function RecharegAmt(charges)
{
		$("#priceid_recharge").html('Rs ' + charges);

		$("#rechargeamt").val(charges);
		//alert("recharge with " + charges);
		showMessage("Recharging with " + charges,null,'App','OK');
}

function RechargeFinal()
{		
	rechargeamt = $("#rechargeamt").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local + "&amt="+ rechargeamt;
	//alert(searchparam);
	
	if(rechargeamt == '')
	{
		//alert('Please select amount before clicking on recharge');
		showMessage("Please select amount before clicking on recharge",null,'App','OK');
		return false;
	}else
	{
		//alert('Recharging ');
		showMessage('Recharging ',null,appname,'OK');
		//showMessage("Recharging Wallet ",null,'App','OK');
	}
	//return false;
	//http://localhost/h_app/services/add_wallet/1?session=HA2762630b44f339a768eacc488029ef4d4943a83d&amt=100

	url = serviceURL + 'add_wallet/1'
	
	//alert(url);
	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Recharging ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//alert(result.data.balance);
			//showMessage(result.message,null,'App','OK');
			//showMessage("New Balance: " + result.data.balance,null,'App','OK');
			console.log(result.message);
			localStorage.setItem("session_id_balance", result.data.balance);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			
			$.mobile.changePage( "#search_result_afterlogin_thanks",null, true, true);
			$("#sum_list_afterlogin_thanks").html('');
			$("#sum_list_afterlogin_thanks").append("<li><a href=\"#\">Recharge Done for Rs " + rechargeamt + "</a></li>").listview("refresh");
			$("#sum_list_afterlogin_thanks").append("<li><a href=\"#\">Current Balance: Rs " + result.data.balance + "</a></li>").listview("refresh");

		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        	

}

function CheckBalance()
{		
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/getbalance/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	url = serviceURL + 'getbalance/1'
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Checking Balance ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			localStorage.setItem("session_id_balance", result.data.balance);
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

$(document).on('pageinit', '#freetrial', function()
{  
	$(document).on('click', '#submit_free', function(e) 
	{ // catch the form's submit event

		if(e.handled !== true) // This will prevent event triggering more then once
		{		
			//alert('hi2');
			
			  document.getElementById("f_device_platform").value = localStorage.device_platform;
			  document.getElementById("f_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("f_device_browser").value = localStorage.device_browser;

			if($('#regname').val().length > 0 && $('#regemail').val().length > 0 && $('#org').val().length > 0 && $('#f_regcountry').val().length > 0 && $('#tel').val().length > 0 && document.getElementById("f_chk1").checked == true )
			{
				
					//alert($('#freeform').serialize());
					$.ajax({url: serviceURL + 'freesign.php',
						data: $('#freeform').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							if(result.status) 
							{
								//localStorage.setItem("session_id_local", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								$.mobile.changePage( "#thanks",null, true, true);
								$("#thanks_list").html('');
								$("#thanks_list").append("<li>" + result.message + "</li>").listview("refresh");;

							} else 
							{
								//alert('Technical error in free trial!'); 
								showMessage('Technical error',null,'Error','OK');
								$.mobile.loading( "hide" );	
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$.mobile.loading( "show" );
						
				}           		
		
			e.handled = true;
		}
			return false; // cancel original event to prevent form submitting
    });    
});

$(document).on('pageinit', '#subscribe', function()
{  
	$(document).on('click', '#submit_signup', function(e) 
	{ // catch the form's submit event
			
		if(e.handled !== true) // This will prevent event triggering more then once
		{			
			//alert('hi3');
			//alert($('#s_regname').val());
			//alert($('#s_regemail').val());

			  document.getElementById("s_device_platform").value = localStorage.device_platform;
			  document.getElementById("s_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("s_device_browser").value = localStorage.device_browser;

			  //alert(localStorage.device_uuid);
			  //alert(document.getElementById("s_device_uuid").value);
			  //alert($('#signup_form').serialize());
				if($('#s_regname').val().length > 0 && $('#s_regemail').val().length > 0 && $('#s_add1').val().length > 0 && $('#s_org').val().length > 0 && $('#s_regcountry').val().length > 0 && $('#s_city').val().length > 0  && $('#s_tel').val().length > 0 && document.getElementById("s_chk1").checked == true )
				{
					//alert($('#signup_form').serialize());
					//return false;
					//alert($('#signup_form').serialize());
					$.ajax({url: serviceURL + 'signup.php',
						data: $('#signup_form').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							if(result.status) 
							{
								//localStorage.setItem("session_id_local", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								$.mobile.loading( "hide" );	
								$.mobile.changePage( "#thanks",null, true, true);
								$("#thanks_list").html('');
								$("#thanks_list").append("<li>" + result.message + "</li>").listview("refresh");
								
							} else 
							{
								//alert('Technical error in Signup!'); 
								$.mobile.loading( "hide" );	
								showMessage('Technical error',null,'Error','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$.mobile.loading( "show" );
						
				}  
			
				e.handled = true;
			}			

			return false; // cancel original event to prevent form submitting
    });    
});

function GetProfile()
{
	//alert('get profile');
	if(localStorage.session_id_local == undefined)
	{
		alert("Please login to access this facility");
		return false;
	}
	session_id = localStorage.session_id_local;
	device_id= localStorage.device_uuid;
	device_platform= localStorage.device_platform;
	device_browser= localStorage.device_browser;
	//alert(device_id);
	//alert('hhh');
  		$.ajax({url: serviceURL + 'get_profile.php',
		data: {session_id: session_id, device_id: device_id, device_platform: device_platform, device_browser: device_browser},
		type: 'get',                   
		async: 'true',
		dataType: 'json',
		beforeSend: function() {
			// This callback function will trigger before data is sent
			//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
			//$.mobile.loading( "show" );
			$.mobile.loading( 'show', {
				text: 'Getting Profile ...',
				textVisible: true,
				theme: 'a',
				html: ""
			});
				
		},
		complete: function() {
			// This callback function will trigger on data sent/received complete
		   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
			$.mobile.loading( "hide" );
		},
		success: function (result) {
			if(result.status) 
			{
				//localStorage.setItem("session_id_local", result.session_id);
				//$.mobile.changePage("#second");                         
				//alert(result.message);
				//alert(result.message);

				
				//alert(result.S_ID);
				//alert(result.Total);
				//alert(result[0][0].name);
				//alert(result[0].length);
				//alert(localStorage.session_id_local);
				$.mobile.loading( "hide" );	
				
				if(result.Total >0)
				{
					//alert(result[0][0].name)
					$.mobile.changePage( "#profile",null, true, true);
					
					//$('#pr_regcountry').val($('#pr_regcountry option').eq(IN).val());
					$("#pr_regcountry").val(result[0][0].country);
					$("#pr_regcountry").selectmenu('refresh');
					
					document.getElementById("pr_session_id").value = localStorage.session_id_local;
					document.getElementById("pr_device_platform").value = localStorage.device_platform;
					document.getElementById("pr_device_uuid").value = localStorage.device_uuid;
					document.getElementById("pr_device_browser").value = localStorage.device_browser;						
					
					document.getElementById("pr_regname").value = result[0][0].name;						
					document.getElementById("pr_regemail").value = result[0][0].email_id;						
					document.getElementById("pr_org").value = result[0][0].org_name;						
					document.getElementById("pr_add1").value = result[0][0].add1;						
					document.getElementById("pr_add2").value = result[0][0].add2;						
					document.getElementById("pr_city").value = result[0][0].city;						
					document.getElementById("pr_pincode").value = result[0][0].pincode;						
					//document.getElementById("pr_regcountry").selectedIndex  = result[0][0].country;						
					document.getElementById("pr_tel").value = result[0][0].tel;						
					document.getElementById("pr_url").value = result[0][0].url;						
					document.getElementById("pr_product").value = result[0][0].product_services;						
					document.getElementById("pr_operation").value = result[0][0].area_operation;						
					document.getElementById("pr_user_id").value = result[0][0].user_id;						
						
				
				}else
				{
					//alert(result.message);
					showMessage(result.message,null,'Error','OK');
				}
				//$( ":mobile-pagecontainer" ).pagecontainer( "change", "#second", { role: "page" } );
				//$.mobile.changePage( "panel.html", { transition: "slideup", changeHash: false });
				//$.mobile.changePage( "main.html",null, true, true);
				//$.mobile.changePage( "#main",null, true, true);
			} else 
			{
				//alert(result.message);
				showMessage(result.message,null,'Error','OK');
				//alert('Logon unsuccessful!'); 
			}
		},
		error: function (request,error) {
			// This callback function will trigger on unsuccessful action                
			//alert('Please check your data connection!');
			$.mobile.loading( "hide" );	
			showMessage('Please check your data connection!',null,'Error','OK');
		}
	});    
}

$(document).on('pageinit', '#profile', function()
{  
	$(document).on('click', '#profile_signup', function(e) 
	{ // catch the form's submit event
			
		if(e.handled !== true) // This will prevent event triggering more then once
		{			
			//alert('hi3');
			//alert($('#s_regname').val());
			//alert($('#s_regemail').val());

			  document.getElementById("pr_device_platform").value = localStorage.device_platform;
			  document.getElementById("pr_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("pr_device_browser").value = localStorage.device_browser;

			  //alert(localStorage.device_uuid);
			  //alert(document.getElementById("s_device_uuid").value);
			  //alert($('#signup_form').serialize());
				if($('#pr_regname').val().length > 0 && $('#pr_regemail').val().length > 0 && $('#pr_add1').val().length > 0 && $('#pr_org').val().length > 0 && $('#pr_regcountry').val().length > 0 && $('#pr_city').val().length > 0  && $('#pr_tel').val().length > 0 )
				{
					//alert($('#profile_form').serialize());
					//return false;
					//alert($('#profile_form').serialize());return false;
					$.ajax({url: serviceURL + 'update_profile.php',
						data: $('#profile_form').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							//alert(result.message);
							//alert(result.total);
							//alert(result.status);
							$.mobile.loading( "hide" );	
							if(result.status) 
							{
								//localStorage.setItem("session_id_local", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								
								localStorage.setItem("session_name", $('#pr_regname').val());
								localStorage.setItem("session_org_name", $('#pr_org').val());
								
								$.mobile.changePage( "#thanks_afterlogin",null, true, true);
								$("#thanks_list_afterlogin").html('');
								$("#thanks_list_afterlogin").append("<li>" + result.message + "</li>").listview("refresh");
								
							} else 
							{
								//alert(result.message); 
								showMessage(result.message,null,'Error','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					$.mobile.loading( "hide" );	
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$.mobile.loading( "show" );
						
				}  
			
				e.handled = true;
			}			

			return false; // cancel original event to prevent form submitting
    });    
});

$(document).on('pageinit', '#contact', function()
{  
	$(document).on('click', '#contact_button', function(e) 
	{ // catch the form's submit event
			
		if(e.handled !== true) // This will prevent event triggering more then once
		{			
			//alert('hi3');
			//alert($('#s_regname').val());
			//alert($('#s_regemail').val());

			  document.getElementById("c_username").value = localStorage.session_id_username;
			  document.getElementById("c_device_platform").value = localStorage.device_platform;
			  document.getElementById("c_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("c_device_browser").value = localStorage.device_browser;
			  document.getElementById("c_session_id").value = localStorage.session_id_local;

			  //alert(localStorage.device_uuid);
			  //alert(document.getElementById("s_device_uuid").value);
			  //alert($('#signup_form').serialize());
				if($('#contname').val().length > 0 && $('#cont_email').val().length > 0 && $('#cont_info').val().length > 0 )
				{
					//alert($('#coform').serialize());
					//return false;
					//alert($('#coform').serialize());
					$.ajax({url: serviceURL + 'contact.php',
						data: $('#coform').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							$.mobile.loading( "hide" );	
							if(result.status) 
							{
								//localStorage.setItem("session_id_local", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								$.mobile.changePage( "#thanks_afterlogin",null, true, true);
								$("#thanks_list_afterlogin").html('');
								$("#thanks_list_afterlogin").append("<li>" + result.message + "</li>").listview("refresh");
								
							} else 
							{
								//alert('Technical error in Contacting!'); 
								showMessage('Technical error',null,'Error','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$.mobile.loading( "show" );
						
				}  
			
				e.handled = true;
			}			

			return false; // cancel original event to prevent form submitting
    });    
});

$(document).on('pageinit', '#email_alert', function()
{  
	$(document).on('click', '#email_button', function(e) 
	{ // catch the form's submit event
			
		if(e.handled !== true) // This will prevent event triggering more then once
		{			
			//alert('hi3');
			//alert($('#s_regname').val());
			//alert($('#s_regemail').val());

			  document.getElementById("e_username").value = localStorage.session_id_username;
			  document.getElementById("e_device_platform").value = localStorage.device_platform;
			  document.getElementById("e_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("e_device_browser").value = localStorage.device_browser;
			  document.getElementById("e_session_id").value = localStorage.session_id_local;

			  //alert(localStorage.device_uuid);
			  //alert(document.getElementById("s_device_uuid").value);
			  //alert($('#signup_form').serialize());
				if($('#emlname').val().length > 0 && $('#eml_email').val().length > 0 && $('#eml_days').val().length > 0 )
				{
					//alert($('#emaform').serialize());
					//return false;
					//alert($('#emaform').serialize());
					$.ajax({url: serviceURL + 'emailalert.php',
						data: $('#emaform').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							$.mobile.loading( "hide" );	
							if(result.status) 
							{
								//localStorage.setItem("session_id_local", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								$.mobile.changePage( "#thanks_afterlogin",null, true, true);
								$("#thanks_list_afterlogin").html('');
								$("#thanks_list_afterlogin").append("<li>" + result.message + "</li>").listview("refresh");
								
							} else 
							{
								//alert('Technical error in Email Alert Request!'); 
								showMessage('Technical error',null,'Error','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK'); 
					//$.mobile.loading( "show" );
						
				}  
			
				e.handled = true;
			}			

			return false; // cancel original event to prevent form submitting
    });    
});


function sendID(id)
{
	device_id= localStorage.device_uuid;
	device_platform= localStorage.device_platform;
	device_browser= localStorage.device_browser;
	session_version= localStorage.session_version;
	user_id = localStorage.session_id_username;
	
	$.ajax({url: serviceURL + 'send.php',
		data: {id: id, device_id: device_id, device_platform: device_platform, device_browser: device_browser, user_id: user_id, ver: session_version},
		type: 'post',                   
		async: 'true',
		dataType: 'json',
		beforeSend: function() {
			// This callback function will trigger before data is sent
			//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
			//$.mobile.loading( "show" );
		},
		complete: function() {
			// This callback function will trigger on data sent/received complete
		   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
			//$.mobile.loading( "hide" );
		},
		success: function (result) {
			if(result.status) 
			{
				//alert(result.message);
			} else 
			{
				//alert(result.message);
			}
		},
		error: function (request,error) {
			// This callback function will trigger on unsuccessful action                
			//alert('Please check your data connection!');
			showMessage('Please check your data connection!',null,'Error','OK');
		}
	});                 			
}

function callback(){}

function showMessage(message, callback, title, buttonName)
{

	title = title || "default title";
	buttonName = buttonName || 'OK';

	if(navigator.notification && navigator.notification.alert)
	{

		navigator.notification.alert(
			message,    // message
			callback,   // callback
			title,      // title
			buttonName  // buttonName
		);

	}else
	{
		alert(message);
		callback();
	}
}

function Renew(username)
{
	$.mobile.changePage( "#renewdiaglog", { role: "dialog" } );
	//showMessage('Renewing subscription ' + username ,null,'Error','OK');
	document.getElementById("renew_username").value = localStorage.session_id_username;
	document.getElementById("renew_email_id").value = localStorage.session_id_email_id;
	document.getElementById("renew_name").value = localStorage.session_name;
}

$(document).on('pageinit', '#renewdiaglog', function()
{  
	$(document).on('click', '#renew_login', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');

			 // alert($('#lform').serialize());
			email_id = document.getElementById("renew_email_id").value;
			renew_name = document.getElementById("renew_name").value;
			username = document.getElementById("renew_username").value;
			//alert(name);
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			//alert(username);
			//alert(password);

			//return false;
		  
			if($('#renew_email_id').val().length > 0 && $('#renew_name').val().length > 0)
			{
					//alert("test");
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Sending Request  ...',
						textVisible: true,
						theme: 'a',
						html: ""
					});	
			
					$.ajax({url: serviceURL + 'renew.php',
						data: {username: username, email_id: email_id, name: renew_name, device_id: device_id, device_platform: device_platform, device_browser: device_browser},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							$.mobile.loading( "hide" );	
							if(result.status) 
							{

								$.mobile.loading( "hide" );                    
								$("#renewdiaglog").dialog('close');
								//alert(result.message);
								showMessage(result.message,null,'Tendersinfo','OK');
								
							} else 
							{
								$.mobile.loading( "hide" );  
								//alert("ok");
								
								//$('[data-role=dialog]').dialog( "close" );
								$("#renewdiaglog").dialog('close');
								//alert('Logon unsuccessful!'); 
								showMessage(result.message,null,'Tendersinfo','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$( "[data-role='navbar']" ).navbar();
					//$( "[data-role='header'], [data-role='footer']" ).toolbar();
					//$( "[data-role='footer']" ).toolbar( "refresh" );
					
					//$.fixedToolbars.show();
					//$.mobile.loading( "show" );	
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

function ExitApp()
{
	navigator.app.exitApp();
}

function urldecode(str) {
  //       discuss at: http://phpjs.org/functions/urldecode/
  //      original by: Philip Peterson
  //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      improved by: Brett Zamir (http://brett-zamir.me)
  //      improved by: Lars Fischer
  //      improved by: Orlando
  //      improved by: Brett Zamir (http://brett-zamir.me)
  //      improved by: Brett Zamir (http://brett-zamir.me)
  //         input by: AJ
  //         input by: travc
  //         input by: Brett Zamir (http://brett-zamir.me)
  //         input by: Ratheous
  //         input by: e-mike
  //         input by: lovio
  //      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      bugfixed by: Rob
  // reimplemented by: Brett Zamir (http://brett-zamir.me)
  //             note: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
  //             note: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
  //             note: pages served as UTF-8
  //        example 1: urldecode('Kevin+van+Zonneveld%21');
  //        returns 1: 'Kevin van Zonneveld!'
  //        example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
  //        returns 2: 'http://kevin.vanzonneveld.net/'
  //        example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
  //        returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
  //        example 4: urldecode('%E5%A5%BD%3_4');
  //        returns 4: '\u597d%3_4'

  return decodeURIComponent((str + '')
    .replace(/%(?![\da-f]{2})/gi, function() {
      // PHP tolerates poorly formed escape sequences
      return '%25';
    })
    .replace(/\+/g, '%20'));
}