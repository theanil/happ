var serviceURL = "http://www.tendersinfo.com/mapp/";
//var serviceURL = "http://localhost/ti/server/";
var version = "0.91";
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
	
	$.mobile.loading( 'show', {
		text: 'Logging Out ...',
		textVisible: true,
		theme: 'b',
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
		$.mobile.changePage( "#main",null, true, true);	  
	}
}

$(document).on('pageinit', '#login', function()
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
			password = document.getElementById("password").value;
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			//alert(username);
			//alert(password);

			//return false;
		  
			if($('#username').val().length > 0 && $('#password').val().length > 0)
			{
					//alert(localStorage.getItem("session_id_local"));
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Checking Login ...',
						textVisible: true,
						theme: 'b',
						html: ""
					});	
			
					$.ajax({url: serviceURL + 'login.php',
						data: {username: username, password: password, device_id: device_id, device_platform: device_platform, device_browser: device_browser, ver: session_version},
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
								localStorage.setItem("session_id_username", username);
								localStorage.setItem("session_id_local", result.session_id);
								localStorage.setItem("session_name", result.name);
								localStorage.setItem("session_org_name", result.org_name);
								localStorage.setItem("session_validity", result.validity);
								//$.mobile.changePage("#second");                         
								
								//alert(result.message);
								showMessage(result.message,null,'Welcome','OK');
								//$( ":mobile-pagecontainer" ).pagecontainer( "change", "#second", { role: "page" } );
								//$.mobile.changePage( "panel.html", { transition: "slideup", changeHash: false });
								//$.mobile.changePage( "main.html",null, true, true);
								
								dt = result.validity;
								var dd = dt.substring(8, 10);
								var mm = dt.substring(5, 7);
								var yy = dt.substring(0, 4);
								
								var dt2 = dd + "-" + mm + "-" +yy;

								//alert(result.name);
								//alert(dt2);
								$.mobile.changePage( "#main",null, true, true);
								$("#welcome_message").html('');
								$("#welcome_message").append("<li>Welcome - " + result.name + "</li>").listview("refresh");
								$("#welcome_message").append("<li>Validity: " + dt2 + "</li>").listview("refresh");
								
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
							showMessage('Please check your data connection!',null,'Error','OK');
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
								$.mobile.changePage( "#thanks",null, true, true);
								$("#thanks_list").html('');
								$("#thanks_list").append("<li>" + result.message + "</li>").listview("refresh");
								
							} else 
							{
								//alert('Technical error in Signup!'); 
								showMessage('Technical error',null,'Error','OK');
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
				theme: 'b',
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
	
	$.ajax({url: serviceURL + 'send.php',
		data: {id: id, device_id: device_id, device_platform: device_platform, device_browser: device_browser, ver: session_version},
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
}

$(document).on('pageinit', '#renewdiaglog', function()
{  
	$(document).on('click', '#renew_login', function(e) 
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
			password = document.getElementById("password").value;
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			//alert(username);
			//alert(password);

			//return false;
		  
			if($('#username').val().length > 0 && $('#password').val().length > 0)
			{
					//alert(localStorage.getItem("session_id_local"));
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Checking Login ...',
						textVisible: true,
						theme: 'b',
						html: ""
					});	
			
					$.ajax({url: serviceURL + 'login.php',
						data: {username: username, password: password, device_id: device_id, device_platform: device_platform, device_browser: device_browser, ver: session_version},
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
								localStorage.setItem("session_id_username", username);
								localStorage.setItem("session_id_local", result.session_id);
								localStorage.setItem("session_name", result.name);
								localStorage.setItem("session_org_name", result.org_name);
								localStorage.setItem("session_validity", result.validity);
								//$.mobile.changePage("#second");                         
								
								//alert(result.message);
								showMessage(result.message,null,'Welcome','OK');
								//$( ":mobile-pagecontainer" ).pagecontainer( "change", "#second", { role: "page" } );
								//$.mobile.changePage( "panel.html", { transition: "slideup", changeHash: false });
								//$.mobile.changePage( "main.html",null, true, true);
								
								dt = result.validity;
								var dd = dt.substring(8, 10);
								var mm = dt.substring(5, 7);
								var yy = dt.substring(0, 4);
								
								var dt2 = dd + "-" + mm + "-" +yy;

								//alert(result.name);
								//alert(dt2);
								$.mobile.changePage( "#main",null, true, true);
								$("#welcome_message").html('');
								$("#welcome_message").append("<li>Welcome - " + result.name + "</li>").listview("refresh");
								$("#welcome_message").append("<li>Validity: " + dt2 + "</li>").listview("refresh");
								
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
							showMessage('Please check your data connection!',null,'Error','OK');
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

function ExitApp()
{
	navigator.app.exitApp();
}