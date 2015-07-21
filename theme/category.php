<?php get_header(); ?>
    <main class="row" role="main">
        <!-- section -->
        <section class="column small-12">

			<h1><?php _e( 'Category: ', 'bienen' ); single_cat_title(); ?></h1>

			<?php get_template_part('loop'); ?>

			<?php get_template_part('pagination'); ?>

		</section>
		<!-- /section -->
	</main>
<?php get_footer(); ?>
