<div class="gifs form">
<?php echo $this->Form->create('Gif'); ?>
	<fieldset>
		<legend><?php echo __('Edit Gif'); ?></legend>
	<?php
		echo $this->Form->input('gif_id');
		echo $this->Form->input('user_id');
		echo $this->Form->input('url');
		echo $this->Form->input('created_at');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit')); ?>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Form->postLink(__('Delete'), array('action' => 'delete', $this->Form->value('Gif.gif_id')), array(), __('Are you sure you want to delete # %s?', $this->Form->value('Gif.gif_id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Gifs'), array('action' => 'index')); ?></li>
		<li><?php echo $this->Html->link(__('List Users'), array('controller' => 'users', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New User'), array('controller' => 'users', 'action' => 'add')); ?> </li>
	</ul>
</div>
