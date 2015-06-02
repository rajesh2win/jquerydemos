$(document).ready(function(){
    $( "#tabs" ).tabs();

    $( "#dobdate" ).datepicker({
        inline: true,
        dateFormat: "yy-mm-dd"
    });
    $( "#dojdate" ).datepicker({
        inline: true,
        dateFormat: "yy-mm-dd"
    });

    $("#empForm").submit(function (event) {
        event.preventDefault();
        var formData = JSON.stringify($('#empForm').serializeObject());
        //formData = formData.substring(1,formData.length-1);
        $("#result-temp").html("Sending the request..");
        console.log(formData);
        $.ajax({
            url: "http://localhost:9090/SystemInfo/rest/employee/create",
            dataType: 'json',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            data: formData,
            success: function (response) {
                console.log("success"+response);
                //console.log(response.length);
                $("#result-temp").html("<strong> " + response + " Successfully from the server </strong> ");
                $(location).attr('href','employee.html');
                //$( "#tabs" ).tabs( "option", "active", 0 );
            },
            error: function (response) {
                console.log("failure" + response);
                //alert(response);
                $("#result-temp").html("<strong> Failed to get the Employees List from the server </strong> ");
            }
        });
    });


    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                if (this.name == "empid") {
                    o[this.name] = this.value.replace ( /[^\d.]/g, '' ) || '';
                } else {
                    o[this.name] = this.value || '';
                }
            }
        });
        return o;
    };


    $("#listEmployees").onfocus(listEmployees());
    function listEmployees() {
        $.ajax({
            url: "http://localhost:9090/SystemInfo/rest/employee/list",
            dataType: 'jsonp',
            success: function( response ) {
                console.log(response);
                console.log(response.length);
                console.log(response[0]);
                //var resultJSON = $.parseJSON(response);
                /*console.log(resultJSON);*/
                $('#empListTable tr').not(':first').not(':last').remove();
                var html = '';
                for(var i = 0; i < response.length; i++) {
                    var empId=response[i].empid;
                    //var deleteHtml = '<td><a href="javascript:void(0);" class="delete" onclick="removePerson('+response[i].empid+');">Delete</a></td>';
                    var deleteHtml = '<td><a href="#deleteEmployee?empId='+empId+'">Delete</a></td>';
                    var viewHtml = '<td><a href="#viewEmployee?empId='+empId+'">'+empId+'</a></td>';
                    html += '<tr>' + viewHtml +'<td>' + response[i].firstName + '</td><td>'+
                    response[i].lastName + '</td><td>' + response[i].dob +  '</td><td>' + response[i].doj + '</td><td>' + response[i].emailId + '</td><td>'+
                    + response[i].phoneNum + '</td>' + deleteHtml +'</tr>';
                }
                $('#empListTable tr').first().after(html);
            },
            error: function(response){
                console.log(response);
                $( "#result-temp" ).html( "<strong> Failed to get the Employees List from the server </strong> degrees" );
            }
        });
    }

    $('#viewEmployee').onfocus(viewPerson());

    function viewPerson() {
        $( "#result-temp" ).html( "<strong> Inprogress to get the Employees Data from the server </strong>" );
        var empId = getParameterByName("empId");
        console.log("employee id:"+empId);
        $.ajax({
            url: "http://localhost:9090/SystemInfo/rest/employee/"+empId,
            dataType: 'json',
            success: function( response ) {
                console.log("Response from Server:"+response);
                //console.log(response.length);
                var html = '';
                if (response != null) {
                    console.log(response.empid);

                    $('#empid').html(response.empid);
                    $('#firstName').html(response.firstName);
                    $('#lastName').html(response.lastName);
                    $('#emailId').html(response.emailId);
                    $('#dob').html(response.dob);
                    $('#doj').html(response.doj);
                    $('#phoneNum').html(response.phoneNum);
                    $( "#result-temp" ).html( "<strong> Successfully to get the Employees Data from the server </strong>" );
                    /*$('.empData').each(function () {

                     var lastColumn = $(this).html();
                     var replaceValue = lastColumn + "Changed Content";

                     jQuery(this).html(replaceValue);
                     });*/
                }
            },
            error: function(response){
                console.log(response);
                $( "#result-temp" ).html( "<strong> Failed to get the Employees Data from the server </strong>" );
            }
        });
    };

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    $('#deleteEmployee').onfocus(removePerson());
    function removePerson() {
        $( "#result-temp" ).html( "<strong> In progress to delete the Employee Data from the server </strong>" );
        var empId = parseInt(getParameterByName("empId"));
        console.log("employee id:"+empId);
        console.log('deleteEmployee');
        var rootURL = "http://localhost:9090/SystemInfo/rest/employee/delete";
        $.ajax({
            type: "DELETE",
            url: rootURL + '/' + empId,
            success: function(response){
                $( "#result-temp" ).html( "<strong> Succesfully to delete the Employee Data from the server </strong>" );
                $(location).attr('href','listEmployee.html')
            },
            error: function(response){
                console.log(JSON.stringify(response));
                $( "#result-temp" ).html( "<strong> Failed to delete the Employee Data from the server </strong>" );
            }
        });
    };
});