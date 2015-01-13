<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.View.Layouts
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
?>
<!DOCTYPE html>
<html>
<head>
	<?php echo $this->Html->charset(); ?>
	<title>
		<?php echo "GIFS" ?>:
		<?php echo $this->fetch('title'); ?>
	</title>
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
				    <?= $this->Html->link('GIFs', '/', array('class' => 'brand-logo')) ?>
					<ul id="nav-mobile" class="right side-nav">
						<li><?= $this->Html->link('Signup', '/signup') ?></li>
						<li><?= $this->Html->link('Login', '/login') ?></li>
				    </ul>
				</div>
			</div>
		</nav>
	</header>

	<main class="container" style="padding-top: 50px;">
		<?php echo $this->Session->flash(); ?>

		<?php echo $this->fetch('content'); ?>
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
				&copy;2015 Copyright
				<a class="grey-text text-lighten-4 right" href="http://sven-schiffer.de" target="_blank">hi im zvaehn's page</a>
			</div>
		</div>
	</footer>

	<?php echo $this->element('sql_dump'); ?>

	<?php echo $this->Html->script('bin/jquery.min'); ?>
	<?php echo $this->Html->script('bin/underscore.min'); ?>
	<?php echo $this->Html->script('bin/backbone.min'); ?>
	<?php echo $this->Html->script('bin/flex-images.min'); ?>
	<?php echo $this->Html->script('materialize/bin/materialize'); ?>
	<?php echo $this->Html->script('app'); ?>
</body>
</html>
