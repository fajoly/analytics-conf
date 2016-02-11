function init() {
    var mapOptions = {
        zoom: 17,
        center: new google.maps.LatLng(50.4483352,30.5260236),
        mapTypeId: google.maps.MapTypeId.ROADMAP,

        panControl: false,
        zoomControl: false,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_LEFT
        },
        scaleControl: false,
        scaleControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER
        },
        streeViewControl: false,
        overviewMapControl: false
    };

    var venueMap;
    venueMap = new google.maps.Map(document.getElementById('map'), mapOptions);

    var pinLocation = new google.maps.LatLng(50.4483352,30.5260236);

    var startPosition = new google.maps.Marker({
        position: pinLocation,
        map: venueMap,
        icon: ""
    });
}

function loadScript() {
    var script = document.createElement('script');
    script.src = 'http://maps.googleapis.com/maps/api/js?callback=init';
    document.body.appendChild(script);
}

// document.getElementById('map').textContent = ''
window.onload = loadScript;