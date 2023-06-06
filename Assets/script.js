$(function () {
  var currentHour = dayjs().hour();
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");

  // Display current date in the header
  $("#currentDay").text(currentDate);

  // Generate time blocks for standard business hours
  for (var hour = 9; hour <= 17; hour++) {
    var $timeBlock = $("<div>").addClass("row time-block");

    // Set past, present, or future class based on the current hour
    if (hour < currentHour) {
      $timeBlock.addClass("past");
    } else if (hour === currentHour) {
      $timeBlock.addClass("present");
    } else {
      $timeBlock.addClass("future");
    }

    // Create hour element
    var $hour = $("<div>")
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(dayjs().hour(hour).format("hA"));

    // Create textarea element
    var $textarea = $("<textarea>")
      .addClass("col-8 col-md-10 description")
      .attr("rows", 3)
      .attr("data-hour", hour); // Add data attribute to identify the hour

    // Get saved event text from localStorage for this time block
    var savedEvent = localStorage.getItem("hour-" + hour);
    if (savedEvent) {
      $textarea.val(savedEvent);
    }

    // Create save button
    var $saveButton = $("<button>")
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save")
      .html('<i class="fas fa-save" aria-hidden="true"></i>');

    // Add click event listener to save button
    $saveButton.on("click", function () {
      var $parent = $(this).parent();
      var textareaValue = $parent.find("textarea").val();
      var hourId = $parent.find("textarea").attr("data-hour"); // Get the hour from the data attribute
      localStorage.setItem("hour-" + hourId, textareaValue); // Save using the hour from data attribute
    });

    // Append elements to the time block
    $timeBlock.append($hour, $textarea, $saveButton);

    // Append time block to the container
    $(".container-fluid").append($timeBlock);
  }

  // Function to retrieve saved values from local storage and update text areas
  function updateTextAreas() {
    $(".description").each(function () {
      var hourId = $(this).attr("data-hour"); // Get the hour from the data attribute
      var savedEvent = localStorage.getItem("hour-" + hourId);
      if (savedEvent) {
        $(this).val(savedEvent);
      }
    });
  }

  // Call the function to update text areas on page load
  updateTextAreas();
});