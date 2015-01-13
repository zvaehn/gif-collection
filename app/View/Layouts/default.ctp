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
            		
          		</div>
        	</div>
      	</div>
	</footer>

	<?php echo $this->element('sql_dump'); ?>

	<?php echo $this->Html->script('jquery.min'); ?>
	<?php echo $this->Html->script('underscore.min'); ?>
	<?php echo $this->Html->script('backbone.min'); ?>
	<?php echo $this->Html->script('materialize/bin/materialize'); ?>
	<?php echo $this->Html->script('app'); ?>
</body>
</html>
