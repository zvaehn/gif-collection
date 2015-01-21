<?php
App::uses('AppController', 'Controller', 'Session');
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
    public $autoRender = false;

    public function beforeFilter() {    
        $this->Gif->user_id = $this->Session->read('User.user_id');
    }

    public function index() {
        $gifs = $this->Gif->find('all', array('order' => array('Gif.created_at DESC')));
        $this->layout = 'ajax';
        echo json_encode($gifs);
    }

    public function view($id) {
        $gif = $this->Gif->findByGif_id($id);
        $this->layout = 'ajax';

        echo json_encode($gif);
    }

    public function add() {
        $this->layout = 'ajax';

        $this->request->data['Gif']['user_id'] = $this->Session->read('User.user_id');
        $this->request->data['Gif']['created_at'] = date('Y-m-d G:i:s');

        $this->Gif->create();

        if ($this->Gif->save($this->request->data)) {
            $status = 'ok';
            $message = "Successfully created ur gif.";
        } 
        else {
            $status = 'error';
            $message = $this->Gif->validationErrors;
        }

        echo json_encode(array(
            'status' => $status,
            'message' => $message,
            'request' => array(
                'method' => CakeRequest::method(),
                'data' => $this->request->data,
            ),
            'payload' => $this->Gif->read(),
        ));
    }

    public function edit($id) {
        $this->Gif->id = $id;

        if ($this->Gif->save($this->request->data)) {
            $message = 'Saved';
        } 
        else {
            $message = 'Error';
        }
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
    }

    public function favorite($id) {
        //isFavorite = true
        $this->Gif->id = $id;
        $this->Gif->is_favorite = ($this->request->data['isFavorite']) ? true : false;

        if($this->Gif->save()) {
            echo "ok";
        }
        else {
            echo "error";
        }
    }

    public function delete($id) {
        if ($this->Gif->delete($id)) {
            $status = 'ok';
            $message = 'Successfully deleted ur gif.';
        } 
        else {
            $status = 'error';
            $message = 'Unable to delete ur gif.';
        }

        $this->log("Something did not work!", 'debug');

        echo json_encode(array(
            'status' => $status,
            'message' => $message,
            'request' => array(
                'method' => CakeRequest::method(),
                'data' => $this->request->data,
            ),
        ));
    }
}
