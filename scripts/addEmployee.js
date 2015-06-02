$(document).ready(function () {
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
                    o[this.name] = parseInt(this.value);
                } else {
                    o[this.name] = this.value || '';
                }
            }
        });
        return o;
    };

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
            url: "http://localhost:8080/SystemInfo/rest/employee/create",
            dataType: 'json',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            data: formData,
            success: function (response) {
                console.log("success"+response);
                //console.log(response.length);
                $("#result-temp").html("<strong> " + response + " Successfully from the server </strong> ");
                $(location).attr('href','listEmployee.html')
            },
            error: function (response) {
                console.log("failure" + response);
                //alert(response);
                $("#result-temp").html("<strong> Failed to get the Employees List from the server </strong> ");
            }
        });
    });
});

