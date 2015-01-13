 <?php
 echo $this->Form->create('Gif'); 
 ?>
 <div class="row">
    <form class="col s12">
    	<div class="row">
        	<div class="input-field col s10">
        	<?php
			echo $this->Form->input('url', array(
				'div' => false
			));
			?>
			</div>
			<div class="input-field col s2">
				<a class="btn-floating waves-effect waves-light gif_add" id="gif_add"><i class="mdi-content-add"></i></a>
			</div>
		</div>
	</form>
</div>

GIFS: 
<ul class="gif-container">
    <script type="text/template" id="gifTemplate">
		<p>#ID:<%= Gif.id  %></p>
		<p>URL: <%= Gif.url %></p>
	</script>
</ul>