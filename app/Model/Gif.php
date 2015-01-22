<?php
App::uses('AppModel', 'Model');
/**
 * Gif Model
 *
 * @property User $User
 */
class Gif extends AppModel {

	// Database primary key
	public $primaryKey = 'gif_id';

	// Field to display if we only want a quick Model overview
	public $displayField = 'url';

	// This method is called before a find function is called
	public function beforeFind($query) {
		// We are manipulating the query that noone will see somebody else's Images
        $query['conditions'][$this->alias . '.user_id'] = $this->user_id;
        return $query;
    }

    // Validation rules
    // 'field'  
    // 	  => 'custom rule name'
    // 	      => which filter/rules should be applied
	public $validate = array(
		'url' => array(
			'url' => array(
				'rule' => array('url'),
				'message' => 'You must enter a valid URL.',
				'allowEmpty' => false,
				'required' => true,
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		'created_at' => array(
			'datetime' => array(
				'rule' => array('datetime'),
			),
		),
	);

	// The Database table associations
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
