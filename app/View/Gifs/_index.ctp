<div class="gifs index">
	<h2><?php echo __('Gifs'); ?></h2>
	<table cellpadding="0" cellspacing="0">
	<thead>
	<tr>
			<th><?php echo $this->Paginator->sort('gif_id'); ?></th>
			<th><?php echo $this->Paginator->sort('user_id'); ?></th>
			<th><?php echo $this->Paginator->sort('url'); ?></th>
			<th><?php echo $this->Paginator->sort('created_at'); ?></th>
			<th class="actions"><?php echo __('Actions'); ?></th>
	</tr>
	</thead>
	<tbody>
	<?php foreach ($gifs as $gif): ?>
	<tr>
		<td><?php echo h($gif['Gif']['gif_id']); ?>&nbsp;</td>
		<td>
			<?php echo $this->Html->link($gif['User']['user_id'], array('controller' => 'users', 'action' => 'view', $gif['User']['user_id'])); ?>
		</td>
		<td><?php echo h($gif['Gif']['url']); ?>&nbsp;</td>
		<td><?php echo h($gif['Gif']['created_at']); ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View'), array('action' => 'view', $gif['Gif']['gif_id'])); ?>
			<?php echo $this->Html->link(__('Edit'), array('action' => 'edit', $gif['Gif']['gif_id'])); ?>
			<?php echo $this->Form->postLink(__('Delete'), array('action' => 'delete', $gif['Gif']['gif_id']), array(), __('Are you sure you want to delete # %s?', $gif['Gif']['gif_id'])); ?>
		</td>
	</tr>
<?php endforeach; ?>
	</tbody>
	</table>
	<p>
	<?php
	echo $this->Paginator->counter(array(
	'format' => __('Page {:page} of {:pages}, showing {:current} records out of {:count} total, starting on record {:start}, ending on {:end}')
	));
	?>	</p>
	<div class="paging">
	<?php
		echo $this->Paginator->prev('< ' . __('previous'), array(), null, array('class' => 'prev disabled'));
		echo $this->Paginator->numbers(array('separator' => ''));
		echo $this->Paginator->next(__('next') . ' >', array(), null, array('class' => 'next disabled'));
	?>
	</div>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('New Gif'), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Users'), array('controller' => 'users', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New User'), array('controller' => 'users', 'action' => 'add')); ?> </li>
	</ul>
</div>
