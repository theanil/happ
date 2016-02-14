//var serviceURL = "http://happ.phpzeal.com/services/";
var serviceURL = "http://localhost/h_app/services/";

var version = "1.0";
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
		//alert(name);
		$.mobile.changePage( "#main",null, true, true);	
		$("#welcome_message").html('');
		$("#welcome_message").append("<li>Welcome " + name + "</li>").listview("refresh");
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
								showMessage(result.message,null,result.message,'OK');
								
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
								
								//alert(result.email_id);
								//$.mobile.changePage("#second");                         
								
								//alert(result.message);

								$.mobile.changePage( "#main",null, true, true);
								$("#welcome_message").html('');
								$("#welcome_message").append("<li>Welcome " + result.data.name + "</li>").listview("refresh");
								//$("#welcome_message").append("<li>Validity: " + dt2 + "</li>").listview("refresh");
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
	//http://localhost/h_app/services/list_services/1?session=HA2762630b44f339a768eacc488029ef4d4943a83d
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
			text: 'Getting Service List ...',
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
			
			$.mobile.changePage( "#search_result_afterlogin_book",null, true, true);
			$("#sum_list_afterlogin_book").html('');
			
				for(i=0; i<Object.keys(result.data.service).length; i++)
				{
					service_id = result.data.service[i].service_id;
					service_name = result.data.service[i].service_name;
					service_logo = result.data.service[i].service_logo;
					s_validity = result.data.service[i].s_validity;
					chargeable = result.data.service[i].chargeable;
					charges = result.data.service[i].charges;
					comments = result.data.service[i].comments;
					
					img = '<img src="' + service_logo + '" height="50">';
					console.log(service_name);
					console.log(img);
					console.log(charges);
					
					console.log("<li><a href=\"#\" onclick=\"SetBookID(" + service_id + ",'" + service_name + "','" + chargeable + "'," + charges + ");return false;\">" + img + " " + service_name + "<br> Rs " + charges  + "</a></li>");
					$("#sum_list_afterlogin_book").append("<li><a href=\"#\" onclick=\"SetBookID(" + service_id + ",'" + service_name + "','" + chargeable + "'," + charges + ");return false;\">" + img + " " + service_name + "<br> Rs " + charges  + "</a></li>").listview("refresh");
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
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_local + "&service_id="+ service_id;
	//alert(searchparam);
	
	if(charges == '')
	{
		//alert('Please select service before clicking on book');
		showMessage('Please select service before clicking on book',null,'Error','OK');
		return false;
	}else
	{
		alert('Booking ' + service_name);
	}
	//return false;
	//http://localhost/h_app/services/deduct_wallet/1?session=HA2762630b44f339a768eacc488029ef4d4943a83d&service_id=1

	url = serviceURL + 'deduct_wallet/1'
	
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
			text: 'Loading Services ...',
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
			alert(result.message);
			//alert(result.data.balance);
			console.log(result.message);
			localStorage.setItem("session_id_balance", result.data.balance);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			ListTicket(1);
	
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
					datec = result.data.service[0].datec;
					comments = result.data.service[0].comments;

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
					
					$("#sum_list_afterlogin_list").append("<li><center>Service: " +  service_name + "<br>Date of Booking: <br>" + datec + "<br>Validity: " + s_validity + "<br><br>" + img + "</center></li>").listview("refresh");
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
					
					ticket_url = serviceURL + 'genqr?ticket_no=' + sticket_id;
					//ticket_url = '';
					img = '<img src="' + ticket_url + '" >';
					console.log(service_name);
					console.log(img);
					//service_name,datec,s_validity
					console.log("<li><a href=\"#\" onclick=\"TicketID(" + "'" + ticket_no + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "'" + ");return false;\">" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "</a></li>");
					
					$("#sum_list_afterlogin_list").append("<li><a href=\"#\" onclick=\"TicketID(" + "'" + ticket_no + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "'" + ");return false;\">" + service_name + "<br>Date of Booking: <br>" + datec + "<br>Validity: " + s_validity + "</a></li>").listview("refresh");
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
				
				ticket_url = serviceURL + 'genqr?ticket_no=' + sticket_id;
				//ticket_url = '';
				img = '<img src="' + ticket_url + '" >';
				console.log(service_name);
				console.log(img);
				//service_name,datec,s_validity
				console.log("<li><a href=\"#\" onclick=\"TicketID(" + "'" + ticket_no + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "'" + ");return false;\">" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "</a></li>");
				
				$("#sum_list_afterlogin_list").append("<li>" + service_name + "<br>Date of Booking: <br>" + datec + "<br>Validity: " + s_validity + "</li>").listview("refresh");
				//$("#sum_list_afterlogin_list").append("<li>" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "<br>" + "</li>").listview("refresh");
									
				//console.log(result[0][i].Location);
				
				//$("#sum_list_afterlogin_list").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
			}
			if(i == 0)
			{
				//alert('no ticket');
				$("#sum_list_afterlogin_list").append("<li><center>Active Ticket is not available.</center></li>").listview("refresh");
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

function TicketID(ticket_no, service_name,datec,s_validity )
{
	//alert('test' + ticket_no);
		//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
		ticket_url = serviceURL + 'genqr?ticket_no=' + ticket_no;
		//ticket_url = '';
		img = '<img src="' + ticket_url + '" >';
		console.log(service_name);
		console.log(img);
		//alert(img);
		//console.log(charges);
		//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
		
		//alert('generating qr code');
		//TicketID(ticket_no);
		
		$.mobile.changePage( "#search_result_afterlogin_list",null, true, true);
		$("#sum_list_afterlogin_list").html('');
			
		$("#sum_list_afterlogin_list").append("<li><center>Service: " + service_name + "<br>Date of Booking: <br>" + datec + "<br>Validity: " + s_validity + "<br><br>" + img + "</center><li>").listview("refresh");
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

				$("#sum_list_recharge_history").append("<li>Source: " + comments + "<br>Date of Recharge: <br>" + datec + "<br>Amount: " + tran_amt + "</li>").listview("refresh");
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
		alert('Recharging ');
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
			$("#sum_list_afterlogin_thanks").append("<li>Recharge Done for Rs " + rechargeamt + "</li>").listview("refresh");
			$("#sum_list_afterlogin_thanks").append("<li>Current Balance: Rs " + result.data.balance + "</li>").listview("refresh");

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