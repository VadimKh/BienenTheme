<?php get_header(); ?>
    <main class="row" role="main">
        <!-- section -->
        <section class="column small-12">

			<h1><?php echo sprintf( __( '%s Search Results for ', 'bienen' ), $wp_query->found_posts ); echo get_search_query(); ?></h1>

			<?php get_template_part('loop'); ?>

			<?php get_template_part('pagination'); ?>

		</section>
		<!-- /section -->
	</main>
<?php get_footer(); ?>
