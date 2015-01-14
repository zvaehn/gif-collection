<div class="row" style="position: relative">
	<script id="gifTemplate" type="text/template">
	<div class="item" data-w="300" data-h="400" data-gif_id="<%= gif_id %>'">
		<img src="<%= url %>">
	</div>
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
	<div class="col s12">
		<ul id="gif_list" class="gif_list clearfix">
		    
		</ul>
	</div>
	<div id="gif_list" class="flex-images">
		

	</div>
</div>