/**
 * Created by esuchug on 19-06-2015.
 */

var SEND_DETAILS = "rest/mda/mobileDetails";

$(document).ready(function() {
    $("#webcam").scriptcam({
        width: 320,
        height: 240,
        onWebcamReady: webcamFound,
        path:'js/'

    });


    function webcamFound(cameraNames,camera,microphoneNames,microphone,volume) {
        $.each(cameraNames, function(index, text) {
            $('#cameraNames').append( $('<option></option>').val(index).html(text) )
        });
        $('#cameraNames').val(camera);
       /* $.each(microphoneNames, function(index, text) {
            $('#microphoneNames').append( $('<option></option>').val(index).html(text) )
        });
        $('#microphoneNames').val(microphone);*/
    }


    $("#saveImage").on('click',function(e){
        e.preventDefault();
        var data = {};
        $("#image").val($.scriptcam.getFrameAsBase64());
        data.image  =$("#image").val();
        data.name = $("#name").val();


        $.ajax({
            type: "POST",
            url: SEND_DETAILS,
            data: $( "input, textarea" ).serialize(),
            contentType: "application/x-www-form-urlencoded",
            success: function(data){ console.log(data);}

        });
       console.log($.scriptcam.getFrameAsBase64());
    });




});


