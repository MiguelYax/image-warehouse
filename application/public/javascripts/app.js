$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('#inputGroupFile02').on('change', function() {
        //get the file name
        var fileName = $(this).val();
        //replace the "Choose a file" label
        $(this)
            .next('.custom-file-label')
            .html(fileName);
    });
});
