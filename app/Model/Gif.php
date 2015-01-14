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

	public function beforeFind($query) {
        $query['conditions'][$this->alias . '.user_id'] = $this->user_id;
        return $query;
    }
/**
 * Validation rules
 *
 * @var array
 */
	public $validate = array(
		'url' => array(
			'url' => array(
				'rule' => array('url'),
				'message' => 'You must enter a valid URL.',
				'allowEmpty' => false,
				'required' => true,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		'created_at' => array(
			'datetime' => array(
				'rule' => array('datetime'),
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
			'fields' => array('user_id', 'email', 'registered_at'),
			'order' => ''
		)
	);
}
