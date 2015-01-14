<div class="row" style="position: relative">
	<script id="gifTemplate" type="text/template">
		<img src="<%= url %>">
		<ul class='menu'>
			<li>
				<button class='mdi-file-attachment clipboard-button tooltipped' 
					data-position='bottom' 
					data-tooltip='I am tooltip' 
					data-clipboard-text='TEST'>
				</button>
			</li>
			<li>
				<button class='mdi-image-crop-free'></button>
			</li>
			<li>
				<button class='mdi-action-favorite-outline toggable'></button>
			</li>
			<li>
				<button class='mdi-action-delete'></button>
			</li>
		</ul>;
	</script>
    <div class="col s12">
	    <form class="subnavigation">
	     	<?php
			echo $this->Form->create('Gif'); 
			?>
	    	<div class="row" id="gif_input_wrapper">
	        	<div class="input-field col s10">
	        	<?php
				echo $this->Form->input('url', array(
					'div' => false,
					'id' => 'gif_input',
					'label' => 'Y U NO PASTE URL ?',
					'class' => 'validate'
				));
				?>
				</div>
				<div class="input-field col s2">
					<a class="btn-floating waves-effect waves-light gif_add" id="gif_add"><i class="mdi-content-add"></i></a>
					<a class="btn-floating waves-effect waves-light gif_add" id="gif_search"><i class="mdi-action-search"></i></a>
				</div>
			</div>
		</form>
	</div>
</div>

<div class="row">
	<div id="gif_list" class="flex-images">
		

	</div>
</div>