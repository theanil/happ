//var serviceURL = "http://happ.phpzeal.com/";
//var serviceURL = "http://localhost/h_app/services/";

$(document).on('pageinit', '#search', function()
{  
	$(document).on('click', '#submit_bsearch', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('search');
			//alert($('#bsearchform').serialize());
			//return false;
			//serviceURL = 'http://localhost/ti/server/';
			
			document.getElementById("sr_device_platform").value = localStorage.device_platform;
			document.getElementById("sr_device_uuid").value = localStorage.device_uuid;
			document.getElementById("sr_device_browser").value = localStorage.device_browser;
			  
            TI_Search($('#bsearchform').serialize(), 'N');
	 		
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

$(document).on('pageinit', '#logsearch', function()
{  
	$(document).on('click', '#submit_lsrsearch', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('after login search');
			//alert($('#logsearchform').serialize());
			//return false;
			//serviceURL = 'http://localhost/ti/server/';
			
			document.getElementById("lsr_device_platform").value = localStorage.device_platform;
			document.getElementById("lsr_device_uuid").value = localStorage.device_uuid;
			document.getElementById("lsr_device_browser").value = localStorage.device_browser;
			  
            TI_Search($('#logsearchform').serialize(), 'N');
	 		
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

function SearchAggData(infotype,datatype,field_type)
{
	var search_type = infotype;

	//alert(infotype);
	//alert(datatype);
	//alert(field_type);
	var search_data = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser;

	if(datatype == 'bysector')
	{
		search_data = search_data + "&search_type=" + infotype + "&sector=" + field_type;
	}
	if(datatype == 'byregion')
	{
		search_data = search_data + "&search_type=" + infotype + "&region=" + field_type;
	}
	if(datatype == 'bycountry')
	{
		search_data = search_data + "&search_type=" + infotype + "&region=" + field_type;
	}
	if(datatype == 'byproduct')
	{
		search_data = search_data + "&search_type=" + infotype + "&cpv=" + field_type;
	}	
	//alert(search_data);	
	TI_Search(search_data, 'N');
}

function ShowMore(total, id, Offset)
{
	//alert("Total: " +total + " ID: " + id + " Offset: " + Offset);
	//serviceURL = 'http://localhost/ti/server/';
	//alert(id);
	//alert(Offset);
	if(total >1000)
	{
		total = 1000;
	}
	newoffset = Number(Offset) + Number(25); 
	//newoffset = Offset + 10;
	
	search_par = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&S_ID="+ id + "&offset=" +newoffset;
	TI_Search(search_par, 'O');
}

function TI_Search(searchparam, stype)
{	
	//alert(searchparam);
	//return false;
	
	$.ajax({url: serviceURL + 'search.php',
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Searching ...',
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
			var newtotal = Number(result.Offset) + Number(25);
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_local);
			$.mobile.loading( "hide" );	
			
			if(result.Total >0)
			{

				if(localStorage.session_id_local == undefined)
				{
					$.mobile.changePage( "#search_result_beforelogin",null, true, true);
					
					if(stype == 'N')// new
					{
						$("#sum_list_beforelogin").html('');
						$("#message1_beforelogin").html(result.message);
					}
					
					for(i=0; i<result[0].length; i++)
					{
						//$("#sum_list_beforelogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
						$("#sum_list_beforelogin").append("<li>TI Ref ID: " +  result[0][i].site_tender_id + "</li>").listview("refresh");
						$("#sum_list_beforelogin").append("<li>Location: " +  result[0][i].Location + "</li>").listview("refresh");
						$("#sum_list_beforelogin").append("<li>Date: " +  result[0][i].Date + "</li>").listview("refresh");
						//$("#sum_list_beforelogin").append("<li>Summary: <p class=\"wrap\">" +  result[0][i].Summary + "</p></li>").listview("refresh");
						
						$("#sum_list_beforelogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">Summary: <p class=\"wrap\">" + result[0][i].Summary + "</p></a></li>").listview("refresh");
						
						if(result[0][i].notice_type != '4'  && result[0][i].notice_type != '5' && result[0][i].notice_type != '9')
						{
							$("#sum_list_beforelogin").append("<li>Deadline: " +  result[0][i].Deadline + "</li>").listview("refresh");
						}
						if(result[0][i].Est_cost.length >3)
						{
							$("#sum_list_beforelogin").append("<li>Estimated Cost: " +  result[0][i].Est_cost + "</li>").listview("refresh");
						}
						//$("#sum_list_beforelogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">Detail</a></li>").listview("refresh");

						$("#sum_list_beforelogin").append("<li></li>").listview("refresh");
					}
					//$("#sum_list_beforelogin").append("<li>&nbsp;</li>").listview("refresh");
					
					//alert(result.Total);
					//if(result.Total >= 10)
					if(result.Total >=	newtotal)
					{
						//alert("<li><a href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>");
						$("#but_list_beforelogin").html("<li><a class=\"ui-btn ui-btn-b\" href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">Show More .. </a></li>").listview("refresh");
					}else
					{
						$("#but_list_afterlogin").html('');
					}					
				}else
				{
					$.mobile.changePage( "#search_result_afterlogin",null, true, true);
					if(stype == 'N')//new
					{
						$("#sum_list_afterlogin").html('');
						$("#message1_afterlogin").html(result.message);
					}

					for(i=0; i<result[0].length; i++)
					{
						//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Ref ID: " +  result[0][i].site_tender_id + "</li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Location: " +  result[0][i].Location + "</li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Date: " +  result[0][i].Date + "</li>").listview("refresh");
						//$("#sum_list_afterlogin").append("<li>Summary: <p class=\"wrap\">" +  result[0][i].Summary + "</p></li>").listview("refresh");
						
						$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">Summary: <p class=\"wrap\">" + result[0][i].Summary + "</p></a></li>").listview("refresh");
						
						if(result[0][i].notice_type != '4'  && result[0][i].notice_type != '5' && result[0][i].notice_type != '9')
						{
							$("#sum_list_afterlogin").append("<li>Deadline: " +  result[0][i].Deadline + "</li>").listview("refresh");
						}
						if(result[0][i].Est_cost.length >3)
						{
							$("#sum_list_afterlogin").append("<li>Estimated Cost: " +  result[0][i].Est_cost + "</li>").listview("refresh");
						}
						//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">Detail</a></li>").listview("refresh");
						
						$("#sum_list_afterlogin").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
					}
					//$("#sum_list_afterlogin").append("<li>&nbsp;</li>").listview("refresh");
					//alert(result.Total);
					//if(result.Total >= 10)
					if(result.Total >=	newtotal)
					{
						//alert("<li><a href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>");
						$("#but_list_afterlogin").html("<li><a class=\"ui-btn ui-btn-b\" href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">Show More .. </a></li>").listview("refresh");
					}else
					{
						$("#but_list_afterlogin").html('');
					}
				}
			}else
			{
				//alert(result.message);
				showMessage(result.message,null,'Error','OK');
			}
			//$( ":mobile-pagecontainer" ).pagecontainer( "change", "#second", { role: "page" } );

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

function GetAggData(infotype, datatype)
{
	//alert('Show Detail ' + infotype);
	//alert('Show Detail ' + datatype);
	
	//return;
	//alert(localStorage.session_id_local);
		//serviceURL = 'http://localhost/ti/server/';
		$.ajax({url: serviceURL + 'get_aggdata.php',
		data: {infotype: infotype, datatype: datatype, device_id: localStorage.device_uuid, device_platform: localStorage.device_platform, device_browser: localStorage.device_browser},
		type: 'post',                   
		async: 'true',
		dataType: 'json',
		beforeSend: function() {
			// This callback function will trigger before data is sent
			//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
			//$.mobile.loading( "show" );
			$.mobile.loading( 'show', {
				text: 'Showing Details ...',
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
                  $.mobile.loading( "hide" );	
				//alert(result.message);

				//alert(result[0][0].name);
				//alert(result[0][0].total_records);
				//alert(result[0].name);
				if(localStorage.session_id_local == undefined)
				{
					$.mobile.changePage( "#agg_result_beforelogin",null, true, true);
					$("#agg_list_beforelogin").html('');
					
					$("#message2_beforelogin").html(result.message);
					//$("#message2").append("<li>" + result.message + "</li>").listview("refresh");
					//$("#message2").append("<li>&nbsp;</li>").listview("refresh");
					
					//for(i=0; i<1; i++)
					for(i=0; i<result[0].length; i++)
					{
						var ty_field = "";
						if(datatype == 'bysector')
						{
							tt_type= result[0][i].sector_code;
						}
						if(datatype == 'bycountry')
						{
							tt_type= result[0][i].country_code;
						}
						if(datatype == 'byregion')
						{
							tt_type= result[0][i].region_code;
						}		
						if(datatype == 'byproduct')
						{
							tt_type= result[0][i].cpv;
						}							
						//alert("<li><a href=\"#\" onclick=\"SearchAggData('" + infotype + "', '" + datatype + "', '" + tt_type + "');return false;\">" + result[0][i].name + " (" + result[0][i].total_records + ")" + "</a></li>");
							
						$("#agg_list_beforelogin").append("<li><a href=\"#\" onclick=\"SearchAggData('" + infotype + "', '" + datatype + "', '" + tt_type + "');return false;\">" + result[0][i].name + " (" + result[0][i].total_records + ")" + "</a></li>").listview("refresh");
					}					
				}else
				{
					$.mobile.changePage( "#agg_result_afterlogin",null, true, true);
					$("#agg_list_afterlogin").html('');
					
					$("#message2_afterlogin").html(result.message);
					//$("#message2").append("<li>" + result.message + "</li>").listview("refresh");
					//$("#message2").append("<li>&nbsp;</li>").listview("refresh");
					
					//for(i=0; i<1; i++)
					for(i=0; i<result[0].length; i++)
					{
						var ty_field = "";
						if(datatype == 'bysector')
						{
							tt_type= result[0][i].sector_code;
						}
						if(datatype == 'bycountry')
						{
							tt_type= result[0][i].country_code;
						}
						if(datatype == 'byregion')
						{
							tt_type= result[0][i].region_code;
						}		
						if(datatype == 'byproduct')
						{
							tt_type= result[0][i].cpv;
						}							
						//alert("<li><a href=\"#\" onclick=\"SearchAggData('" + infotype + "', '" + datatype + "', '" + tt_type + "');return false;\">" + result[0][i].name + " (" + result[0][i].total_records + ")" + "</a></li>");
							
						$("#agg_list_afterlogin").append("<li><a href=\"#\" onclick=\"SearchAggData('" + infotype + "', '" + datatype + "', '" + tt_type + "');return false;\">" + result[0][i].name + " (" + result[0][i].total_records + ")" + "</a></li>").listview("refresh");
					}					
				}								


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

function GetMyData(type)
{
	//alert("My: " + type);
	if(localStorage.session_id_local == undefined)
	{
		//alert("Please login to access this facility");
		showMessage("Please login to access this facility",null,'Error','OK');
		return false;
	}
	
	//alert("http://admin.tendersinfo.com/tendersinfo_api/services.php?function=mylist&session_id=3d4kciyosnplzv4uqxdncga6ugbqhirbj&notice_type=1,2,3,7,8,10,11,16&device_id=abyPC3ejq&device_platform=Android&ip=1.1.1.1");
	
	search_par = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&search_type="+ type + "&session_id=" + localStorage.session_id_local;
	
		$.ajax({url: serviceURL + 'myinfo.php',
		data: search_par,
		type: 'get',                   
		async: 'true',
		dataType: 'json',
		beforeSend: function() {
			// This callback function will trigger before data is sent
			//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
			//$.mobile.loading( "show" );
			$.mobile.loading( 'show', {
				text: 'Searching ...',
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
			$.mobile.loading( "hide" );	
			if(result.status) 
			{
				//localStorage.setItem("session_id_local", result.session_id);
				//$.mobile.changePage("#second");                         
				//alert(result.message);
				//alert(result.message);

				
				//alert(result.S_ID);
				//alert(result.Offset);
				//alert(result[0][0].site_tender_id);
				//alert(result[0].length);
				//alert(localStorage.session_id_local);
				
				if(result.Total >0)
				{
					
					$.mobile.changePage( "#search_result_afterlogin",null, true, true);
					$("#sum_list_afterlogin").html('');
					$("#message1_afterlogin").html(result.message);

					for(i=0; i<result[0].length; i++)
					{
						//alert(alert(result[0][i].n_type));
						//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Ref ID: " +  result[0][i].site_tender_id + "</li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Location: " +  result[0][i].Location + "</li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Date: " +  result[0][i].Date + "</li>").listview("refresh");
						//$("#sum_list_afterlogin").append("<li>Summary: <p class=\"wrap\">" +  result[0][i].Summary + "</p></li>").listview("refresh");
						
						$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">Summary: <p class=\"wrap\">" + result[0][i].Summary + "</p></a></li>").listview("refresh");
						
						if(result[0][i].notice_type != '4'  && result[0][i].notice_type != '5' && result[0][i].notice_type != '9')
						{
							$("#sum_list_afterlogin").append("<li>Deadline: " +  result[0][i].Deadline + "</li>").listview("refresh");
						}
						if(result[0][i].Est_cost.length >3)
						{
							$("#sum_list_afterlogin").append("<li>Estimated Cost: " +  result[0][i].Est_cost + "</li>").listview("refresh");
						}
						//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">Detail</a></li>").listview("refresh");
						
						$("#sum_list_afterlogin").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
					}
					//$("#sum_list_afterlogin").append("<li>&nbsp;</li>").listview("refresh");
					//alert(result.Total);
					if(result.Total >= 25)
					{
						//alert("<li><a href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>");
						$("#but_list_afterlogin").html("<li><a class=\"ui-btn ui-btn-b\" href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">Show More .. </a></li>").listview("refresh");
					}			
				
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
	
	//alert(search_par);
	//TI_Search(search_par, 'N');
}

function ShowMore_Old(total, id,Offset)
{
	//alert("Total: " +total + " ID: " + id + " Offset: " + Offset);
	//serviceURL = 'http://localhost/ti/server/';
	//alert(id);
	//alert(Offset);
	if(total >1000)
	{
		total = 1000;
	}
	newoffset = Offset + 10;

	$.ajax({url: serviceURL + 'search.php',
		data: {S_ID: id, offset: newoffset},
		type: 'get',                   
		async: 'true',
		dataType: 'json',
		beforeSend: function() {
			// This callback function will trigger before data is sent
			//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
			//$.mobile.loading( "show" );
			$.mobile.loading( 'show', {
				text: 'Searching ...',
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
				//alert(result[0][0].site_tender_id);
				//alert(result[0].length);
				//alert(localStorage.session_id_local);
				
				if(localStorage.session_id_local == undefined)
				{
					$.mobile.changePage( "#search_result_beforelogin",null, true, true);
					//$("#sum_list_beforelogin").html('');
					//$("#message1_beforelogin").html(result.message);

					for(i=0; i<result[0].length; i++)
					{
						//$("#sum_list_beforelogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
						$("#sum_list_beforelogin").append("<li>TI Ref ID: " +  result[0][i].site_tender_id + "</li>").listview("refresh");
						$("#sum_list_beforelogin").append("<li>Location: " +  result[0][i].Location + "</li>").listview("refresh");
						$("#sum_list_beforelogin").append("<li>Date: " +  result[0][i].Date + "</li>").listview("refresh");
						$("#sum_list_beforelogin").append("<li>Summary: <p class=\"wrap\">" +  result[0][i].Summary + "</p></li>").listview("refresh");

						if(result[0][i].notice_type != '4'  && result[0][i].notice_type != '5' && result[0][i].notice_type != '9')
						{
							$("#sum_list_beforelogin").append("<li>Deadline: " +  result[0][i].Deadline + "</li>").listview("refresh");
						}
						if(result[0][i].Est_cost.length >3)
						{
							$("#sum_list_beforelogin").append("<li>Estimated Cost: " +  result[0][i].Est_cost + "</li>").listview("refresh");
						}
						$("#sum_list_beforelogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">Detail</a></li>").listview("refresh");						
						
					}
					$("#sum_list_beforelogin").append("<li>&nbsp;</li>").listview("refresh");
					
					//alert(result.Total);
					if(result.Total >= 10)
					{
						//alert("<li><a href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>");
						$("#but_list_beforelogin").html("<li><a class=\"ui-btn ui-btn-b\" href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>").listview("refresh");
					}
					if(newoffset >=1000)
					{
						$("#but_list_beforelogin").html("");
					}else
					{
						//alert("<li><a href=\"#\" onclick=\"ShowMore(" + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>");
						$("#but_list_beforelogin").html("<li><a class=\"ui-btn ui-btn-b\"  href=\"#\" onclick=\"ShowMore(" + newoffset + "," + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>").listview("refresh");
					}
				
				}else
				{
					$.mobile.changePage( "#search_result_afterlogin",null, true, true);
					//$("#sum_list_afterlogin").html('');
					//$("#message1_afterlogin").html(result.message);

					for(i=0; i<result[0].length; i++)
					{
						//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>TI Ref ID: " +  result[0][i].site_tender_id + "</li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Location: " +  result[0][i].Location + "</li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Date: " +  result[0][i].Date + "</li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Summary: <p class=\"wrap\">" +  result[0][i].Summary + "</p></li>").listview("refresh");
						
						if(result[0][i].notice_type != '4'  && result[0][i].notice_type != '5' && result[0][i].notice_type != '9')
						{
							$("#sum_list_afterlogin").append("<li>Deadline: " +  result[0][i].Deadline + "</li>").listview("refresh");
						}
						if(result[0][i].Est_cost.length >3)
						{
							$("#sum_list_afterlogin").append("<li>Estimated Cost: " +  result[0][i].Est_cost + "</li>").listview("refresh");
						}
						$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">Detail</a></li>").listview("refresh");	
					}
					$("#sum_list_afterlogin").append("<li>&nbsp;</li>").listview("refresh");
					
					//alert(result.Total);
					if(result.Total >= 10)
					{
						//alert("<li><a href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>");
						$("#but_list_afterlogin").html("<li><a class=\"ui-btn ui-btn-b\" href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>").listview("refresh");
					}
					if(newoffset >=1000)
					{
						$("#but_list_afterlogin").html("");
					}else
					{
						//alert("<li><a href=\"#\" onclick=\"ShowMore(" + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>");
						$("#but_list_afterlogin").html("<li><a class=\"ui-btn ui-btn-b\"  href=\"#\" onclick=\"ShowMore(" + newoffset + "," + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>").listview("refresh");
					}					
				}
				
			} else 
			{
				alert(result.message);
				//alert('Logon unsuccessful!'); 
			}
		},
		error: function (request,error) {
			// This callback function will trigger on unsuccessful action                
			alert('Please check your data connection!');
		}
	});            
}


function SearchAggData_Old(infotype,datatype,field_type)
{
	var search_type = infotype;

	//alert(infotype);
	//alert(datatype);
	//alert(field_type);
	var search_data = "search_type=" + infotype;

	if(datatype == 'bysector')
	{
		search_data = "search_type=" + infotype + "&sector=" + field_type;
	}
	if(datatype == 'byregion')
	{
		search_data = "search_type=" + infotype + "&region=" + field_type;
	}
	if(datatype == 'bycountry')
	{
		search_data = "search_type=" + infotype + "&region=" + field_type;
	}
	if(datatype == 'byproduct')
	{
		search_data = "search_type=" + infotype + "&cpv=" + field_type;
	}	
	//alert(search_data);	
	//{search_type: infotype, re_type: field_type}
	
	$.ajax({url: serviceURL + 'search.php',
	data: search_data,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Searching ...',
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
			//alert(result.URL);
			//alert(result.Offset);
			//alert(result[0][0].site_tender_id);
			//alert(result[0].length);
			//alert(localStorage.session_id_local);
			
			if(result.Total >0)
			{
				if(localStorage.session_id_local == undefined)
				{
					$.mobile.changePage( "#search_result_beforelogin",null, true, true);
					$("#sum_list_beforelogin").html('');
					$("#message1_beforelogin").html(result.message);

					for(i=0; i<result[0].length; i++)
					{
						$("#sum_list_beforelogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
						//$("#sum_list_beforelogin").append("<li>TI Ref ID: " +  result[0][i].site_tender_id + "</li>").listview("refresh");
						$("#sum_list_beforelogin").append("<li>Location: " +  result[0][i].Location + "</li>").listview("refresh");
						$("#sum_list_beforelogin").append("<li>Date: " +  result[0][i].Date + "</li>").listview("refresh");
						$("#sum_list_beforelogin").append("<li>Summary: <p class=\"wrap\">" +  result[0][i].Summary + "</p></li>").listview("refresh");
						
						if(result[0][i].notice_type != '4'  && result[0][i].notice_type != '5' && result[0][i].notice_type != '9')
						{
							$("#sum_list_beforelogin").append("<li>Deadline: " +  result[0][i].Deadline + "</li>").listview("refresh");
						}
						if(result[0][i].Est_cost.length >3)
						{
							$("#sum_list_beforelogin").append("<li>Estimated Cost: " +  result[0][i].Est_cost + "</li>").listview("refresh");
						}
						$("#sum_list_beforelogin").append("<li>&nbsp;</li>").listview("refresh");
					}
					//alert(result.Total);
					if(result.Total >= 10)
					{
						//alert("<li><a href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>");
						$("#but_list_beforelogin").html("<li><a class=\"ui-btn ui-btn-b\" href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>").listview("refresh");
					}					
				}else
				{
					$.mobile.changePage( "#search_result_afterlogin",null, true, true);
					$("#sum_list_afterlogin").html('');
					$("#message1_afterlogin").html(result.message);

					for(i=0; i<result[0].length; i++)
					{
						$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
						//$("#sum_list_afterlogin").append("<li>TI Ref ID: " +  result[0][i].site_tender_id + "</li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Location: " +  result[0][i].Location + "</li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Date: " +  result[0][i].Date + "</li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Summary: <p class=\"wrap\">" +  result[0][i].Summary + "</p></li>").listview("refresh");
						
						if(result[0][i].notice_type != '4'  && result[0][i].notice_type != '5' && result[0][i].notice_type != '9')
						{
							$("#sum_list_afterlogin").append("<li>Deadline: " +  result[0][i].Deadline + "</li>").listview("refresh");
						}
						if(result[0][i].Est_cost.length >3)
						{
							$("#sum_list_afterlogin").append("<li>Estimated Cost: " +  result[0][i].Est_cost + "</li>").listview("refresh");
						}
						$("#sum_list_afterlogin").append("<li>&nbsp;</li>").listview("refresh");
					}
					//alert(result.Total);
					if(result.Total >= 10)
					{
						//alert("<li><a href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>");
						$("#but_list_afterlogin").html("<li><a class=\"ui-btn ui-btn-b\" href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">Show More .. </a></li>").listview("refresh");
					}					
					
				}
			}else
			{
				alert(result.message);
			}
			//$( ":mobile-pagecontainer" ).pagecontainer( "change", "#second", { role: "page" } );
			//$.mobile.changePage( "panel.html", { transition: "slideup", changeHash: false });
			//$.mobile.changePage( "main.html",null, true, true);
			//$.mobile.changePage( "#main",null, true, true);
		} else 
		{
			alert(result.message);
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		alert('Please check your data connection!');
	}
}); 	
	              
}

$(document).on('pageinit', '#details', function()
{  
	$(document).on('click', '#submit_details', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');
			alert('detail');
			//alert("tiref" + $('#ref_no').val());
			
			if($('#ref_no').val().length > 0)
			{
					//alert(localStorage.getItem("session_id_local"));
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data
					//alert("dform:" + $('#dform').serialize());
					
					$.ajax({url: serviceURL + 'details.php',
						data: $('#dform').serialize(),
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
								//alert(result[0].maj_org);
								//$("[data-role='navbar']").navbar();
								//$("[data-role='header'], [data-role='footer']").toolbar();
								$("#det_list").append("<li>TI Ref ID: " +  result[0].site_tender_id + "</li>").listview("refresh");
								$("#det_list").append("<li>Organisation Details " + "</li>").listview("refresh");
								$("#det_list").append("<li>Organisation: " +  result[0].maj_org + "</li>").listview("refresh");
								$("#det_list").append("<li><p class=wrap>Address: " +  result[0].add1.replace(/(\r\n|\n\r|\r|\n)/g, "<br>") + "</p></li>").listview("refresh");
								$("#det_list").append("<li> " +  result[0].country + "</li>").listview("refresh");
								$("#det_list").append("<li>Tender Details " + "</li>").listview("refresh");
								$("#det_list").append("<li>Document Type: " +  result[0].document_type + "</li>").listview("refresh");
								$("#det_list").append("<li>Bidding Type: " +  result[0].bidding_type + "</li>").listview("refresh");
								$("#det_list").append("<li>Project Location: " +  result[0].project_location + "</li>").listview("refresh");
								$("#det_list").append("<li>Tender Notice No: " +  result[0].tender_notice_no + "</li>").listview("refresh");
								$("#det_list").append("<li><p class=wrap>Description: " +  result[0].tenders_details.replace(/(\r\n|\n\r|\r|\n)/g, "<br>") + "</p></li>").listview("refresh");
								$("#det_list").append("<li>Deadline: " +  result[0].doc_last + "</li>").listview("refresh");
								$("#det_list").append("<li>Updates: " +  result[0].updates + "</li>").listview("refresh");
								$("#det_list").append("<li>Estimated Cost: " +  result[0].est_cost + "</li>").listview("refresh");
								$("#det_list").append("<li>Related Documents: " +  result[0].tender_doc_file + "</li>").listview("refresh");
								//var html = "";
								//html = html + "<li>" + 'Organisation: ' + result[0].maj_org + "</li>";
								//  $("#det_list").html(html);
								//	$("#det_list").listview('refresh');
								//$( ":mobile-pagecontainer" ).pagecontainer( "change", "#second", { role: "page" } );
								//$.mobile.changePage( "panel.html", { transition: "slideup", changeHash: false });
								//$.mobile.changePage( "panel.html",null, true, true);
							} else 
							{
								alert(result.message);
								//alert('Logon unsuccessful!'); 
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							alert('Please check your data connection!');
						}
					});                   
				} else {
					alert('Please fill all necessary fields');
					//$.mobile.loading( "show" );	
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});


function ShowDetail(id)
{
	if(localStorage.session_id_local == undefined)
	{
		//alert("Please login for getting details of Ref ID: " + id);
		showMessage('Please login for getting details of Ref ID: ' + id,null,'Error','OK');
		return false;
	}
	//id = 29605522;
	
	device_id= localStorage.device_uuid;
	device_platform= localStorage.device_platform;
	device_browser= localStorage.device_browser;
			
	//alert('Show Detail ' + id);
	//alert(localStorage.session_id_local);
	//serviceURL = 'http://localhost/ti/server/';
		$.ajax({url: serviceURL + 'details.php',
		data: {ref_no: id, det_session_id: localStorage.session_id_local, device_id: device_id, device_platform: device_platform, device_browser: device_browser},
		type: 'post',                   
		async: 'true',
		dataType: 'json',
		beforeSend: function() {
			// This callback function will trigger before data is sent
			//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
			//$.mobile.loading( "show" );
			$.mobile.loading( 'show', {
				text: 'Showing Details for Ref ID ' + id + '',
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
			$.mobile.loading( "hide" );	
			if(result.status) 
			{
				var detail_data = '';
				var ntype= result[0].n_type;
				//alert(ntype)
					
					var val = result[0].tender_doc_file;
					for(j=0; j<=2; j++)
					{
						//alert(val[j].doc_type);
					}

				if(ntype == '1' || ntype == '2' || ntype == '3' || ntype == '7' || ntype == '8' || ntype == '10' || ntype == '11' || ntype == '16') //tenders
				{									
					//detail_data1 = detail_data1 + '<li data-role="list-divider">Tender Details</li>';
					detail_data = detail_data + '<li>Ref ID: ' + result[0].site_tender_id + '</li>';
					detail_data = detail_data + '<li data-role="list-divider">Organisation Details</li>';
					detail_data = detail_data + '<li>Organisation: <p class="wrap">' + result[0].maj_org + '</p></li>';
					detail_data = detail_data + '<li>Address: <p class="wrap">' + result[0].add1.replace(/(\r\n|\n\r|\r|\n)/g, "<br>") + ' <br>' + result[0].country;
					
					if(result[0].tel != undefined)
					{
						if(result[0].tel.length>1)
						{
							detail_data = detail_data + '<br>Tel: ' + result[0].tel;
						}
					}
					if(result[0].fax != undefined)
					{
						if(result[0].fax.length>1)
						{
							detail_data = detail_data + '<br>Fax: ' + result[0].fax;
						}
					}
					if(result[0].email_id != undefined)
					{
						if(result[0].email_id.length>1)
						{
							detail_data = detail_data + '<br>E-mail ID: ' + result[0].email_id;
						}
					}					
					if(result[0].website != undefined)
					{
						if(result[0].website.length>1)
						{
							detail_data = detail_data + '<br>Website: ' + result[0].website;
						}
					}
					
					if(result[0].add2 != undefined)
					{
						if(result[0].add2.length>1)
						{
							detail_data = detail_data + '<br>Other Address: ' + result[0].add2;
						}
					}
					
					detail_data = detail_data + '</p></li>';
					
					detail_data = detail_data + '<li data-role="list-divider">Tender Details</li>';
					detail_data = detail_data + '<li>Document Type: <p class="wrap">' + result[0].document_type + '</p></li>';
					bid_type = result[0].bidding_type;
					record_type = result[0].record_type;
					detail_data = detail_data + '<li>Bidding Type: <p class="wrap">' + result[0].bidding_type + '</p></li>';
								
					if(result[0].bidding_type == 'Not Specified' && record_type == 'live')
					{
						var blink = '<li><a href="#" onclick="ConfirmBidding(' + result[0].site_tender_id + ');return false;">' + "International / National Competitive Bidding Request" +'</a> </li>';
						//alert(blink);
						detail_data = detail_data + blink;						
					}
					
					detail_data = detail_data + '<li>Project Location: <p class="wrap">' + result[0].project_location + '</p></li>';
					detail_data = detail_data + '<li>Tender Notice No: <p class="wrap">' + result[0].tender_notice_no + '</p></li>';
					if(result[0].tender_doc_file != undefined)
					{
						//detail_data = detail_data + '<li>Tender Notice No: <p class="wrap">' + result[0].tender_notice_no + '</p></li>';
					}
					
					detail_data = detail_data + '<li>Description:</li>';
					detail_data = detail_data + '<li><p class="wrap">' + result[0].tenders_details.replace(/(\r\n|\n\r|\r|\n)/g, "<br>") + '</p></li>';
					detail_data = detail_data + '<li>Deadline: <p class="wrap">' + result[0].doc_last + '</p></li>';
					if(result[0].updates.length>1)
					{
						detail_data = detail_data + '<li>Project Location: <p class="wrap">' + result[0].updates + '</p></li>';
					}
					if(result[0].est_cost.length>1)
					{
						detail_data = detail_data + '<li>Estimated Cost: <p class="wrap">' + result[0].est_cost + '</p></li>';
					}		
					if(result[0].tender_doc_file != undefined)
					{
						noofdoc = Object.keys(result[0].tender_doc_file).length;
						if(noofdoc>100)
						{
							detail_data = detail_data + '<li>Related Documents: <p class="wrap">';
							for(j=0; j<noofdoc; j++)
							{
								//alert(result[0].tender_doc_file[j].doc_type);
								//alert(result[0].tender_doc_file[j].doc_link);
								docname = result[0].tender_doc_file[j].doc_type;
								doclink = result[0].tender_doc_file[j].doc_link;
								var hlink = '<a data-ajax="false" target=_new rel="external" href="' + doclink + '">' + docname + "</a> <br>";
								//alert(hlink);
								//detail_data = detail_data + hlink;

							}
							detail_data = detail_data + '</p></li>';
						}
					}
					
					detail_data = detail_data + '<li>Sector: <p class="wrap">' + result[0].tender_sector + '</p></li>';
					
					detail_data = detail_data + '<li><a href="#" onclick="SaveBriefcase(' + result[0].site_tender_id + ');return false;">' + "Save to Briefcase" +'</a> </li>';	
					detail_data = detail_data + '<li><a href="#" onclick="EmailtoMe(' + result[0].site_tender_id + ');return false;">' + "E-mail Information" +'</a> </li>';						
				}
				
				if(ntype == '9') //projects
				{
					detail_data = detail_data + '<li>Ref ID: ' + result[0].project_id + '</li>';
					detail_data = detail_data + '<li data-role="list-divider">Project Information</li>';
					detail_data = detail_data + '<li>Project Name: <p class="wrap">' + result[0].project_name + '</p></li>';
					detail_data = detail_data + '<li>Project Number: <p class="wrap">' + result[0].project_no +'</p></li>';
					detail_data = detail_data + '<li>Project Location: <p class="wrap">' + result[0].project_location + '</p></li>';
					detail_data = detail_data + '<li>Project Start: <p class="wrap">' + result[0].project_start + '</p></li>';
					detail_data = detail_data + '<li>Project End: <p class="wrap">' + result[0].project_end + '</p></li>';
					detail_data = detail_data + '<li>Project Status: <p class="wrap">' + result[0].project_status + '</p></li>';
					detail_data = detail_data + '<li>Project Phase: <p class="wrap">' + result[0].project_phase + '</p></li>';
					
					if(result[0].est_cost.length>1)
					{
						detail_data = detail_data + '<li>Project Value: <p class="wrap">' + result[0].est_cost + '</p></li>';
					}			
					detail_data = detail_data + '<li>Project Background:</li>';
					detail_data = detail_data + '<li><p class="wrap">' + result[0].project_detail.replace(/(\r\n|\n\r|\r|\n)/g, "<br>") + '</p></li>';

					detail_data = detail_data + '<li>Contacts</li>';
					detail_data = detail_data + '<li>Owner/Implementing Agency: <p class="wrap">' + result[0].owner_agency + '<br>' + result[0].owner_address.replace(/(\r\n|\n\r|\r|\n)/g, "<br>") + '</p></li>';
					detail_data = detail_data + '<li>Financier: <p class="wrap">' + result[0].financier + '</p></li>';
					detail_data = detail_data + '<li><p class="wrap">' + result[0].financier_address.replace(/(\r\n|\n\r|\r|\n)/g, "<br>") + '</p></li>';


					if(result[0].updates.length>1)
					{
						detail_data = detail_data + '<li>Project Updates: <p class="wrap">' + result[0].updates + '</p></li>';
					}		
					
					
					detail_data = detail_data + '<li>Sector: <p class="wrap">' + result[0].project_sector + '</p></li>';
					detail_data = detail_data + '<li><a href="#" onclick="SaveBriefcase(' + result[0].project_id + ');return false;">' + "Save to Briefcase" +'</a> </li>';	
					detail_data = detail_data + '<li><a href="#" onclick="EmailtoMe(' + result[0].project_id + ');return false;">' + "E-mail Information" +'</a> </li>';						
					
				}
				
				if(ntype == '4') //news
				{
									
					detail_data = detail_data + '<li data-role="list-divider">News Details</li>';
					detail_data = detail_data + '<li>Ref ID: ' + result[0].news_id + '</li>';
					detail_data = detail_data + '<li>Title: <p class="wrap">' + result[0].short_desc + '</p></li>';
					detail_data = detail_data + '<li>Description:</li>';
					detail_data = detail_data + '<li><p class="wrap">' + result[0].tenders_details.replace(/(\r\n|\n\r|\r|\n)/g, "<br>") + '</p></li>';
					detail_data = detail_data + '<li>Sector: <p class="wrap">' + result[0].tender_sector + '</p></li>';
					//detail_data = detail_data + '<li><a href="#" onclick="SaveBriefcase(' + result[0].news_id + ');return false;">' + "Save to Briefcase" +'</a> </li>';	
					detail_data = detail_data + '<li><a href="#" onclick="EmailtoMe(' + result[0].news_id + ');return false;">' + "E-mail Information" +'</a> </li>';						
					
				}
				
				if(ntype == '5') // contracts award
				{
					detail_data = detail_data + '<li>Ref ID: ' + result[0].contract_no + '</li>';
					detail_data = detail_data + '<li>Contract Description:</li>';
					detail_data = detail_data + '<li><p class="wrap">' + result[0].contract_desc + '</p></li>';

					detail_data = detail_data + '<li>Contractors Name: <p class="wrap">' + result[0].contract_name + '</p></li>';
					
					if(result[0].address != undefined)
					{
						detail_data = detail_data + '<li>Address: <p class="wrap">' + result[0].address.replace(/(\r\n|\n\r|\r|\n)/g, "<br>") + '</p></li>';
					}
					detail_data = detail_data + '<li>Owner/Implementing Agency: <p class="wrap">' + result[0].implementing_agency + '</p></li>';
					detail_data = detail_data + '<li>Financier: <p class="wrap">' + result[0].financier + '</p></li>';
					detail_data = detail_data + '<li>Contract Details: <p class="wrap">' + result[0].contract_details.replace(/(\r\n|\n\r|\r|\n)/g, "<br>") + '</p></li>';
					if(result[0].contract_award_no.length>1)
					{
						detail_data = detail_data + '<li>Contract Awards Number: <p class="wrap">' + result[0].contract_award_no + '</p></li>';
					}
					if(result[0].est_cost.length>1)
					{
						detail_data = detail_data + '<li>Amount of Contract: <p class="wrap">' + result[0].est_cost + '</p></li>';
					}					
					detail_data = detail_data + '<li>Project Location: <p class="wrap">' + result[0].project_location + '</p></li>';
					detail_data = detail_data + '<li>Contract Status: <p class="wrap">' + result[0].contract_status + '</p></li>';
					detail_data = detail_data + '<li>Contract Completion Date: <p class="wrap">' + result[0].contract_end + '</p></li>';

					if(result[0].updates.length>1)
					{
						detail_data = detail_data + '<li>Updates: <p class="wrap">' + result[0].updates + '</p></li>';
					}
					
					if(result[0].project_file != undefined)
					{
						noofdoc = Object.keys(result[0].project_file).length;
						if(noofdoc>0)
						{
							detail_data = detail_data + '<li>Related Documents: <p class="wrap">';
							for(j=0; j<noofdoc; j++)
							{
								//alert(result[0].project_file[j].doc_type);
								//alert(result[0].project_file[j].doc_link);
								docname = result[0].project_file[j].doc_type;
								doclink = result[0].project_file[j].doc_link;
								var hlink = '<a href="' + doclink + '">' + docname + "</a> <br>";
								//detail_data = detail_data + hlink;

							}
							detail_data = detail_data + '</p></li>';
						}
					}
					
					detail_data = detail_data + '<li>Project Sector: <p class="wrap">' + result[0].project_sector + '</p></li>';
					detail_data = detail_data + '<li><a href="#" onclick="SaveBriefcase(' + result[0].contract_no + ');return false;">' + "Save to Briefcase" +'</a> </li>';	
					detail_data = detail_data + '<li><a href="#" onclick="EmailtoMe(' + result[0].contract_no + ');return false;">' + "E-mail Information" +'</a> </li>';						
					
				}
				
				$.mobile.changePage( "#details",null, true, true);
				//alert(detail_data);
				//$("#det_list").append(detail_data).listview("refresh");
				$("#det_list").html('');
				$("#det_list").append(detail_data).listview("refresh");

			} else 
			{
				alert(result.message);
				//alert('Logon unsuccessful!'); 
			}
		},
		error: function (request,error) {
			// This callback function will trigger on unsuccessful action    
			$.mobile.loading( "hide" );	            
			//alert('Please check your data connection!');
			showMessage('Please check your data connection!',null,'Error','OK');
		}
	});                   
}

function ConfirmBidding(id)
{
	//alert('hi-confirm');
	$.mobile.changePage( "#confirmdialog", { role: "dialog" } );		
	document.getElementById("confirm_username").value = localStorage.session_id_username;
	document.getElementById("confirm_email_id").value = localStorage.session_id_email_id;
	document.getElementById("confirm_name").value = localStorage.session_name;
	document.getElementById("confirm_tiref").value = id;
}

function EmailtoMe(id)
{
	//alert('hi-email to me');
	$.mobile.changePage( "#emaildialog", { role: "dialog" } );		
	document.getElementById("emailten_username").value = localStorage.session_id_username;
	document.getElementById("emailten_email_id").value = localStorage.session_id_email_id;
	document.getElementById("emailten_name").value = localStorage.session_name;
	document.getElementById("emailten_tiref").value = id;
}

function SaveBriefcase(id)
{
	//alert('hi-save to briefcase ' + id);

	username = localStorage.session_id_username;
	ti_ref_no = id;
		
	device_id= localStorage.device_uuid;
	device_platform= localStorage.device_platform;
	device_browser= localStorage.device_browser;
	session_version= localStorage.session_version;
	session_id= localStorage.session_id_local;
	//alert(username);
	//alert(password);

	//return false;
  
//alert("test");
// Send data to server through the Ajax call
// action is functionality we want to call and outputJSON is our data

	$.mobile.loading( 'show', {
		text: 'Saving in Briefcase  ...',
		textVisible: true,
		theme: 'b',
		html: ""
	});	

	$.ajax({url: serviceURL + 'briefcase.php',
		data: {username: username, ti_ref_no: ti_ref_no, session_id: session_id, device_id: device_id, device_platform: device_platform, device_browser: device_browser},
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

				$.mobile.loading( "hide" );                    
				//alert(result.message);
				showMessage(result.message,null,'Tendersinfo','OK');
				
			} else 
			{
				$.mobile.loading( "hide" );  
				//alert("ok");
				
				//$('[data-role=dialog]').dialog( "close" );
				//alert('Logon unsuccessful!'); 
				showMessage(result.message,null,'Tendersinfo','OK');
			}
		},
		error: function (request,error) {
			// This callback function will trigger on unsuccessful action                
			//alert('Please check your data connection!');
			showMessage('Please check your data connection!',null,'Error','OK');
		}
	});                   

}


function GetICBStatus()
{
	if(localStorage.session_id_local == undefined)
	{
		showMessage('Please login for accessing this feature',null,'Error','OK');
		//alert("Please login for getting details of Ref ID: " + id);
		return false;
	}
	//alert('hi-GetICBStatus');
	//return false;
	
	username = localStorage.session_id_username;
	session_id= localStorage.session_id_local;
		
	device_id= localStorage.device_uuid;
	device_platform= localStorage.device_platform;
	device_browser= localStorage.device_browser;
	session_version= localStorage.session_version;
	
	$.ajax({url: serviceURL + 'get_icbstatus.php',
	data: {username: username, session_id: session_id, device_id: device_id, device_platform: device_platform, device_browser: device_browser},
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Getting ICB/NCB Status ...',
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
		$.mobile.loading( "hide" );
		if(result.status) 
		{			
			if(result.Total >0)
			{
				$.mobile.changePage( "#search_result_afterlogin_icb",null, true, true);
				$("#sum_list_afterlogin1").html('');
				$("#message1_afterlogin1").html(result.message);

				for(i=0; i<result[0].length; i++)
				{
					//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
					$("#sum_list_afterlogin1").append("<li>Ref ID: " +  result[0][i].site_tender_id + "</li>").listview("refresh");
					$("#sum_list_afterlogin1").append("<li>Location: " +  result[0][i].Location + "</li>").listview("refresh");
					$("#sum_list_afterlogin1").append("<li>Date: " +  result[0][i].Date + "</li>").listview("refresh");
					//$("#sum_list_afterlogin").append("<li>Summary: <p class=\"wrap\">" +  result[0][i].Summary + "</p></li>").listview("refresh");
					
					$("#sum_list_afterlogin1").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">Summary: <p class=\"wrap\">" + result[0][i].Summary + "</p></a></li>").listview("refresh");
					
					if(result[0][i].notice_type != '4'  && result[0][i].notice_type != '5' && result[0][i].notice_type != '9')
					{
						$("#sum_list_afterlogin1").append("<li>Deadline: " +  result[0][i].Deadline + "</li>").listview("refresh");
					}
					if(result[0][i].Est_cost.length >3)
					{
						$("#sum_list_afterlogin1").append("<li>Estimated Cost: " +  result[0][i].Est_cost + "</li>").listview("refresh");
					}
					//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">Detail</a></li>").listview("refresh");
					
					$("#sum_list_afterlogin1").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
				}
				//$("#sum_list_afterlogin").append("<li>&nbsp;</li>").listview("refresh");
				//alert(result.Total);
				//if(result.Total >= 10)
				
			}else
			{
				//alert(result.message);
				showMessage(result.message,null,'Error','OK');
			}
			//$( ":mobile-pagecontainer" ).pagecontainer( "change", "#second", { role: "page" } );

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

function GetBriefcase()
{	
	if(localStorage.session_id_local == undefined)
	{
		showMessage('Please login for accessing Briefcase feature',null,'Error','OK');
		//alert("Please login for getting details of Ref ID: " + id);
		return false;
	}
	//alert('hi-GetBriefcase');
	//return false;
	username = localStorage.session_id_username;
	session_id= localStorage.session_id_local;
		
	device_id= localStorage.device_uuid;
	device_platform= localStorage.device_platform;
	device_browser= localStorage.device_browser;
	session_version= localStorage.session_version;
	
	$.ajax({url: serviceURL + 'get_briefcase.php',
	data: {username: username, session_id: session_id, device_id: device_id, device_platform: device_platform, device_browser: device_browser},
	type: 'post',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Getting Briefcase ...',
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
		//alert(result.message);
		//alert(result.Total);
		if(result.status) 
		{			
			if(result.Total >0)
			{

				$.mobile.changePage( "#search_result_afterlogin_brief",null, true, true);
				$("#sum_list_afterlogin2").html('');
				$("#message1_afterlogin2").html(result.message);

				for(i=0; i<result[0].length; i++)
				{
					//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
					$("#sum_list_afterlogin2").append("<li>Ref ID: " +  result[0][i].site_tender_id + "</li>").listview("refresh");
					$("#sum_list_afterlogin2").append("<li>Location: " +  result[0][i].Location + "</li>").listview("refresh");
					//$("#sum_list_afterlogin2").append("<li>Date: " +  result[0][i].Date + "</li>").listview("refresh");
					//$("#sum_list_afterlogin").append("<li>Summary: <p class=\"wrap\">" +  result[0][i].Summary + "</p></li>").listview("refresh");
					
					$("#sum_list_afterlogin2").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">Summary: <p class=\"wrap\">" + result[0][i].Summary + "</p></a></li>").listview("refresh");
					
					if(result[0][i].notice_type != '4'  && result[0][i].notice_type != '5' && result[0][i].notice_type != '9')
					{
						$("#sum_list_afterlogin2").append("<li>Deadline: " +  result[0][i].Deadline + "</li>").listview("refresh");
					}

					//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">Detail</a></li>").listview("refresh");
					
					$("#sum_list_afterlogin2").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
				}
				//$("#sum_list_afterlogin").append("<li>&nbsp;</li>").listview("refresh");
				//alert(result.Total);
				//if(result.Total >= 10)
				
			}else
			{
				//alert(result.message);
				showMessage(result.message,null,'Error','OK');
			}
			//$( ":mobile-pagecontainer" ).pagecontainer( "change", "#second", { role: "page" } );

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


$(document).on('pageinit', '#confirmdialog', function()
{  
	$(document).on('click', '#confirm_btn', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');
			//alert(localStorage.device_uuid);
			  //document.getElementById("l_device_platform").value = localStorage.device_platform;
			  //document.getElementById("l_device_uuid").value = localStorage.device_uuid;
			  //document.getElementById("l_device_browser").value = localStorage.device_browser;		
			  
			 // alert($('#lform').serialize());
			email_id = document.getElementById("confirm_email_id").value;
			name = document.getElementById("confirm_name").value;
			username = document.getElementById("confirm_username").value;
			ti_ref_no = document.getElementById("confirm_tiref").value;
			tel = document.getElementById("confirm_tel").value;
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			session_id= localStorage.session_id_local;
			
			//alert(username);
			//alert(password);

			//return false;
	
		  
			if($('#confirm_email_id').val().length > 0 && $('#confirm_name').val().length > 0 && $('#confirm_tel').val().length > 0)
			{
					//alert("test");
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Sending Request  ...',
						textVisible: true,
						theme: 'b',
						html: ""
					});	
			
					$.ajax({url: serviceURL + 'confirmbiding.php',
						data: {username: username, email_id: email_id, name: name, ti_ref_no: ti_ref_no, tel: tel, session_id: session_id, device_id: device_id, device_platform: device_platform, device_browser: device_browser},
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

								$.mobile.loading( "hide" );                    
								$("#confirmdialog").dialog('close');
								//alert(result.message);
								showMessage(result.message,null,'Tendersinfo','OK');
								
							} else 
							{
								$.mobile.loading( "hide" );  
								//alert("ok");
								
								//$('[data-role=dialog]').dialog( "close" );
								$("#confirmdialog").dialog('close');
								//alert('Logon unsuccessful!'); 
								showMessage(result.message,null,'Tendersinfo','OK');
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

$(document).on('pageinit', '#emaildialog', function()
{  
	$(document).on('click', '#email_btn', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');
			//alert(localStorage.device_uuid);
			  //document.getElementById("l_device_platform").value = localStorage.device_platform;
			  //document.getElementById("l_device_uuid").value = localStorage.device_uuid;
			  //document.getElementById("l_device_browser").value = localStorage.device_browser;		
			  
			 // alert($('#lform').serialize());
			email_id = document.getElementById("emailten_email_id").value;
			name = document.getElementById("emailten_name").value;
			username = document.getElementById("emailten_username").value;
			ti_ref_no = document.getElementById("emailten_tiref").value;
			tel = document.getElementById("emailten_tel").value;
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			session_id= localStorage.session_id_local;
			//alert(username);
			//alert(password);

			//return false;
		  
			if($('#emailten_email_id').val().length > 0 && $('#emailten_name').val().length > 0)
			{
					//alert("test");
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Sending Request  ...',
						textVisible: true,
						theme: 'b',
						html: ""
					});	
			
					$.ajax({url: serviceURL + 'emailtender.php',
						data: {username: username, email_id: email_id, name: name, ti_ref_no: ti_ref_no, tel: tel, session_id: session_id, device_id: device_id, device_platform: device_platform, device_browser: device_browser},
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

								$.mobile.loading( "hide" );                    
								$("#emaildialog").dialog('close');
								//alert(result.message);
								showMessage(result.message,null,'Tendersinfo','OK');
								
							} else 
							{
								$.mobile.loading( "hide" );  
								//alert("ok");
								
								//$('[data-role=dialog]').dialog( "close" );
								$("#emaildialog").dialog('close');
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
					
					$.fixedToolbars.show();
					//$.mobile.loading( "show" );
						
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

function SeachPage()
{
	if(localStorage.session_id_local == undefined)
	{
		$.mobile.changePage( "#search",null, true, true);
	}else
	{
		$.mobile.changePage( "#logsearch",null, true, true);
	}
}

function GetMyData_old(type)
{
	//alert("My: " + type);
	if(localStorage.session_id_local == undefined)
	{
		alert("Please login to access this facility");
		return false;
	}
	//alert($('#bsearchform').serialize());return false;
	
		$.ajax({url: serviceURL + 'search.php',
		data: {search_type: type},
		type: 'get',                   
		async: 'true',
		dataType: 'json',
		beforeSend: function() {
			// This callback function will trigger before data is sent
			//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
			//$.mobile.loading( "show" );
			$.mobile.loading( 'show', {
				text: 'Searching ...',
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
				//alert(result.Offset);
				//alert(result[0][0].site_tender_id);
				//alert(result[0].length);
				//alert(localStorage.session_id_local);
				
				if(result.Total >0)
				{
					
					$.mobile.changePage( "#search_result_afterlogin",null, true, true);
					$("#sum_list_afterlogin").html('');
					$("#message1_afterlogin").html(result.message);

					for(i=0; i<result[0].length; i++)
					{
						//alert(alert(result[0][i].n_type));
						//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Ref ID: " +  result[0][i].site_tender_id + "</li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Location: " +  result[0][i].Location + "</li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Date: " +  result[0][i].Date + "</li>").listview("refresh");
						$("#sum_list_afterlogin").append("<li>Summary: <p class=\"wrap\">" +  result[0][i].Summary + "</p></li>").listview("refresh");
						if(result[0][i].notice_type != '4'  && result[0][i].notice_type != '5' && result[0][i].notice_type != '9')
						{
							$("#sum_list_afterlogin").append("<li>Deadline: " +  result[0][i].Deadline + "</li>").listview("refresh");
						}
						if(result[0][i].Est_cost.length >3)
						{
							$("#sum_list_afterlogin").append("<li>Estimated Cost: " +  result[0][i].Est_cost + "</li>").listview("refresh");
						}
						
						$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">Detail</a></li>").listview("refresh");
						//$("#sum_list_afterlogin").append("<li>&nbsp;</li>").listview("refresh");
					}
					$("#sum_list_afterlogin").append("<li>&nbsp;</li>").listview("refresh");
					//alert(result.Total);
					if(result.Total >= 10)
					{
						//alert("<li><a href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>");
						$("#but_list_afterlogin").html("<li><a class=\"ui-btn ui-btn-b\" href=\"#\" onclick=\"ShowMore(" + result.Total + "," + result.S_ID + "," + result.Offset + ");return false;\">More .. </a></li>").listview("refresh");
					}			
				
				}else
				{
					alert(result.message);
				}
				//$( ":mobile-pagecontainer" ).pagecontainer( "change", "#second", { role: "page" } );
				//$.mobile.changePage( "panel.html", { transition: "slideup", changeHash: false });
				//$.mobile.changePage( "main.html",null, true, true);
				//$.mobile.changePage( "#main",null, true, true);
			} else 
			{
				alert(result.message);
				//alert('Logon unsuccessful!'); 
			}
		},
		error: function (request,error) {
			// This callback function will trigger on unsuccessful action                
			alert('Please check your data connection!');
		}
	});      
}

$(document).on('pageinit', '#logsearch', function()
{   
	$( "#cpv11" ).keyup(function() 
	{
		var cpv = $( "#cpv" ).val();
		var l = cpv.length;
		//alert( "Handler for .keyup() called. " + cpv);
		if(l>=3)
		{
			alert("will suggest CPVs");
				$.ajax({url: serviceURL + 'search.php',
						data: {},
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
							if(result.Total >0)
							{

								$("#suggestions").html('');
								for(i=0; i<result[0].length; i++)
								{
									//alert(result[0][i].site_tender_id);
									//$("#sum_list_beforelogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
									//$("#suggestions").append("<li>TI Ref ID: " +  result[0][i].site_tender_id + "</li>").listview("refresh");
									$("#suggestions").append("<li><a href=\"#\" onclick=\"SetCPV(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + "</a></li>").listview("refresh");
									
								}
							}
							if(result.status) 
							{

								$.mobile.loading( "hide" );                    
								//$("#renewdiaglog").dialog('close');
								//alert(result.message);
								showMessage(result.message,null,'Welcome','OK');
								
							} else 
							{
								$.mobile.loading( "hide" );  
								//alert("ok");
								
								//$('[data-role=dialog]').dialog( "close" );
								//$("#renewdiaglog").dialog('close');
								//alert('Logon unsuccessful!'); 
								showMessage(result.message,null,'Error','OK');
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
	});

});

function SetCPV(id)
{
	$("#suggestions").html('');
	$("#cpv").val(id);
	showMessage('Setting CPV Code ' + id,null,'Tendersinfo','OK');
}

