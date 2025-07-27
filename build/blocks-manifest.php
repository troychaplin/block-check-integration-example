<?php
// This file is generated. Do not modify it manually.
return array(
	'external-card-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'external-blocks-a11y-example/card',
		'version' => '1.0.0',
		'title' => 'External Block w/Checks',
		'category' => 'text',
		'icon' => 'universal-access',
		'description' => 'An example block for displaying testimonials with accessibility checks in place.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'heading' => array(
				'type' => 'string',
				'default' => ''
			),
			'headingLevel' => array(
				'type' => 'number',
				'default' => 2
			),
			'link' => array(
				'type' => 'string',
				'default' => ''
			),
			'content' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'external-blocks-a11y-example',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
