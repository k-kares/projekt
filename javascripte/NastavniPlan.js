var EctsSum = 0;
var SatiSum = 0;
var PredavnjaSum = 0;
var VjezbeSum = 0;


var Kolegiji = [];
var ImenaKolegija = [];
var IDKolegija = {};

$("#NoviKolegij").on("click", function(){ //
    var jwtToken = localStorage.getItem('jwtToken');
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + jwtToken);
        }
    });
    $.get('https://www.fulek.com/data/api/supit/curriculum-list/hr', function(response) {
        $.each(response, function(key, value) {
            if (key == 'data') {
                $.each(value, function(i, val){
                    if(!IDKolegija[val.id]){
                    Kolegiji.push(val);
                    ImenaKolegija.push(val.kolegij);
                    IDKolegija[val.id] = true;
                    }
                }) 
            }
        });
    });
})

$(function(){
    $("#NoviKolegij").autocomplete({
        minLength: 0,
        source: ImenaKolegija,
        select: function( event, ui ) {
            $(".table").show();
            $(this).val("");
            $.each(Kolegiji, function(key, value){
                if (ui.item.value == value.kolegij) {
                    var courseName = value.kolegij;
                    var ects = value.ects;
                    var sati = value.sati;
                    var predavanja = value.predavanja;
                    var vjezbe = value.vjezbe;
                    var type = value.tip;
                    var newRow = "<tr>" +
                                    "<th scope='row'>" + courseName + "</th>" +
                                    "<td class='ects'>" + ects + "</td>" +
                                    "<td class='sati'>" + sati + "</td>" +
                                    "<td class='predavanja'>" + predavanja + "</td>" +
                                    "<td class='vjezbe'>" + vjezbe + "</td>" +
                                    "<td>" + type + "</td>" +
                                    "<td><button type='button' class='btn btn-danger'>Delete</button></td>" +
                                "</tr>";
                    $(".tableContent").fadeIn(1000).append(newRow);
                    UpdateSum(value, 'add');
                }
            })
            return false;
          } 
      })
});


 $('#tableContent').on("click", ".btn-danger", function() {
    var row = $(this).closest("tr");

    var value = {
        ects: row.find(".ects").text(),
        sati: row.find(".sati").text(),
        predavanja: row.find(".predavanja").text(),
        vjezbe: row.find(".vjezbe").text()
    };
    
    UpdateSum(value, 'del');

    row.fadeOut(400, function(){
        $(this).remove();
    });
});

function UpdateSum(value, operation)
{
    if (operation == 'add')
    {
        EctsSum += value.ects;
        SatiSum += value.sati;
        PredavnjaSum += value.predavanja;
        VjezbeSum += value.vjezbe; 
    }
    else if (operation == 'del') 
    {
        EctsSum -= value.ects;
        SatiSum -= value.sati;
        PredavnjaSum -= value.predavanja;
        VjezbeSum -= value.vjezbe;
    }
    
    $("#EctsSum").text(EctsSum);
    $("#SatiSum").text(SatiSum);
    $("#PredavnjaSum").text(PredavnjaSum);
    $("#VjezbeSum").text(VjezbeSum);
}
