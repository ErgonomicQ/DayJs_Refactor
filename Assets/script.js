$(function () {
  var currentHour = dayjs().hour();

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
      .attr("rows", 3);

    // Set textarea value based on saved data from localStorage
    var savedData = localStorage.getItem("hour-" + hour);
    if (savedData) {
      $textarea.val(savedData);
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
      var hourId = $parent.attr("id");
      localStorage.setItem(hourId, textareaValue);
    });

    // Append elements to the time block
    $timeBlock.append($hour, $textarea, $saveButton);

    // Append time block to the container
    $(".container-fluid").append($timeBlock);
  }
});