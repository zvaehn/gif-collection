<?php
App::uses('AppModel', 'Model');
/**
 * Gif Model
 *
 * @property User $User
 */
class Gif extends AppModel {

/**
 * Primary key field
 *
 * @var string
 */
	public $primaryKey = 'gif_id';

/**
 * Display field
 *
 * @var string
 */
	public $displayField = 'url';

/**
 * Validation rules
 *
 * @var array
 */
	public $validate = array(
		'url' => array(
			'url' => array(
				'rule' => array('url'),
				//'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		'created_at' => array(
			'datetime' => array(
				'rule' => array('datetime'),
				//'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
	);

	//The Associations below have been created with all possible keys, those that are not needed can be removed

/**
 * belongsTo associations
 *
 * @var array
 */
	public $belongsTo = array(
		'User' => array(
			'className' => 'User',
			'foreignKey' => 'user_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);
}
