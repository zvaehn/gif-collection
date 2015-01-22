<?php
App::uses('AppModel', 'Model');

class User extends AppModel {

	public $primaryKey = 'user_id';
	public $displayField = 'email';

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

	// Checks if the given email is already in our database
    public function isUniqueEmail($email) {
        $emails = $this->find('count', array(
            'conditions' => array(
                'User.email' => $email['email']
                )
            )
        );

        return !($emails > 0);
    }

    // Checks if the passwords are matching
    public function pw_match($password_repeat) {
        return (strcmp($this->data['User']['password'], $this->data['User']['password_repeat']) == 0);
    }

    // Is called whenever the save method is called
    public function beforeSave($options = array()) {
    	// We are hashing the user password for security reasons
    	// One does not simply save a plain text password in a database!!! http://cdn.meme.am/instances/500x/58358131.jpg
        if (isset($this->data[$this->alias]['password'])) {
            $this->data[$this->alias]['password'] = AuthComponent::password($this->data[$this->alias]['password']);
        }
        return true;
    }

}
