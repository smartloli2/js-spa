'use strict';
var parsed_data = null;
var currentPage = 0;
var maxPage = 0;

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'home.html', true),            
            new Route('about', 'about.html')
        ]);
    }
    init();
}());

function getPrevPage(){
    if (currentPage > 0){
        currentPage--;
        findExamples(currentPage);
    }
};

function getNextPage(){
    if (currentPage < maxPage - 1){
        currentPage++;
        findExamples(currentPage);
    }
}


// https://dartloli.pythonanywhere.com/request
function findExamples(currentPage = 0, fractional = 5) {
    //var variable =
    console.log($('#input').val());
    console.log(JSON.stringify({
        "words" : $('#input').val(),       
        "examples": parseInt($('#num').val()),
        "currentPage": currentPage,
        "fractional": fractional
    }));

    

    $('#textarea').val('Загрузка...');
    $.ajax({
        type: "POST",
        contentType: "text/plain; charset=utf-8",
        dataType: "json",
        url: "https://dartloli.pythonanywhere.com/request",
        data: JSON.stringify({
            "words" : 
                $('#input').val().split(',')
            ,       
            "examples": parseInt($('#num').val()),
            "currentPage": currentPage,
            "fractional": fractional
        }),
        success: function (response) {
            console.log(response);
            //parsed_data = response['words'];
            currentPage = response['currentPage'];
            maxPage = response['maxPage'];

            var html = '';
            response['words'].forEach(function (value, i) {
                value = value.replace('\n', '');
                html+=`${(i + 1) + (currentPage*fractional)}) ${value}\n`;
            });
            
            html += '';
            $('#page').html(`${currentPage + 1} / ${maxPage}`);
            //$('#result').html(html);
            $('#textarea').val(html);
            $('#bottom_bar').show();
        }
    }).fail(function (jqXHR, textStatus, error) 
    {
        $('#textarea').val('Ошибка, возможно вы ввели некорректные данные');
        $('#bottom_bar').hide();
        console.log(jqXHR); 
        console.log(textStatus);
        console.log(error);
    });
};

