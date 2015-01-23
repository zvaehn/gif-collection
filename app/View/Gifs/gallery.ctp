<div class="container">
	<div class="row" style="position: relative">
		<script id="gifTemplate" type="text/template">
			<img src="<%= url %>" data-created-at='<%= created_at %>'>
			<ul class='menu'>
				<li>
					<div class='clipboard-button' id='clipboard_button_id_<%= gif_id %>' data-clipboard-text='<%= url %>'>
						<button class='mdi-editor-insert-link clipboard-icon'></button>
					</div>
				</li>
				<li>
					<button class='mdi-image-crop-free open-gallery'></button>
					<button class='mdi-navigation-fullscreen-exit close-gallery'></button>
				</li>
				<li>
					<% if (is_favorite == true) { %>
	    				<button class='mdi-action-favorite favorite toggable'></button>
					<% } else { %>
						<button class='mdi-action-favorite-outline favorite toggable'></button>
					<% }  %>
				</li>
				<li>
					<button class='mdi-action-delete delete'></button>
				</li>
			</ul>
		</script>

	    <div class="col s12">
	    	<div class="row" id="gif_input_wrapper">
	        	<div class="input-field col s10">
	        		<label for="gif_input">Paste your URL here</label>
	        		<input id="gif_input" class="validate" maxlength="100" type="text" required="required">
				</div>
				<div class="input-field col s2">
					<ul class="options">
						<li>
							<a class="btn-floating waves-effect waves-light gif_add" id="gif_add">
								<i class="mdi-content-add"></i>
							</a> 
						</li>
						<li>
							<a class="btn-floating waves-effect waves-light toggle_options">
								<i class="mdi-hardware-keyboard-arrow-down"></i>
							</a>
						</li>
					</ul>
				</div>

				<div class="col s12" id="option_panel">
					<ul class="horizontal">	
						<li>
							<input type="checkbox" id="filter_favorites">
							<label for="filter_favorites">Only favorites</label>
						</li>
						<li class="spacer"></li>
						<li>
							<input class="with-gap" name="order-by" type="radio" id="order_by_newest" checked />
	  						<label for="order_by_newest">Newest first</label>

							<input class="with-gap" name="order-by" type="radio" id="order_by_oldest" />
	  						<label for="order_by_oldest">Oldest first</label>
	  					</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="preloader-centered" id="gif_list_preloader">
			<div class="preloader-wrapper big active centered">
		      	<div class="spinner-layer spinner-blue">
		        	<div class="circle-clipper left">
		          		<div class="circle"></div>
		        	</div>
		        	<div class="gap-patch">
		          		<div class="circle"></div>
		        	</div>
		        	<div class="circle-clipper right">
		        		<div class="circle"></div>
		        	</div>
		      	</div>
			    <div class="spinner-layer spinner-red">
					<div class="circle-clipper left">
			          	<div class="circle"></div>
			        </div>
			        <div class="gap-patch">
			        	<div class="circle"></div>
			        </div>
			        <div class="circle-clipper right">
			        	<div class="circle"></div>
			        </div>
			    </div>
				<div class="spinner-layer spinner-yellow">
					<div class="circle-clipper left">
						<div class="circle"></div>
					</div>
					<div class="gap-patch">
						<div class="circle"></div>
					</div>
					<div class="circle-clipper right">
						<div class="circle"></div>
					</div>
				</div>
				<div class="spinner-layer spinner-green">
					<div class="circle-clipper left">
						<div class="circle"></div>
					</div>
					<div class="gap-patch">
						<div class="circle"></div>
					</div>
					<div class="circle-clipper right">
						<div class="circle"></div>
					</div>
				</div>
			</div>

			<p><i class="mdi-action-search"> Collecting your images...</i></p>
		</div>
	</div>
</div>

<div class="container-fluid">
	<div class="container gif_wrapper list-view">
		<div class="gallery-controls">
			<i class="mdi-hardware-keyboard-arrow-left left-control"></i>
			<i class="mdi-hardware-keyboard-arrow-right right-control"></i>
		</div>
		<div id="gif_list" class="row">
			
		</div>
	</div>
</div>
