<?php
App::uses('AppController', 'Controller');
/**
 * Gifs Controller
 *
 * @property Gif $Gif
 * @property PaginatorComponent $Paginator
 * @property SessionComponent $Session
 */
class GifsController extends AppController {

/**
 * Components
 *
 * @var array
 */
	public $components = array('Paginator', 'Session', 'RequestHandler');

    public function index() {
        $gifs = $this->Gif->find('all');
        $this->layout = 'ajax';
        echo json_encode($gifs);
    }

    public function view($id) {
        $gif = $this->Gif->findByGif_id($id);
        $this->layout = 'ajax';

        echo json_encode($gif);
    }

    public function add() {
        $this->Gif->create();
        if ($this->Gif->save($this->request->data)) {
            $message = 'Saved';
        } else {
            $message = 'Error';
        }
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    }

    public function edit($id) {
        $this->Gif->id = $id;
        if ($this->Gif->save($this->request->data)) {
            $message = 'Saved';
        } else {
            $message = 'Error';
        }
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    }

    public function delete($id) {
        if ($this->Gif->delete($id)) {
            $message = 'Deleted';
        } else {
            $message = 'Error';
        }
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    }
}
