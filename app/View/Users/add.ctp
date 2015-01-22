<div class="container">
	<div class="row">
	<h4>Create a new Account</h4>
		<div class="col s12 m6 form_wrapper">
		<?php 
		echo $this->Form->create('User', array(
			'url' => array('controller' => 'users', 'action' => 'add')
		)); 
			
		echo $this->Form->input('email', array(
			'before' => '<i class="mdi-content-mail prefix"></i>',
			'class' => 'validate',
			'div' => 'input-field',
		));
		echo $this->Form->input('password', array(
			'before' => '<i class="mdi-communication-vpn-key prefix"></i>',
			'class' => 'validate',
			'div' => 'input-field',
		));
		echo $this->Form->input('password_repeat', array(
			'before' => '<i class="mdi-communication-vpn-key prefix"></i>',
			'class' => 'validate',
			'div' => 'input-field',
			'type' => 'password'
		));
		?>	
		</div>
		<div class="col s12">
			<button class="btn waves-effect waves-light" type="submit" name="action">Register for Free</button>
		</div>
	</div>
</div>
