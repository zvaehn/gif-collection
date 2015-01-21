<?php
App::uses('AppController', 'Controller', 'Session');


class GifsController extends AppController {

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

    /*
    public function view($id) {
        $gif = $this->Gif->findByGif_id($id);
        $this->layout = 'ajax';

        echo json_encode($gif);
    }*/

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

        // Toggles a Gif's favorite status
        if($this->request->data['action'] == "favorite") {
            // Check if the Gif belongs to the logged in User
            if($this->Session->read('User.user_id') == $this->Gif->user_id) {
            
                $is_favorite = ($this->request->data['payload']['isFavorite'] ? true : false);

                if($this->Gif->saveField('is_favorite', $is_favorite)) {
                    $status = 'ok';
                    $message = 'Marked as favorite.';
                }
                else {
                    $status = 'error';
                    $message = 'Unable to remove from favorites.';
                }                
            }
            else {
                $status = 'error';
                $message = 'You can only favorite your own Gifs.';
            }
        }

        echo json_encode(array(
            'status' => $status,
            'message' => $message,
            'request' => array(
                'method' => CakeRequest::method(),
                'data' => $this->request->data,
            ),
        ));
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
