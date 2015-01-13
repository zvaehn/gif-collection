<?php
App::uses('AppModel', 'Model');
/**
 * User Model
 *
 * @property Gif $Gif
 */
class User extends AppModel {

/**
 * Primary key field
 *
 * @var string
 */
	public $primaryKey = 'user_id';
	public $displayField = 'email';

/**
 * Validation rules
 *
 * @var array
 */
	public $validate = array(
		'email' => array(
			'email' => array(
				'rule' => array('email'),
				'message' => 'Please enter a valid Email',
				'allowEmpty' => false,
				'required' => true,
			),
			'unique_mail' => array(
				'rule' => array('isUniqueEmail'),
				'message' => 'This email is already registered.'
			)
		),
		'password' => array(
			'minLength' => array(
				'rule' => array('minLength', 8),
				'message' => 'Your Password must be at least 8 characters long.',
				'allowEmpty' => false,
				'required' => true,
			),
		),
		'password_repeat' => array(
			'pw_match' => array(
                'rule' => array('pw_match'),    
                'message' => 'Your Password doesnt match.'
			),
		),
	);

	//The Associations below have been created with all possible keys, those that are not needed can be removed

/**
 * hasMany associations
 *
 * @var array
 */
	public $hasMany = array(
		'Gif' => array(
			'className' => 'Gif',
			'foreignKey' => 'user_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		)
	);

    public function isUniqueEmail($email) {
        $emails = $this->find('count', array(
            'conditions' => array(
                'User.email' => $email['email']
                )
            )
        );

        return !($emails > 0);
    }

    public function pw_match($password_repeat) {
        return (strcmp($this->data['User']['password'], $this->data['User']['password_repeat']) == 0);
    }

    public function beforeSave($options = array()) {
        if (isset($this->data[$this->alias]['password'])) {
            $this->data[$this->alias]['password'] = AuthComponent::password($this->data[$this->alias]['password']);
        }
        return true;
    }

}
