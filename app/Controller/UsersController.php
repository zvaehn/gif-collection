<?php
App::uses('AppController', 'Controller');
/**
 * Users Controller
 *
 * @property User $User
 * @property PaginatorComponent $Paginator
 * @property SessionComponent $Session
 */
class UsersController extends AppController {

/**
 * Components
 *
 * @var array
 */
	public $components = array(
		'Paginator', 
		'Session',
		//'Security', 
        'Email', 
        'Cookie',
	);

	public function beforeFilter() {
        // Welche Actions sind erlaubt?
        $this->Auth->allow('register', 'add', 'confirm', 'login', 'lostpassword', 'newpassword', 'createsalt');
        
        // Autologin?
        $cookie = $this->Cookie->read('autologin');

        // Wenn ausgeloggt und Cookie gesetzt
        if(!$this->Auth->loggedIn() && isset($cookie)) {
            // Wenn cookie gültig
            if(Security::hash($cookie['email'].$cookie['time']) == $cookie['hash']) {
                $user = $this->User->find('first', array(
                    'conditions' => array(
                        'User.email' => $cookie['email'],
                        'User.password' => $cookie['password']
                    ),
                    'recursive' => -1,
                ));
                // Wenn ein Benutzer gefunden wurde: Authentifizieren
                if(count($user) > 0) {
                    $this->Auth->login($user);
                    $this->Auth->authenticate = $user;
                    $this->Session->write('User', $user['User']);
                }
            }
        }
        // User setzen, falls eingeloggt
        if($this->Auth->loggedIn()) {
            $user = $this->Auth->user();
            $this->set('current_user', $user);
        } 
        else {
            $this->set('current_user', null);
        }
    }


/**
 * view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		if (!$this->User->exists($id)) {
			throw new NotFoundException(__('Invalid user'));
		}
		$options = array('conditions' => array('User.' . $this->User->primaryKey => $id));
		$this->set('user', $this->User->find('first', $options));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->User->create();

			$this->request->data['User']['registed_at'] = date('Y-m-d G:i:s');

			if ($this->User->save($this->request->data)) {
				$this->Session->setFlash(__('Your registration was successfull.'));
				//return $this->redirect(array('action' => 'index'));
			} 
			else {
				unset($this->request->data['User']['password']);
				unset($this->request->data['User']['password_repeat']);
				$this->Session->setFlash(__('Ooops...something went wrong.'));
			}
		}
	}

/**
 * edit method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		if (!$this->User->exists($id)) {
			throw new NotFoundException(__('Invalid user'));
		}
		if ($this->request->is(array('post', 'put'))) {
			if ($this->User->save($this->request->data)) {
				$this->Session->setFlash(__('The user has been saved.'));
				return $this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The user could not be saved. Please, try again.'));
			}
		} else {
			$options = array('conditions' => array('User.' . $this->User->primaryKey => $id));
			$this->request->data = $this->User->find('first', $options);
		}
	}

/**
 * delete method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
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

	// Loginfunktion 
    public function login() {
        if($this->Auth->loggedIn()) {
            return $this->redirect($this->Auth->loginRedirect);
        }
        // Einloggen
        if(!empty($this->data)) {
            // User suchen
            $user = $this->User->findByEmailAndPassword(
            	$this->data['User']['email'], Security::hash($this->data['User']['password'], 'sha1', true)
            );
            // Kein User gefunden
            if(!$user) {
                $this->Session->setFlash('Email or Password seems to be wrong.');
                return;
            }
            // Account noch nicht bestätigt
            /*if($user[0]['Registration']['confirmed'] == false){
                $this->Session->setFlash('Dein Account ist noch nicht bestätigt. Bitte überprüfe Deine Mails.');
                return;
            }
            // Account gesperrt
            if($user[0]['User']['blacklisted'] == true){
                $this->Session->setFlash('Dieser Account ist zur Zeit gesperrt. Bitte wende Dich an den Support.');
                return;
            }*/

            // LoginSecurity-Counter löschen
           /* if($user[0]['LoginSecurity']['try_counter'] != null) {
                $this->Session->setFlash('Es gab '.$user[0]['LoginSecurity']['try_counter'].' fehlgeschlagene Loginversuche seit deinem letzen Login.');
            }
            $this->User->save(array('loginSecurity_id' => null, 'user_id' => $user[0]['User']['user_id']), $validate = false);
            $this->User->LoginSecurity->delete($user[0]['User']['loginSecurity_id'], $cascade = false);
*/
            // User Authentifizieren
            $this->Auth->login($user);
            $this->Auth->authenticate = $user;

            // Wichtige Daten in der Session speichern:
            $this->Session->write('User', $user['User']);

            // Eingeloggt bleiben?
            if($this->data['User']['stay'] == 1) {
                $currentTime = time();
                $cookie = array(
                    'email' => $user['User']['email'],
                    'password' => $user['User']['password'],
                    'time' => $currentTime,
                    // Checksumme
                    'hash' => Security::hash($user['User']['email'].$currentTime)
                );
                // Cookie Speichern
                $this->Cookie->write('autologin', $cookie, true, '+1 year');
            }
            
            // weiterleiten
            $this->redirect($this->Auth->loginRedirect);
        }
    }
    
    // Logout-Funktion
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
