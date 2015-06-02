$(document).ready(function(){
    $(window).load(loadPerson());
    function loadPerson() {
        $.ajax({
            url: "http://localhost:9090/SystemInfo/rest/employee/list",
            dataType: 'jsonp',
            success: function( response ) {
                console.log(response);
                console.log(response.length);
                //var resultJSON = $.parseJSON(response);
                /*console.log(resultJSON);*/
                var data = response;
                console.log("person data:" + data);
                var obj = { width: 900, height: 600, title: "ParamQuery Grid Example",resizable:true,draggable:true };
                obj.colModel = [{ title: "Employee Id", width: 100, dataType: "string" },
                    { title: "First Name", width: 200, dataType: "string" },
                    { title: "Last Name", width: 200, dataType: "string" },
                    { title: "Email Id", width: 200, dataType: "string" },
                    { title: "Date Of Birth", width: 150, dataType: "string", align: "right" },
                    { title: "Date Of Joining", width: 150, dataType: "string", align: "right"},
                    { title: "Phone Number", width: 200, dataType: "string" }];
                console.log(data);
                obj.dataModel = { data: data };
                $("#grid_array").pqGrid(obj);
            },
            error: function(response){
                console.log(response);
                $( "#result-temp" ).html( "<strong> Failed to get the Employees List from the server </strong> degrees" );
            }
        });
    }
});