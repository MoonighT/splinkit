<?php
$event = array(
	"id" => 1,
	"name" => "GeekCamp SG2012",
	"start_date" => 1350811190,
	"end_date" => Date("Ymd"),
	"description" => "What is GeekCamp? Conference for the geeks. No startup talks.No how
					to get rich talks. This is purely a tech conference where programmers 
					of all walks of life come and share about the interesting parts of trade.",
	"location" => "Marina Bay Sands",
	"programs" => array( 
		array(
			"name" => "10th October 2012",
			"event_id" => 1,
			"activities" => array(
					"time" => "09:00",
					"topic" => "Registration",
					"description" => "",
					"program_id" => 1,
				),
				array(
					"time" => "10:00",
					"topic" => "Talk 1 - How to raise Venture Funding",
					"description" => "Mr Jay Teo Jun Kai",
					"program_id" => 2,
				),
				array(
					"time" => "12:00",
					"topic" => "Talk 2 - How to raise Venture Funding",
					"description" => "Mr Jay Teo Jun Kai",
					"program_id" => 3,
				)
			),
		array( 
			"name" => "10th October 2012",
			"event_id" => 1,
			"activities" => array(
					"time" => "09:00",
					"topic" => "Registration",
					"description" => "",
					"program_id" => 1,
				),
				array(
					"time" => "10:00",
					"topic" => "Talk 1 - How to raise Venture Funding",
					"description" => "Mr Jay Teo Jun Kai",
					"program_id" => 2,
				),
				array(
					"time" => "12:00",
					"topic" => "Talk 2 - How to raise Venture Funding",
					"description" => "Mr Jay Teo Jun Kai",
					"program_id" => 3,
				)
			),
		array( 
			"name" => "10th October 2012",
			"event_id" => 1,
			"activities" => array(
					"time" => "09:00",
					"topic" => "Registration",
					"description" => "",
					"program_id" => 1,
				),
				array(
					"time" => "10:00",
					"topic" => "Talk 1 - How to raise Venture Funding",
					"description" => "Mr Jay Teo Jun Kai",
					"program_id" => 2,
				),
				array(
					"time" => "12:00",
					"topic" => "Talk 2 - How to raise Venture Funding",
					"description" => "Mr Jay Teo Jun Kai",
					"program_id" => 3,
				)
		)
		),
	"speakers" => array( array(
			"name" => "Jay Teo Jun Kai",
			"position" => "CEO, Splinkit",
			"description" => "Jay is a great visionary in technopreneurship.",
			"event_id" => 1
		),
		array(
			"name" => "Yang Mansheng",
			"position" => "CTO, Splinkit",
			"description" => "Mansheng is a extrodinarily talented in IT.",
			"event_id" => 1
		)
	),
	"photos" => array( array(
			"content" => 00101010101,
			"event_id" => 1 
		)
	),
);
echo json_encode($event);