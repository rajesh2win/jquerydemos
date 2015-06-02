$(document).ready(function(){
/*    function removePerson() {
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
    };*/

    $("#empListTable").load(loadPerson());
    function loadPerson() {
        $( "#result-temp" ).html( "<strong> Loading Employees List from the server </strong>" );
        $.ajax({
            url: "http://localhost:8080/SystemInfo/rest/employee/list",
            dataType: 'jsonp',
            success: function( response ) {
                console.log(response);
                //console.log(response.length);
                console.log(response[0]);
                //var resultJSON = $.parseJSON(response);
                /*console.log(resultJSON);*/
                $('#empListTable tr').not(':first').not(':last').remove();
                var html = '';
                for(var i = 0; i < response.length; i++) {
                    var empId=response[i].empid;
                    //var deleteHtml = '<td><a href="javascript:void(0);" class="delete" onclick="removePerson('+response[i].empid+');">Delete</a></td>';
                    var deleteHtml = '<td><a href="deleteEmployee.html?empId='+empId+'">Delete</a></td>';
                    var viewHtml = '<td><a href="viewEmployee.html?empId='+empId+'">'+empId+'</a></td>';
                    html += '<tr>' + viewHtml +'<td>' + response[i].firstName + '</td><td>'+
                    response[i].lastName + '</td><td>' + response[i].dob +  '</td><td>' + response[i].doj + '</td><td>' + response[i].emailId + '</td><td>'+
                    + response[i].phoneNum + '</td>' + deleteHtml +'</tr>';
                }
                $('#empListTable tr').first().after(html);
                $( "#result-temp" ).html( "<strong> Successfully to get the Employees List from the server </strong> degrees" );
            },
            error: function(response){
                console.log(response);
                $( "#result-temp" ).html( "<strong> Failed to get the Employees List from the server </strong> degrees" );
            }
        });
    }

    $('#empViewTable').load(viewPerson());

    function viewPerson() {
        $( "#result-temp" ).html( "<strong> Inprogress to get the Employees Data from the server </strong>" );
        var empId = getParameterByName("empId");
        console.log("employee id:"+empId);
        $.ajax({
            url: "http://localhost:8080/SystemInfo/rest/employee/"+empId,
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

    //$('#deleteEmployee').load(removePerson());
});