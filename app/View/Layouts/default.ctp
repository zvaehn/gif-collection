<!DOCTYPE html>
<html>
<head>
	<?php echo $this->Html->charset(); ?>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title><?php echo ".GIF > ".$this->fetch('title'); ?></title>
	<?php
		echo $this->Html->meta('icon');
		echo $this->Html->css('style.css');
		echo $this->fetch('meta');
		echo $this->fetch('css');
	?>
</head>
<body>
<div class="blur">
	<div class="arrow-left"></div>
	<div class="arrow-right"></div>
	<div class="close-lightbox"></div>
	<div class="lightbox">
	</div>
</div>
	<header>
		<nav>
	    	<div class="nav-wrapper container">
	    		<div class="row">
	    			<a class="button-collapse" href="#" data-activates="nav-mobile"><i class="mdi-navigation-menu"></i></a>
				    <?= $this->Html->link('.GIF', '/', array('class' => 'brand-logo mdi-image-collections')) ?>
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
		<div class="container row flashmessage">
			<?php echo $this->Session->flash(); ?>
		</div>
		
		<?php echo $this->fetch('content'); ?>
		
	</main>
		
	<footer>
		<div class="container">
			<div class="row">
				<div class="col l6 s12">
					<h5 class="white-text">Links</h5>
					<ul>
						<li><a class="white-text text-lighten-3" href="https://github.com/zvaehn/gif-collection">Github Repository</a></li>
						<li><a class="white-text text-lighten-3" href="https://github.com/zvaehn/gif-collection/wiki/Dokumentation">Documentation</a></li>
						<li><a class="white-text text-lighten-3" href="http://gifs.sven-schiffer.de">Demo-Page</a></li>
					</ul>
				</div>
				<div class="col l4 offset-l2 s12">
					<h5 class="white-text">Contributors</h5>
					<ul>
						<li class="white-text text-lighten-3">Timon Blask</li>
						<li class="white-text text-lighten-3">Niklas Rose</li>
						<li class="white-text text-lighten-3">Sven Schiffer</li>
						<li class="white-text text-lighten-3">Patrizia Schink</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="footer-copyright">
			<div class="container">
				Copyright &copy;2015
				<span class="white-text text-lighten-4 right">FH-Köln - WPF: Moderne Webanwendungen</span>
			</div>
		</div>
	</footer>

	<?php echo $this->element('sql_dump'); ?>

	<?php echo $this->Html->script('bin/jquery.min'); ?>
	<?php echo $this->Html->script('bin/underscore.min'); ?>
	<?php echo $this->Html->script('bin/backbone.min'); ?>
	<?php echo $this->Html->script('bin/isotope.min'); ?>
	<?php echo $this->Html->script('bin/ZeroClipboard.min'); ?>
	<?php echo $this->Html->script('materialize/bin/materialize'); ?>
	<?php echo $this->Html->script('model/GifModel'); ?>
	<?php echo $this->Html->script('collection/GifCollection'); ?>
	<?php echo $this->Html->script('view/DocumentView'); ?>
	<?php echo $this->Html->script('view/GifCollectionView'); ?>
	<?php echo $this->Html->script('view/GifModelView'); ?>
	<?php echo $this->Html->script('app'); ?>
	
</body>
</html>
