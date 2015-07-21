<?php get_header(); ?>
	<main class="row" role="main">
		<!-- section -->
		<section class="column small-12">

			<!-- article -->
			<article id="post-404">

				<h1><?php _e( 'Page not found', 'bienen' ); ?></h1>
				<h2>
					<a href="<?php echo home_url(); ?>"><?php _e( 'Return home?', 'bienen' ); ?></a>
				</h2>

			</article>
			<!-- /article -->

		</section>
		<!-- /section -->
	</main>
<?php get_footer(); ?>
