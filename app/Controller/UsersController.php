<?php
App::uses('AppController', 'Controller');

class UsersController extends AppController {

	public $components = array(
		'Paginator', 
		'Session',
		//'Security', 
        'Email', 
        'Cookie',
	);

	public function beforeFilter() {
        // Allowed actions if not logged in
        $this->Auth->allow('add', 'login', 'createsalt');
        
        // Is there a autologin cookie?
        $cookie = $this->Cookie->read('autologin');

        // if user is logged out and a cookie is found
        if(!$this->Auth->loggedIn() && isset($cookie)) {
            // Checks if the cookie is valid
            if(Security::hash($cookie['email'].$cookie['time']) == $cookie['hash']) {
                $user = $this->User->find('first', array(
                    'conditions' => array(
                        'User.email' => $cookie['email'],
                        'User.password' => $cookie['password']
                    ),
                    'recursive' => -1,
                ));
                // authenticate if a user has been found
                if(count($user) > 0) {
                    $this->Auth->login($user);
                    $this->Auth->authenticate = $user;
                    $this->Session->write('User', $user['User']);
                }
            }
        }
        // set user into session if logged in
        if($this->Auth->loggedIn()) {
            $user = $this->Auth->user();
        } 
    }

	public function view($id = null) {
		if (!$this->User->exists($id)) {
			throw new NotFoundException(__('Invalid user'));
		}
		$options = array('conditions' => array('User.' . $this->User->primaryKey => $id));
		$this->set('user', $this->User->find('first', $options));
	}

	public function add() {
        $this->set('title_for_layout', 'Register');

		if ($this->request->is('post')) {
			$this->User->create();
            $this->User->registed_at = date('Y-m-d G:i:s');

			if ($this->User->save($this->request->data)) {
				$this->Session->setFlash(__('Your registration was successfull.'));
				return $this->redirect('/login');
			} 
			else {
				unset($this->request->data['User']['password']);
				unset($this->request->data['User']['password_repeat']);

                $this->Session->setFlash('Unable to create your account. Something went wrong.');
			}
		}
	}

	/*public function edit($id = null) {
		if (!$this->User->exists($id)) {
			throw new NotFoundException(__('Invalid user'));
		}
		if ($this->request->is(array('post', 'put'))) {
			if ($this->User->save($this->request->data)) {
				$this->Session->setFlash(__('The user has been saved.'));
				return $this->redirect(array('action' => 'index'));
			} 
            else {
				$this->Session->setFlash(__('The user could not be saved. Please, try again.'));
			}
		} 
        else {
			$options = array('conditions' => array('User.' . $this->User->primaryKey => $id));
			$this->request->data = $this->User->find('first', $options);
		}
	}*/

/*
	public function delete($id = null) {
		$this->User->id = $id;
		if (!$this->User->exists()) {
			throw new NotFoundException(__('Invalid user'));
		}
		$this->request->allowMethod('post', 'delete');
		if ($this->User->delete()) {
			$this->Session->setFlash(__('The user has been deleted.'));
		} else {
			$this->Session->setFlash(__('The user could not be deleted. Please, try again.'));
		}
		return $this->redirect(array('action' => 'index'));
	}
*/

	
    public function login() {
        $this->set('title_for_layout', 'Login');

        if($this->Auth->loggedIn()) {
            return $this->redirect($this->Auth->loginRedirect);
        }
        // Proceed login
        if(!empty($this->data)) {
            // User suchen
            $user = $this->User->findByEmailAndPassword(
            	$this->data['User']['email'], Security::hash($this->data['User']['password'], 'sha1', true)
            );
            // No user found
            if(!$user) {
                $this->Session->setFlash('Email or Password seems to be wrong.');
                return;
            }

            // Authenticate user
            $this->Auth->login($user);
            $this->Auth->authenticate = $user;

            // save important data into session
            $this->Session->write('User', $user['User']);

            // Stay logged in?
            if($this->data['User']['stay'] == 1) {
                $currentTime = time();
                $cookie = array(
                    'email' => $user['User']['email'],
                    'password' => $user['User']['password'],
                    'time' => $currentTime,
                    // Checksumme
                    'hash' => Security::hash($user['User']['email'].$currentTime)
                );
                // save cookie
                $this->Cookie->write('autologin', $cookie, true, '+1 year');
            }
            
            // redirect to the loginRedirect page
            $this->redirect($this->Auth->loginRedirect);
        }
    }
    
    // Logout function
    public function logout() {
        $this->Session->setFlash("You were logged out successfully.");
        $this->Session->delete('User');
        $this->Cookie->delete('autologin');
        $this->redirect($this->Auth->logout());
    }

    // Just a development function
    public function createsalt($pw) {
        if(Configure::read('debug') > 0) {
            $this->Session->setFlash(Security::hash($pw, 'sha1', true));
        }
    }
}
