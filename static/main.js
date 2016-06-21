$(document).ready(function() {
    // helper functions
    var alreadyInCommand = function(opt) {
	// for each .command-part, check if opt is one of their id's
	var found = 0;
	$(".command-part").each(function() {
	    if ($(this).attr("id") == opt) {
		console.log("found a match");
		found += 1;
	    }
	});
	console.log("alreadyInCommand found: " + opt + " " + found);
	return (found > 0)
    }

    var toggleDocBox = function(id) {
	$(".doc-box#" + id).toggle();
    }

    var getCurrentCommand = function() {
	var full_command = "";
	// go through each command part, dynamically generating a string
	$(".command-part").each(function() {
	    // append each element's text, NOT id, to full_command
	    // text is used instead of id because in the future, command parts, such
	    // as arguments, will be editable, so we want the actual text w/o
	    // all the whitespace
	    full_command += $(this).text().replace(/\s/g, "") + " ";
	});
	return full_command
    }

    var updateCurrentCommand = function() {
	// updates the big <code> command name at the top to whatever
	// the dynamic command below is
	var new_command = getCurrentCommand();
	$("#current-command").text(new_command);
    }

    // Handlers
    $(".option-btn").click(function() {
	// select doc-box with matching id and toggle it
	toggleDocBox($(this).attr("id"));
    });

    $("#command-part-list").on("click",".command-part",function(){
	// same as above, but a deferred version to work with dynamic parts
	// on the command overview
	toggleDocBox($(this).attr("id"));
    });

    $(".add-opt-btn").click(function() {
	// get parent id, and create a new element in the command-part-list
	// with that id.
	var id = $(this).parent().attr("id");
	if (!alreadyInCommand(id)) {
	    // don't worry about it
	    $("#command-part-list").append('<li class="command-part" id="' + id + '"><div class="command-btn">' + id + '    <i class="fa fa-times command-remove" aria-hidden="true"></i></div></li>');
	}
	updateCurrentCommand();
    });

    $("#command-part-list").on("click", ".command-remove", function() {
	// when the icon is clicked, fade out and remove the parent li
	// since it uses .on(), the function is bound to the static ul element
	var parent = $(this).parent().parent(); // li > button > i
	parent.remove();
	// interferes with the other function bound to command-part-list, that
	// toggles the doc-box, so we turn that off too.
	toggleDocBox(parent.attr("id"));
	updateCurrentCommand();
    });

    $("#copy-btn").click(function() {
	// TODO: Automate the copying to clipboard bit
	// for now, just opens a pop-up window prompting users to C-c ENTER
	var full_command = getCurrentCommand();
	console.log("Full command: ", full_command);
	window.prompt("Press Control+C, Enter", full_command);
    });
    
});
