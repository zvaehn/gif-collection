<div class="row" style="position: relative">
	<script id="gifTemplate" type="text/template">
		<img src="<%= url %>">
		<ul class='menu'>
			<li>
				<button class='mdi-file-attachment clipboard-button tooltipped' 
					data-position='bottom'
					data-tooltip='I am tooltip'  
					data-clipboard-text='"<%= url %>"'></button>
			</li>
			<li>
				<button class='mdi-image-crop-free'></button>
			</li>
			<li>
				<button class='mdi-action-favorite-outline favorite toggable'></button>
			</li>
			<li>
				<button class='mdi-action-delete delete'></button>
			</li>
		</ul>
	</script>

    <div class="col s12">
	    	<div class="row" id="gif_input_wrapper">
	        	<div class="input-field col s10">
	        	<!-- do cake way -->
	        		<label for="gif_input">Y U NO PASTE URL ?</label>
	        		<input id="gif_input" class="validate" maxlength="100" type="text" required="required">
	        	<!---->	
				</div>
				<div class="input-field col s2">
					<a class="btn-floating waves-effect waves-light gif_add" id="gif_add"><i class="mdi-content-add"></i></a>
					<a class="btn-floating waves-effect waves-light gif_search" id="gif_search"><i class="mdi-action-search"></i></a>
				</div>
			</div>
	</div>
</div>

<div class="row">
	<div id="gif_list" class="flex-images">
		

	</div>
</div>