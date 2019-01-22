$("#btnResults").click(function() {
    if ($('#btnResults').hasClass('btn btn-link')) {
        $('#btnResults').removeClass('btn btn-link');
        $('#btnResults').addClass('btn btn-primary');
    }
    if ($('#btnFavorites').hasClass('btn btn-primary')) {
        $('#btnFavorites').removeClass('btn btn-primary');
        $('#btnFavorites').addClass('btn btn-link');
    }
});

$("#btnFavorites").click(function() {
    if ($('#btnResults').hasClass('btn btn-primary')) {
        $('#btnResults').removeClass('btn btn-primary');
        $('#btnResults').addClass('btn btn-link');
    }
    if ($('#btnFavorites').hasClass('btn btn-link')) {
        $('#btnFavorites').removeClass('btn btn-link');
        $('#btnFavorites').addClass('btn btn-primary');
    }
});

function autoCompleteLocation() {
    autocompleteLocation = new google.maps.places.Autocomplete(
        (document.getElementById('inputLocation')),
        {types: ['geocode']});
}

function autoCompleteMap(){
    autocompleteMap = new google.maps.places.Autocomplete(
        (document.getElementById('fromMap')),
        {types: ['geocode']});
}

function initMap(p_lat, p_lng) {

    $("#mapImg").hide();
    $("#pegmanImg").show();

    var uluru = {lat: p_lat, lng: p_lng};
    var map = new google.maps.Map(document.getElementById('mapDirections'), {
                zoom: 14,
                center: uluru });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

function initStreetView(p_lat, p_lng){

    $("#mapImg").show();
    $("#pegmanImg").hide();

    var streetView = {lat: p_lat, lng: p_lng};
    var map = new google.maps.Map(document.getElementById('mapDirections'), {
      center: streetView,
      zoom: 14
    });

    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('mapDirections'), {
          position: streetView,
          pov: {
            heading: 34,
            pitch: 10
          }
    });

    map.setStreetView(panorama);            
}

$("#formId").bind('ajax:complete', function() {
    $("#progressBar").hide();
});

function changeStar(currentEvent){
    
    if(currentEvent.attributes.class.value == "fa fa-star-o favIcon"){
        currentEvent.setAttribute("class", "fa fa-star favIcon");
        currentEvent.setAttribute("style", "color: yellow");
    } else if(currentEvent.attributes.class.value == "fa fa-star favIcon"){
        currentEvent.setAttribute("class", "fa fa-star-o favIcon");
        currentEvent.setAttribute("style", "");
    }

};

function setGoogleRating(p_rating, p_div_id) {

  $("#" + p_div_id).rateYo({
      rating: p_rating,
      normalFill: "#FFFFFF",
      starWidth: "14px",
      readOnly: true
  });

};

function priceLevelConvertion(price_level) {
    var priceLevelConverted = "";

    if(price_level == 0){
        priceLevelConverted = 0;
    } else {
        for(var i=0; i < price_level; i++){
            priceLevelConverted += '$';
        }
    }

    return priceLevelConverted;
}

function highlightSelectedRow(place_id) {

    var d = document.getElementById("tr_ChIJ71E0cq-5woARt_EtmYlABNY");
    d.className += "table-warning";
}

$("#inputKeyword, #inputLocation").bind("focusout keyup", function(e){

    var form = $("#formId");

    var valueKeyword = form.find('input[id="inputKeyword"]').val();
    var valueLocation = form.find('input[id="inputLocation"]').val();

    if(!valueKeyword.replace(/\s/g, '').length){
        form.find('input[id="inputKeyword"]').removeClass('form-control').addClass('form-control is-invalid');
        document.getElementById('btnSubmit').disabled = true;

    }else if(!document.getElementById('inputLocation').disabled && !valueLocation.replace(/\s/g, '').length){
        form.find('input[id="inputLocation"]').removeClass('form-control').addClass('form-control is-invalid');
        document.getElementById('btnSubmit').disabled = true;
    }else{
        form.find('input[id="inputKeyword"]').removeClass('form-control is-invalid').addClass('form-control');
        form.find('input[id="inputLocation"]').removeClass('form-control is-invalid').addClass('form-control');
        document.getElementById('btnSubmit').disabled = false;

    }

});

$('#otherRadio').on("click", function(e){
   document.getElementById('btnSubmit').disabled = true;
});

$("#formId").submit(function(e){

    var form = $("#formId");
    var valueDistance = form.find('input[id="inputDistance"]').val();

    if(valueDistance == null || valueDistance == ""){
        $('#inputDistance').val(10);
    }

});