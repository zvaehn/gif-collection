<?php
App::uses('AppController', 'Controller', 'Session');

class GifsController extends AppController {

	public $components = array('Paginator', 'Session', 'RequestHandler');

    // This Controller acts as a REST API. So we dont want cake.php to render views
    public $autoRender = false;

    // Is called before any GifsController action
    public function beforeFilter() {    
        // Set the user_id on our Gif-Model so that we're only getting user specific gifs
        $this->Gif->user_id = $this->Session->read('User.user_id');
    }

    // Find all gifs and order them descending
    public function index() {
        $gifs = $this->Gif->find('all', array('order' => array('Gif.created_at DESC')));
        $this->layout = 'ajax';
        echo json_encode($gifs);
    }

    // Render our gallery, better known as main page view
    public function gallery() {
        $this->set('title_for_layout', 'Gallery');
        $this->render('gallery');
    }

    // Add a new Gif to the database
    public function add() {
        $this->layout = 'ajax';

        $this->request->data['Gif']['user_id'] = $this->Session->read('User.user_id');
        $this->request->data['Gif']['created_at'] = date('Y-m-d G:i:s');

        $this->Gif->create();

        if ($this->Gif->save($this->request->data)) {
            $status = 'ok';

            // ToDo: Check for duplicates
            $duplicates = $this->Gif->findByUser_idAndUrl($this->Session->read('User.user_id'), $this->request->data['Gif']['url']);

            /*if(sizeof($duplicates) > 1) {
                $message = "Added a duplicate.";
            }
            else {*/
            $message = "Successfully created ur gif.";
            
        } 
        else {
            $status = 'error';
            $message = 'The URL seems to be invalid.';
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

    // This function is called whenever we need to change s.th.
    // The 'action' parameter stands for a specific task
    public function edit($id) {
        $this->Gif->id = $id;

        // Toggles a Gif's favorite status
        if($this->request->data['action'] == "favorite") {
            // Check if the Gif belongs to the logged in User
            if($this->Session->read('User.user_id') == $this->Gif->user_id) {
            
                $is_favorite = ($this->request->data['payload']['isFavorite'] ? true : false);

                // Update the favorite field
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

    // Deleting a gif. There is nothing more to say.
    public function delete($id) {
        if ($this->Gif->delete($id)) {
            $status = 'ok';
            $message = 'Successfully deleted your gif.';
        } 
        else {
            $status = 'error';
            $message = 'Unable to delete your gif.';
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
