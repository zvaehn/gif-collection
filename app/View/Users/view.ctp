<div class="users view">
<h2><?php echo __('User'); ?></h2>
	<dl>
		<dt><?php echo __('User Id'); ?></dt>
		<dd>
			<?php echo h($user['User']['user_id']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Email'); ?></dt>
		<dd>
			<?php echo h($user['User']['email']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Password'); ?></dt>
		<dd>
			<?php echo h($user['User']['password']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Registered At'); ?></dt>
		<dd>
			<?php echo h($user['User']['registered_at']); ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit User'), array('action' => 'edit', $user['User']['user_id'])); ?> </li>
		<li><?php echo $this->Form->postLink(__('Delete User'), array('action' => 'delete', $user['User']['user_id']), array(), __('Are you sure you want to delete # %s?', $user['User']['user_id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Users'), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New User'), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Gifs'), array('controller' => 'gifs', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Gif'), array('controller' => 'gifs', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php echo __('Related Gifs'); ?></h3>
	<?php if (!empty($user['Gif'])): ?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php echo __('Gif Id'); ?></th>
		<th><?php echo __('User Id'); ?></th>
		<th><?php echo __('Url'); ?></th>
		<th><?php echo __('Created At'); ?></th>
		<th class="actions"><?php echo __('Actions'); ?></th>
	</tr>
	<?php foreach ($user['Gif'] as $gif): ?>
		<tr>
			<td><?php echo $gif['gif_id']; ?></td>
			<td><?php echo $gif['user_id']; ?></td>
			<td><?php echo $gif['url']; ?></td>
			<td><?php echo $gif['created_at']; ?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View'), array('controller' => 'gifs', 'action' => 'view', $gif['gif_id'])); ?>
				<?php echo $this->Html->link(__('Edit'), array('controller' => 'gifs', 'action' => 'edit', $gif['gif_id'])); ?>
				<?php echo $this->Form->postLink(__('Delete'), array('controller' => 'gifs', 'action' => 'delete', $gif['gif_id']), array(), __('Are you sure you want to delete # %s?', $gif['gif_id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Gif'), array('controller' => 'gifs', 'action' => 'add')); ?> </li>
		</ul>
	</div>
</div>
