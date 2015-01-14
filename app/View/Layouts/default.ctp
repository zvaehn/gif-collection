<!DOCTYPE html>
<html>
<head>
	<?php echo $this->Html->charset(); ?>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title><?php echo "GIFS > ".$this->fetch('title'); ?></title>
	<?php
		echo $this->Html->meta('icon');
		echo $this->Html->css('style.css');
		echo $this->fetch('meta');
		echo $this->fetch('css');
	?>
</head>
<body>
	<header>
		<nav>
	    	<div class="nav-wrapper container">
	    		<div class="row">
	    			<a class="button-collapse" href="#" data-activates="nav-mobile"><i class="mdi-navigation-menu"></i></a>
				    <?= $this->Html->link('GIFs', '/', array('class' => 'brand-logo mdi-image-collections')) ?>
				    <ul id="nav-mobile" class="right side-nav">
					    <?php
					    if(!$this->Session->check('User')) {
					    	?>
							<li><?= $this->Html->link('Register', '/register') ?></li>
							<li><?= $this->Html->link('Login', '/login') ?></li>
					    	<?php
					    }
					    else {
					    	?>
							<li><?= $this->Html->link('Yo Favorites', '/') ?></li>
							<li><?= $this->Html->link('Random', '/') ?></li>
							<li><?= $this->Html->link('Settings', '/') ?></li>
							<li><?= $this->Html->link('Logout', '/logout') ?></li>
					    	<?php
					    }
					    ?>
				    </ul>
				</div>
			</div>
		</nav>
	</header>

	<main>
		<div class="container">
			<?php echo $this->Session->flash(); ?>
			
			<?php echo $this->fetch('content'); ?>
		</div>
	</main>
		
	<footer>
		<div class="container">
			<div class="row">
				<div class="col l6 s12">
					<h5 class="white-text">Footer Content</h5>
					<p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
				</div>
				<div class="col l4 offset-l2 s12">
					<h5 class="white-text">Links</h5>
					<ul>
						<li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
						<li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
						<li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
						<li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="footer-copyright">
			<div class="container">
				Copyright &copy;2015
				<a class="grey-text text-lighten-4 right" href="http://sven-schiffer.de" target="_blank">hi im zvaehn's page</a>
			</div>
		</div>
	</footer>

	<?php echo $this->element('sql_dump'); ?>

	<?php echo $this->Html->script('bin/jquery.min'); ?>
	<?php echo $this->Html->script('bin/underscore.min'); ?>
	<?php echo $this->Html->script('bin/backbone.min'); ?>
	<?php echo $this->Html->script('bin/flex-images.min'); ?>
	<?php echo $this->Html->script('bin/ZeroClipboard.min'); ?>
	<?php echo $this->Html->script('materialize/bin/materialize'); ?>

	<?php echo $this->Html->script('model/GifModel'); ?>
	<?php echo $this->Html->script('collection/GifCollection'); ?>
	<?php echo $this->Html->script('view/GifCollectionView'); ?>
	<?php echo $this->Html->script('view/GifModelView'); ?>
	
	<?php echo $this->Html->script('app'); ?>
</body>
</html>
