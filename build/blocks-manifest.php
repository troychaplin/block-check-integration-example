<?php
// This file is generated. Do not modify it manually.
return array(
	'album-card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'multi-block-check-example/album-card',
		'version' => '1.0.0',
		'title' => 'Album Card',
		'category' => 'text',
		'icon' => 'universal-access',
		'description' => 'An example block for displaying album cards with accessibility checks in place.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'headingText' => array(
				'type' => 'string',
				'default' => ''
			),
			'headingLevel' => array(
				'type' => 'number',
				'default' => 2
			),
			'sourceUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'releaseDate' => array(
				'type' => 'string',
				'default' => ''
			),
			'description' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'multi-block-checks-example',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'movie-card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'multi-block-check-example/movie-card',
		'version' => '1.0.0',
		'title' => 'Movie Card',
		'category' => 'text',
		'icon' => 'universal-access',
		'description' => 'An example block for displaying movie cards with accessibility checks in place.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'headingText' => array(
				'type' => 'string',
				'default' => ''
			),
			'headingLevel' => array(
				'type' => 'number',
				'default' => 2
			),
			'sourceUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'releaseDate' => array(
				'type' => 'string',
				'default' => ''
			),
			'description' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'multi-block-checks-example',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
