$(document).ready(function () {
  let checkedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }

    $('.amenities h4').text(Object.values(checkedAmenities).join(', ') || '\xa0');
  });

  // API status check
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // Function to load places
  function loadPlaces(filters = {}) {
    $('.places').empty();
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(filters),
      success: function (places) {
        for (const place of places) {
          $('.places').append(`
            <article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>
          `);
        }
      }
    });
  }

  // Initial load of all places
  loadPlaces();

  // Filter places based on selected amenities
  $('button').click(function () {
    const amenitiesList = Object.keys(checkedAmenities);
    loadPlaces({ amenities: amenitiesList });
  });
});
