<div class="container">
	<div class="row">
		<div class="col s12 m6 form_wrapper">
		<h4>Login to continue</h4>
			<?php 
			echo $this->Session->flash('auth');
			echo $this->Form->create('User'); 
		    	
			echo $this->Form->input('email', array(
				'before' => '<i class="mdi-content-mail prefix"></i>',
				'class' => 'validate',
				'div' => 'input-field',
				'type' => 'text'
			));
		    echo $this->Form->input('password', array(
				'before' => '<i class="mdi-communication-vpn-key prefix"></i>',
				'class' => 'validate',
				'div' => 'input-field',
			));
			echo $this->Form->input('stay', array(
				'type' => 'checkbox', 
				'label' => 'Stay logged in?'
			));

			?>
		</div>
		<div class="col s12">
			<button class="btn waves-effect waves-light" type="submit" name="action">Login</button>
			<p>or <?php echo $this->Html->link('register for free', array('controller' => 'users', 'action' => 'add')); ?></p>
		</div>
	</div>
</div>

