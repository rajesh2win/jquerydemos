$(document).ready(function(){
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

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    $('#deleteEmployee').load(removePerson());
});